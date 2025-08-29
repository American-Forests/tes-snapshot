import os
import sys
import json
import logging
from typing import Dict, List, Any, Optional, Tuple
import boto3
from schema_validator import validate_geojson

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('validation_integration')

# Constants
VALIDATION_CONFIG = {
    'strict_mode': False,  # If True, validation failures will prevent data loading
    'notify_on_error': True,  # Send notifications on validation errors
    'schema_path': os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                               'data', 'processed_facet_schemas.json')
}

def validate_file_before_processing(file_path: str, file_type: str) -> Tuple[bool, str]:
    """
    Validate a data file before it's processed and loaded into the database
    
    Args:
        file_path: Path to the data file
        file_type: Type of file (e.g., 'blockgroups', 'parcels')
        
    Returns:
        Tuple of (is_valid, validation_report)
    """
    logger.info(f"Validating file: {file_path} (type: {file_type})")
    
    # Skip validation for certain file types if needed
    if file_type not in ['blockgroups', 'parcels', 'rows']:
        logger.info(f"Skipping validation for file type: {file_type}")
        return True, "Validation skipped for this file type"
    
    # Validate the file
    is_valid, errors, report = validate_geojson(file_path, VALIDATION_CONFIG['schema_path'])
    
    # Log validation results
    if is_valid:
        logger.info(f"Validation passed for {file_path}")
    else:
        logger.warning(f"Validation failed for {file_path}")
        logger.warning(report)
        
        # Send notification if configured
        if VALIDATION_CONFIG['notify_on_error']:
            send_validation_notification(file_path, errors, report)
    
    # In non-strict mode, we always return True to allow processing to continue
    if not VALIDATION_CONFIG['strict_mode']:
        return True, report
    
    return is_valid, report

def send_validation_notification(file_path: str, errors: List[Dict[str, Any]], report: str) -> None:
    """
    Send a notification about validation errors
    
    Args:
        file_path: Path to the file with validation errors
        errors: List of validation errors
        report: Validation report
    """
    try:
        # Check if SNS_TOPIC_ARN is configured
        sns_topic_arn = os.environ.get('VALIDATION_SNS_TOPIC_ARN')
        if not sns_topic_arn:
            logger.warning("SNS_TOPIC_ARN not configured for validation notifications")
            return
            
        # Create SNS client
        sns = boto3.client('sns')
        
        # Create message
        message = {
            'subject': f"Data Validation Error: {os.path.basename(file_path)}",
            'file_path': file_path,
            'validation_errors': errors,
            'report': report
        }
        
        # Send notification
        sns.publish(
            TopicArn=sns_topic_arn,
            Message=json.dumps(message),
            Subject=f"Data Validation Error: {os.path.basename(file_path)}"
        )
        
        logger.info(f"Sent validation error notification for {file_path}")
    except Exception as e:
        logger.error(f"Failed to send validation notification: {str(e)}")

def patch_to_postgres_module():
    """
    Patch the to_postgres.py module to include validation checks
    
    This function modifies the load_geojson_to_postgres function to validate
    data before loading it into the database.
    """
    try:
        import to_postgres
        original_load_geojson_to_postgres = to_postgres.load_geojson_to_postgres
        
        def patched_load_geojson_to_postgres(geojson_path, table_name, engine, 
                                            columns_to_extract=None, include_geometry=True, 
                                            convert_geometry_to_multipolygon=True, 
                                            truncate_table=False):
            # Determine file type from path and table name
            file_type = None
            if 'blockgroups' in geojson_path:
                file_type = 'blockgroups'
            elif 'parcels' in geojson_path:
                file_type = 'parcels'
            elif 'rows' in geojson_path:
                file_type = 'rows'
            
            # Validate the file
            is_valid, report = validate_file_before_processing(geojson_path, file_type)
            
            # Log validation report
            logger.info(f"Validation report for {geojson_path}:\n{report}")
            
            # If validation fails in strict mode, raise an exception
            if not is_valid:
                raise ValueError(f"Validation failed for {geojson_path}. See logs for details.")
            
            # Call the original function
            return original_load_geojson_to_postgres(
                geojson_path, table_name, engine, 
                columns_to_extract, include_geometry, 
                convert_geometry_to_multipolygon, truncate_table
            )
        
        # Replace the original function with the patched version
        to_postgres.load_geojson_to_postgres = patched_load_geojson_to_postgres
        logger.info("Successfully patched to_postgres.load_geojson_to_postgres function")
        
    except ImportError:
        logger.error("Failed to import to_postgres module. Make sure it's in the Python path.")
    except Exception as e:
        logger.error(f"Failed to patch to_postgres module: {str(e)}")

def initialize_validation():
    """
    Initialize the validation system
    
    This function should be called at the start of the Lambda function
    to set up the validation system.
    """
    # Load configuration from environment variables
    if 'VALIDATION_STRICT_MODE' in os.environ:
        VALIDATION_CONFIG['strict_mode'] = os.environ['VALIDATION_STRICT_MODE'].lower() == 'true'
    
    if 'VALIDATION_NOTIFY_ON_ERROR' in os.environ:
        VALIDATION_CONFIG['notify_on_error'] = os.environ['VALIDATION_NOTIFY_ON_ERROR'].lower() == 'true'
    
    if 'VALIDATION_SCHEMA_PATH' in os.environ:
        VALIDATION_CONFIG['schema_path'] = os.environ['VALIDATION_SCHEMA_PATH']
    
    # Patch the to_postgres module
    patch_to_postgres_module()
    
    logger.info(f"Data validation initialized with config: {VALIDATION_CONFIG}")


if __name__ == "__main__":
    # This can be used to test the validation system
    if len(sys.argv) < 2:
        print("Usage: python validation_integration.py <geojson_file_path> [file_type]")
        sys.exit(1)
        
    file_path = sys.argv[1]
    file_type = sys.argv[2] if len(sys.argv) > 2 else os.path.basename(file_path).split('.')[0]
    
    is_valid, report = validate_file_before_processing(file_path, file_type)
    
    print(report)
    
    if not is_valid:
        sys.exit(1)
