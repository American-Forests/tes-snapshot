import subprocess
import json
import os
import boto3
import re

def load_json_config(config_file_path):
    with open(config_file_path, 'r') as config_file:
        config = json.load(config_file)
    return config

def is_chunked_file(key):
    """Check if file is part of a chunked set."""
    pattern = r'(.+)_(\d+)_of_(\d+)\.'
    match = re.search(pattern, key)
    if match:
        base_name = match.group(1)
        chunk_num = int(match.group(2))
        total_chunks = int(match.group(3))
        return True, base_name, chunk_num, total_chunks
    return False, None, None, None

def get_all_chunks(s3, bucket, base_name, total_chunks):
    """Get all chunk files for a given base name."""
    chunk_files = []
    for i in range(1, total_chunks + 1):
        chunk_key = f"{base_name}_{i}_of_{total_chunks}.geojsonl"
        try:
            s3.head_object(Bucket=bucket, Key=chunk_key)
            chunk_files.append(chunk_key)
        except s3.exceptions.ClientError:
            return None
    return chunk_files if len(chunk_files) == total_chunks else None

def download_files(s3, bucket, files, temp_dir):
    """Download multiple files and return their local paths."""
    local_files = []
    for file_key in files:
        local_path = os.path.join(temp_dir, os.path.basename(file_key))
        s3.download_file(bucket, file_key, local_path)
        local_files.append(local_path)
    return local_files

def convert_to_pmtiles(geojson_files, pmtiles_file_path, tiles_config):
    print(f"Converting {len(geojson_files)} files to PMTiles...")
    properties = tiles_config['columnSubset'] if 'columnSubset' in tiles_config else []
    
    command = [
        'tippecanoe',
        '-o', pmtiles_file_path,
        *[f'--include={prop}' for prop in properties],
        '--force',
        f'-Z{tiles_config["minZoom"]}',
        f'-z{tiles_config["maxZoom"]}' if "maxZoom" in tiles_config else '-zg',
        '--single-precision',
        '--generate-ids',
        '-l', 'data',
        '--read-parallel',
        *geojson_files  # Pass all input files to tippecanoe
    ]
    
    print(f"Running command: {' '.join(command)}")
    subprocess.run(command, check=True)

def get_args():    
    input_bucket = os.environ.get('INPUT_BUCKET')
    output_bucket = os.environ.get('OUTPUT_BUCKET')
    input_key = os.environ.get('INPUT_KEY')
    
    # Validate required config
    if not all([input_bucket, output_bucket, input_key]):
        raise ValueError("Missing required configuration. Please provide input_bucket, output_bucket, and input_key")

    return input_bucket, output_bucket, input_key

def main():
    input_bucket, output_bucket, key = get_args()
    print(f"Input bucket={input_bucket}, output bucket={output_bucket}, input key={key}")

    s3 = boto3.client('s3')

    # Check if input and output buckets are the same
    if input_bucket == output_bucket:
        error_message = "Input and output buckets are the same. This is not allowed."
        print(error_message)
        raise ValueError(error_message)
        
    # Initialize variables
    config_key = None
    geojson_files = []
    
    # First, handle config file uploads
    if key.lower().endswith('.tiles.config.json'):
        print("Config file uploaded...")

        config_key = key
        base_key = key.rsplit('.tiles.config.json', 1)[0]
        
        # First try to find chunked files
        print("Checking for chunked files...")
        response = s3.list_objects_v2(
            Bucket=input_bucket,
            Prefix=base_key,
            MaxKeys=2 # needs to be > 1 since it's possible to just return the config.json
        )
        print(response)
        
        is_chunked = False
        for obj in response.get('Contents', []):
            if '_of_' in obj['Key']:
                is_chunked, base_name, _, total_chunks = is_chunked_file(obj['Key'])
                if is_chunked:
                    break
        
        if is_chunked:
            chunk_files = get_all_chunks(s3, input_bucket, base_name, total_chunks)
            if not chunk_files:
                print(f"Config file uploaded, but waiting for all chunks of {base_name}")
                return
            geojson_files = chunk_files
        else:
            # Check for single file
            single_file = f"{base_key}.geojsonl"
            print(f"Files not chunked. Checking for single file {single_file}")
            try:
                s3.head_object(Bucket=input_bucket, Key=single_file)
                geojson_files = [single_file]
            except s3.exceptions.ClientError:
                print(f"Neither chunked files nor single file found for {base_key}")
                return
    
    # Then, handle geojsonl file uploads
    elif key.lower().endswith('.geojsonl'):
        is_chunked, base_name, chunk_num, total_chunks = is_chunked_file(key)
        
        if is_chunked:
            chunk_files = get_all_chunks(s3, input_bucket, base_name, total_chunks)
            if not chunk_files:
                print(f"Not all chunks available yet for {base_name}. Waiting for more chunks.")
                return
            config_key = f"{base_name}.tiles.config.json"
            geojson_files = chunk_files
        else:
            config_key = key.rsplit('.', 1)[0] + '.tiles.config.json'
            geojson_files = [key]
    
    else:
        print(f"Uploaded file {key} is neither a GeoJSONL nor a config file. Skipping processing.")
        return

    # Create temp directory and download files
    temp_dir = '/tmp/processing'
    os.makedirs(temp_dir, exist_ok=True)

    # Download config file
    config_file_path = os.path.join(temp_dir, os.path.basename(config_key))
    s3.download_file(input_bucket, config_key, config_file_path)

    # Download all geojson files
    local_geojson_files = download_files(s3, input_bucket, geojson_files, temp_dir)

    # Load config and process
    config = load_json_config(config_file_path)
    output_name = config.get('id')
    if not output_name:
        raise ValueError("'id' not found in config.json")

    # Construct output file path
    pmtiles_file = os.path.join(temp_dir, f"{output_name}.pmtiles")

    # Convert to PMTiles using all input files
    convert_to_pmtiles(local_geojson_files, pmtiles_file, config)

    # Upload the PMTiles file to the output bucket
    s3.upload_file(pmtiles_file, output_bucket, f"dev/{output_name}.pmtiles")

if __name__ == '__main__':
    main()