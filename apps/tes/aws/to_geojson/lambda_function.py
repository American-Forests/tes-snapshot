import json
import os
import boto3
import tempfile
from to_geojson import process_file

def download_shapefile(s3_client, input_bucket, key, temp_dir):
    local_path = os.path.join(temp_dir, os.path.basename(key))
    s3_client.download_file(input_bucket, key, local_path)
    return local_path

def file_exists(s3_client, bucket, key):
    try:
        s3_client.head_object(Bucket=bucket, Key=key)
        return True
    except s3_client.exceptions.ClientError:
        return False

def handler(event, context):
    print("Starting handler function")
    print(f"Event: {event}")
    print(f"Context: {context}")
    s3 = boto3.client('s3')

    # Parse the SNS message from the event
    sns_message = json.loads(event['Records'][0]['Sns']['Message'])
    
    # Get bucket, key, and location_id from the S3 event in the SNS message
    input_bucket = sns_message['Records'][0]['s3']['bucket']['name']
    input_key = sns_message['Records'][0]['s3']['object']['key']

    # If config.json is uploaded, skip processing
    if input_key.endswith('config.json'):
        print("Config file uploaded - skipping processing")
        return {
            'statusCode': 200,
            'body': json.dumps('Config file uploaded - no processing needed')
        }
    
    # Extract location_id from the key
    key_parts = input_key.split('/')
    if key_parts[0] == 'location' and len(key_parts) >= 3:
        location_id = key_parts[1]
        file_type = os.path.splitext(key_parts[-1])[0]
    elif key_parts[0] == 'national' and len(key_parts) >= 2:
        location_id = 'national'
        file_type = os.path.splitext(key_parts[-1])[0]
    else:
        raise ValueError(f"Invalid key format: {input_key}. Expected format: location/location_id/file_type.shp or national/file_type.shp")
    
    print(f"Location ID: {location_id}")
    print(f"File Type: {file_type}")
    
    output_bucket = os.environ['OUTPUT_BUCKET']
    if input_bucket == output_bucket:
        error_message = "Output bucket cannot be the same as input bucket"
        print(error_message)
        return {
            'statusCode': 400,
            'body': json.dumps(error_message)
        }

    # Check if all necessary files are present
    required_extensions = ['.shp', '.shx', '.dbf', '.prj']
    base_key = os.path.dirname(input_key)
    print(f"Base key: {base_key}")
    
    missing_files = [ext for ext in required_extensions if not file_exists(s3, input_bucket, f"{base_key}/{file_type}{ext}")]

    if missing_files:
        print(f"The following required files are missing for {base_key}/{file_type}:")
        for missing_file in missing_files:
            print(f"- {base_key}/{file_type}{missing_file}")
        print("Exiting due to missing files.")
        return {
            'statusCode': 200,
            'body': json.dumps('Processing skipped - not all necessary shp file extensions present')
        }
    
    config_key = f"{base_key}/config.json"
    if not file_exists(s3, input_bucket, config_key):
        print("Config file not found. Exiting.")
        return {
            'statusCode': 200,
            'body': json.dumps('Processing skipped - config file not found')
        }
    
    temp_dir = '/tmp'

    # Download config file if it exists, otherwise exit
    config_path = os.path.join(temp_dir, 'config.json')
    print(f"Downloading config.json to {temp_dir}")
    s3.download_file(input_bucket, config_key, config_path)

    # Download all necessary files
    for ext in required_extensions:
        print(f"Downloading {base_key}/{file_type}{ext} to {temp_dir}")
        download_shapefile(s3, input_bucket, f"{base_key}/{file_type}{ext}", temp_dir)
        print(f"File downloaded.")

    shp_path = os.path.join(temp_dir, f"{file_type}.shp")

    # Process the file
    geojson_paths = process_file(shp_path, config_path, file_type)

    # Delete existing geojsonl files before uploading new ones
    output_prefix = f"{'national' if location_id == 'national' else f'location/{location_id}'}/{file_type}"
    print(f"Checking for existing geojsonl files in {output_bucket}/{output_prefix}")
    existing_objects = s3.list_objects_v2(Bucket=output_bucket, Prefix=output_prefix)
    if 'Contents' in existing_objects:
        for obj in existing_objects['Contents']:
            if obj['Key'].endswith('.geojsonl'):
                print(f"Deleting existing file: {obj['Key']}")
                s3.delete_object(Bucket=output_bucket, Key=obj['Key'])

    for geojson_path in geojson_paths:
        # Get just the filename from the full path
        output_key = f"{'national' if location_id == 'national' else f'location/{location_id}'}/{os.path.basename(geojson_path)}"
        s3.upload_file(geojson_path, output_bucket, output_key)
        print(f"Uploaded to {output_bucket}/{output_key}")

    print("GeoJSON conversion and upload completed")

    return {
        'statusCode': 200,
        'body': json.dumps('Processing completed successfully')
    }
