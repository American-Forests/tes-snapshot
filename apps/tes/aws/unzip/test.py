import json
import boto3
import os
from moto import mock_aws
from lambda_function import handler  # Import your actual Lambda function

@mock_aws
def test_lambda_function():
    # Set up mock S3
    s3 = boto3.client('s3', region_name='us-east-1')
    s3.create_bucket(Bucket='test-input-bucket')
    s3.create_bucket(Bucket='test-output-bucket')

    # Set the OUTPUT_BUCKET environment variable
    os.environ['OUTPUT_BUCKET'] = 'test-output-bucket'

    # Upload a test zip file to the input bucket
    with open('test.zip', 'rb') as f:
        s3.put_object(Bucket='test-input-bucket', Key='/location/washington/test.zip', Body=f)

    # Create a sample S3 event
    event = {
        "Records": [{
            "Sns": {
                "Message": json.dumps({
                    "Records": [{
                        "s3": {
                            "bucket": {"name": "test-input-bucket"},
                            "object": {"key": "/location/washington/test.zip"}
                        }
                    }]
                })
            }
        }]
    }

    # Call the Lambda function
    response = handler(event, None)

    # Check the response
    print("Lambda function response:", json.dumps(response, indent=2))

    # Verify the output in the output bucket
    objects = s3.list_objects(Bucket='test-output-bucket')
    print("Objects in output bucket:", objects.get('Contents', []))

if __name__ == "__main__":
    test_lambda_function()
