import boto3
import json
import os
import re
from to_postgres import load_national_explorer, load_tesa_file, load_toronto_tesa

def handler(event, context):
    print("Starting handler function")
    print(f"Event: {event}")
    print(f"Context: {context}")
    s3 = boto3.client('s3')

    # Parse the SNS message from the event
    sns_message = json.loads(event['Records'][0]['Sns']['Message'])
    s3_event = sns_message['Records'][0]['s3']
    input_bucket = s3_event['bucket']['name']
    
    # Get the secret name from environment variable
    database_url_secret_name = os.environ.get('DATABASE_URL_SECRET_NAME')
    if not database_url_secret_name:
        raise ValueError("DATABASE_URL_SECRET_NAME environment variable is not set")
    
    print(f"Database URL secret name: {database_url_secret_name}")

    required_files = {
        'national': ['municipalities.geojsonl', 'blockgroups.geojsonl', 'districts.geojsonl', 'counties.geojsonl', 'states.geojsonl'],
        'tesa': {
            'blockgroups.geojsonl': 'BlockgroupSupplemental',
            r'parcels(?:_\d+_of_\d+)?\.geojsonl': 'Area',
            r'rows(?:_\d+_of_\d+)?\.geojsonl': 'Area'
        },
        'toronto-tesa': ['municipalities.geojsonl', 'blockgroups.geojsonl', 'parcels.geojsonl', 'rows.geojsonl']
    }

    key = s3_event['object']['key']
    
    print(f"Checking if {key} is a National Explorer, US TESA, or Toronto TESA upload...")
    # Determine if it's a national or tesa upload
    if key.startswith('national'):
        file_set = 'national'
    elif key.startswith('location/toronto'):
        file_set = 'toronto-tesa'
    elif key.startswith('location'):
        file_set = 'tesa'
    else:
        error_message = 'Invalid key prefix. Must start with national or location.'
        print(f"Error: {error_message}")
        raise ValueError(error_message)
    
    print(f"File set: {file_set}")
    
    # Modified file existence check
    key_prefix = '/'.join(key.split('/')[:2]) if key.startswith('location') else 'national'
    print(f"Key prefix: {key_prefix}")
    
    if file_set == 'national' or file_set == 'toronto-tesa':
        # Check all national files exist
        missing_files = []
        for file in required_files[file_set]:
            file_key = f'{key_prefix}/{file}'
            print(f"Checking if {file_key} exists...")
            try:
                s3.head_object(Bucket=input_bucket, Key=file_key)
            except s3.exceptions.ClientError:
                missing_files.append(file_key)

        if missing_files:
            error_message = f'Missing required files: {", ".join(missing_files)}'
            print(f"Error: {error_message}")
            raise ValueError(error_message)

    # Create a Secrets Manager client
    secrets_manager = boto3.client('secretsmanager')
    
    try:
        # Retrieve the secret value
        get_secret_value_response = secrets_manager.get_secret_value(SecretId=database_url_secret_name)
    except Exception as e:
        print(f"Error retrieving secret: {str(e)}")
        raise e
    
    # Get the database URL directly from the secret value
    database_url = get_secret_value_response['SecretString']

    print(f"Database URL: {database_url}")

    # Download all files to /tmp directory
    temp_dir = '/tmp/processing'
    os.makedirs(temp_dir, exist_ok=True)

    # Modified file processing section
    if file_set == 'national':
        # Download all national files
        for file in required_files[file_set]:
            file_key = f'{key_prefix}/{file}'
            download_path = os.path.join(temp_dir, file)
            print(f"Downloading {file_key} to {download_path}...")
            s3.download_file(input_bucket, file_key, download_path)
        
        print(f"All required national files downloaded to {temp_dir}")
        load_national_explorer(temp_dir, database_url)

    elif file_set == 'toronto-tesa':
        for file in required_files[file_set]:
            file_key = f'{key_prefix}/{file}'
            download_path = os.path.join(temp_dir, file)
            print(f"Downloading {file_key} to {download_path}...")
            s3.download_file(input_bucket, file_key, download_path)
        print(f"All required national files downloaded to {temp_dir}")
        load_toronto_tesa(temp_dir, database_url)
    
    elif file_set == 'tesa':
        # Process only the triggered file
        file_name = key.split('/')[-1]
        
        # Find matching pattern in required_files['tesa']
        table_name = None
        for pattern, table in required_files['tesa'].items():
            if re.match(pattern, file_name):
                table_name = table
                break
                
        if table_name is None:
            error_message = f'Invalid TESA file: {file_name}'
            print(f"Error: {error_message}")
            raise ValueError(error_message)
        
        download_path = os.path.join(temp_dir, file_name)
        print(f"Downloading {key} to {download_path}...")
        s3.download_file(input_bucket, key, download_path)
        
        # Call the appropriate load function based on the file
        load_tesa_file(download_path, database_url, file_name, table_name)

    print("File(s) loaded successfully")
