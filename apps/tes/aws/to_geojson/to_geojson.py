import fiona
import orjson as json
import os
import numpy as np
from shapely.geometry import mapping

def download_shapefile(s3_client, input_bucket, key, temp_dir):
    local_path = os.path.join(temp_dir, os.path.basename(key))
    s3_client.download_file(input_bucket, key, local_path)
    return local_path

def map_nan_to_none(v):
    return None if isinstance(v, float) and np.isnan(v) else v

def get_geojson_feature(feature, column_map):
    properties = {
        column_map.get(k, k): map_nan_to_none(v) for k, v in feature['properties'].items()
    }
    
    # Create and write GeoJSON feature
    geojson_feature = {
        "type": "Feature",
        "geometry": mapping(feature['geometry']),
        "properties": properties
    }

    return geojson_feature

def write_feature(file, geojson_feature):
    file.write(json.dumps(geojson_feature).decode('utf-8') + '\n')

def shpfile_to_geojsonl(shp_path, base_output_path, column_map, chunk_size=500000, should_chunk=False):
    print(f"Converting {shp_path}...")
    
    # First check total features if chunking might be needed
    with fiona.open(shp_path) as source:
        total_features = len(source)
        needs_chunking = should_chunk and total_features > chunk_size
        print(f"There are {total_features} features in {shp_path}...")

        if needs_chunking:
            num_chunks = (total_features + chunk_size - 1) // chunk_size
            print(f"Chunking {total_features} features into {num_chunks} chunks...")
            feature_count = 0
            current_chunk = 0
            
            # Initialize the first chunk file
            current_output_path = f"{base_output_path}_{current_chunk + 1}_of_{num_chunks}.geojsonl"
            current_file = open(current_output_path, 'w')
            output_paths = [current_output_path]
            print(f"Writing to {current_output_path}...")
            
            try:
                for feature in source:
                    # If we've reached chunk_size, close current file and open new one
                    if feature_count > 0 and feature_count % chunk_size == 0:
                        current_file.close()
                        current_chunk += 1
                        current_output_path = f"{base_output_path}_{current_chunk + 1}_of_{num_chunks}.geojsonl"
                        current_file = open(current_output_path, 'w')
                        output_paths.append(current_output_path)
                        print(f"Writing to {current_output_path}...")

                    geojson_feature = get_geojson_feature(feature, column_map=column_map)
                    write_feature(current_file, geojson_feature)
                    feature_count += 1
            finally:
                current_file.close()
            
            print(f"Created {num_chunks} chunk files")
            return output_paths
        
        else:
            output_path = f"{base_output_path}.geojsonl"
            with open(output_path, 'w') as dest:
                print(f"Writing to {output_path}...")
                for feature in source:
                    geojson_feature = get_geojson_feature(feature, column_map=column_map)
                    write_feature(dest, geojson_feature)
            return [output_path]

def process_file(shp_path, config_path, file_type):
    print(f"Processing files...")
    with open(config_path, 'r') as config_file:
        config = json.loads(config_file.read())
    
    column_map = {}
    if file_type in config and 'columnMap' in config[file_type]:
        column_map = {item[0]: item[1] for item in config[file_type]['columnMap']}

    base_output_path = os.path.join(os.path.dirname(shp_path), file_type)
    should_chunk = file_type in ['parcels', 'rows', 'trees']
    
    return shpfile_to_geojsonl(shp_path, base_output_path, column_map, should_chunk=should_chunk)

def test_process_file(shp_path, config_path, file_type):
    print(f"Testing process_file with:")
    print(f"  Shapefile: {shp_path}")
    print(f"  Config file: {config_path}")
    print(f"  File type: {file_type}")
    
    try:
        result_path = process_file(shp_path, config_path, file_type)
        print(f"Process completed successfully. Output file: {result_path}")
        
        # Optionally, you can add more checks here, such as:
        # - Verifying the output file exists
        # - Checking the content of the output file
        # - Comparing the output with expected results
        
    except Exception as e:
        print(f"An error occurred during processing: {str(e)}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 4:
        print("Usage: python to_geojson.py <shp_path> <config_path> <file_type>")
        sys.exit(1)
    
    shp_path = sys.argv[1]
    config_path = sys.argv[2]
    file_type = sys.argv[3]
    
    test_process_file(shp_path, config_path, file_type)
