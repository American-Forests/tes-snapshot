import json
import os
import boto3
import subprocess
import logging
from datetime import datetime

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    # Check required environment variables
    mapbox_access_token = os.getenv('MAPBOX_ACCESS_TOKEN')
    mapbox_username = os.getenv('MAPBOX_USERNAME')
    
    if not mapbox_access_token or not mapbox_username:
        logger.error('Missing required environment variables: MAPBOX_ACCESS_TOKEN and/or MAPBOX_USERNAME')
        return {
            'statusCode': 400,
            'body': json.dumps('Error: Missing required environment variables.')
        }
    else:
        logger.info('Environment variables are set.')

    # Extract the bucket name and key from the Lambda event
    source_bucket = event['Records'][0]['s3']['bucket']['name']
    source_key = event['Records'][0]['s3']['object']['key']
    logger.info(f'Processing file {source_key} from bucket {source_bucket}.')

    if not source_key.endswith('trees.mbtiles'):
        logger.error('The uploaded file is not a "trees.mbtiles" file.')
        return {
            'statusCode': 200,
            'body': json.dumps('The uploaded file is not a "trees.mbtiles" file.')
        }

    # source key is of the format location/TESA_LOCATION/trees.mbtiles
    key_parts = source_key.split('/')
    if len(key_parts) != 3 or key_parts[0] != "location":
        logger.error(f'The file {source_key} does not follow the expected path format.')
        return {
            'statusCode': 200,
            'body': json.dumps(f'The file {source_key} does not follow the expected path format.')
        }
    # get tesa location
    tesa_location = key_parts[1]
    logger.info(f'TESA Location: {tesa_location}')
    
    # Download the file from S3 to the Lambda environment
    s3_client = boto3.client('s3')
    download_path = f'/tmp/trees.mbtiles'
    s3_client.download_file(source_bucket, source_key, download_path)
    logger.info(f'File downloaded to Lambda environment: {download_path}')
    
    current_date = datetime.now().strftime('%Y%m%d')  # Outputs as 'YYYYMMDD'
    tileset_id = f'{mapbox_username}.{tesa_location}-trees-{current_date}'
    logger.info(f'Tileset ID generated: {tileset_id}')
    command = [
        'mapbox', 'upload', tileset_id, download_path
    ]
    try:
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        logger.info(f'Mapbox upload job created successfully. Output: {result.stdout}')
        return {
            'statusCode': 200,
            'body': json.dumps('File processed and upload initiated to Mapbox successfully!')
        }
    except subprocess.CalledProcessError as e:
        logger.error(f'Failed to create Mapbox upload job. Error: {e.stderr}')
        return {
            'statusCode': e.returncode,
            'body': json.dumps(f'Failed to create Mapbox upload job. Error: {e.stderr}')
        }

