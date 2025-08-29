import os
import boto3
import subprocess

def handler(event, context):
    # check for required environment variables
    output_bucket = os.getenv('OUTPUT_S3_BUCKET')

    if not output_bucket:
        return {
            'statusCode': 400,
            'body': 'Missing OUTPUT_S3_BUCKET environment variable.'
        }
    
    s3_client = boto3.client('s3')
    
    bucket = event['Records'][0]['s3']['bucket']['name']
    
    # throw an error if output_bucket is the same as the input bucket
    if bucket == output_bucket:
        return {
            'statusCode': 400,
            'body': 'The output bucket cannot be the same as the input bucket.'
        }
    
    print(f"Processing event from S3 bucket {bucket}")
    print(f"Output will be saved to S3 bucket {output_bucket}")

    key = event['Records'][0]['s3']['object']['key']
    key_parts = key.split('/')
    file_name = key_parts[-1]
    local_geojson_path = '/tmp/' + file_name
    local_mbtiles_file = 'trees.mbtiles'
    local_mbtiles_path =  f"/tmp/{local_mbtiles_file}"

    # check if the uploaded file is trees.geojson/trees.geojsonl
    if not key.endswith('trees.geojson') and not key.endswith('trees.geojsonl'):
        print(f"The file {key} is not a 'trees.geojson' or 'trees.geojsonl', no action taken.")
        return {
            'statusCode': 200,
            'body': f"No action taken for file {key}."
        }
    
    # Extract the TESA location from the key
    # Ensure the path structure has exactly 4 segments including the leading empty segment from the initial "/"
    if len(key_parts) != 3 or key_parts[0] != "location":
        print(f"The file {key} does not follow the expected path format, no action taken. The trees.geojson (or .geojsonl) file should be in the format /location/TESA_LOCATION/trees.geojson.")
        return {
            'statusCode': 200,
            'body': f"No action taken for file {key} due to unexpected path format."
        }
    
    tesa_id = key_parts[1]
    print(f"TESA ID: {tesa_id}")

    # Download the geojson file from S3 to Lambda /tmp/ directory
    try: 
        print(f"Downloading {key} from S3 bucket {bucket}")
        s3_client.download_file(bucket, key, local_geojson_path)
        print(f"Successfully downloaded {key} from S3 bucket {bucket} to {local_geojson_path}")

    except Exception as e:
        print(e)
        print(f"Error downloading {key} from S3 bucket {bucket} to {local_geojson_path}")
        raise e
    
    # Convert geojson to mbtiles
    try: 
        print(f"Converting {key} to mbtiles")
        subprocess.run(['tippecanoe', '-Z14', '-z16', '-o', local_mbtiles_path, '--drop-densest-as-needed', local_geojson_path], check=True)
        print(f"Successfully converted {key} to mbtiles {local_mbtiles_path}")
    
    except Exception as e:
        print(e)
        print(f"Error converting {key} to mbtiles {local_mbtiles_path}")
        raise e
    
    # save the mbtiles file to S3
    try:
        mbtiles_key = f"location/{tesa_id}/{local_mbtiles_file}"
        print(f"Uploading {mbtiles_key} to S3 bucket {output_bucket}")
        s3_client.upload_file(local_mbtiles_path, output_bucket, mbtiles_key)
        print(f"Successfully uploaded {mbtiles_key} to S3 bucket {output_bucket}")

    except Exception as e:
        print(e)
        print(f"Error uploading {mbtiles_key} to S3 bucket {bucket}")
        raise e


