
import json
import boto3
import os
import zipfile
from io import BytesIO

s3 = boto3.client('s3')

def handler(event, context):
    print(f"Event: {event}")
    print(f"Context: {context}")

    print("Parsing SNS message...")
    # Parse the SNS message
    sns_message = json.loads(event['Records'][0]['Sns']['Message'])
    
    print("Extracting bucket and key information...")
    # Extract bucket and key from the SNS message
    input_bucket = sns_message['Records'][0]['s3']['bucket']['name']
    input_key = sns_message['Records'][0]['s3']['object']['key']
    
    print(f"Input bucket: {input_bucket}")
    print(f"Input key: {input_key}")
    
    print("Getting output bucket from environment variables...")
    # Define output bucket (you may want to set this as an environment variable)
    output_bucket = os.environ['OUTPUT_BUCKET']
    print(f"Output bucket: {output_bucket}")

    print("Checking if input and output buckets are different...")
    # Check if input bucket is the same as output bucket
    if input_bucket == output_bucket:
        error_message = "Input bucket cannot be the same as output bucket"
        print(error_message)
        raise ValueError(error_message)
    
    print("Downloading zip file from S3...")
    # Download the zip file from S3
    zip_obj = s3.get_object(Bucket=input_bucket, Key=input_key)
    zip_content = zip_obj['Body'].read()
    print("Zip file downloaded successfully")
    
    print("Unzipping and processing files...")
    # List of valid files to copy
    valid_files = [
        'config.json', 
        'blockgroups.shp', 'blockgroups.shx', 'blockgroups.dbf', 'blockgroups.prj',
        'municipalities.shp', 'municipalities.shx', 'municipalities.dbf', 'municipalities.prj',
        'parcels.shp', 'parcels.shx', 'parcels.dbf', 'parcels.prj',
        'rows.shp', 'rows.shx', 'rows.dbf', 'rows.prj',
        'trees.shp', 'trees.shx', 'trees.dbf', 'trees.prj',
        'districts.shp', 'districts.shx', 'districts.dbf', 'districts.prj',
        'states.shp', 'states.shx', 'states.dbf', 'states.prj',
        'counties.shp', 'counties.shx', 'counties.dbf', 'counties.prj',
    ]
    
    # Delete existing files in the output location
    output_prefix = os.path.dirname(input_key)
    print(f"Deleting existing files in {output_prefix}...")
    existing_objects = s3.list_objects_v2(Bucket=output_bucket, Prefix=output_prefix)
    if 'Contents' in existing_objects:
        for obj in existing_objects['Contents']:
            print(f"Deleting {obj['Key']}...")
            s3.delete_object(Bucket=output_bucket, Key=obj['Key'])
    print("Finished deleting existing files")

    # Unzip the file
    with zipfile.ZipFile(BytesIO(zip_content)) as zip_ref:
        for file_name in valid_files:
            if file_name in zip_ref.namelist():
                print(f"Processing file: {file_name}")
                file_content = zip_ref.read(file_name)
                
                # Determine the output key (same as input, but in output bucket)
                output_key = os.path.join(os.path.dirname(input_key), file_name)
                print(f"Output key: {output_key}")
                
                print(f"Uploading {file_name} to output bucket...")
                # Upload the file to the output bucket
                s3.put_object(Bucket=output_bucket, Key=output_key, Body=file_content)
                print(f"{file_name} uploaded successfully")
    
    print("All valid files processed and uploaded")
    return {
        'statusCode': 200,
        'body': json.dumps('Valid files unzipped and saved successfully')
    }