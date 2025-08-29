#!/usr/bin/env python3
"""
Data validation utility for TES data files.
This script validates GeoJSON files against the schema defined in processed_facet_schemas.json.
"""

import os
import sys
import argparse
import json
import logging
from schema_validator import validate_geojson
from feature_validator import validate_feature_count

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('validate_data')

def main():
    parser = argparse.ArgumentParser(description="Validate TES data files against schema definitions")
    parser.add_argument("file_path", help="Path to the GeoJSON file to validate")
    parser.add_argument("--schema-path", 
                        default=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                                            'data', 'processed_facet_schemas.json'),
                        help="Path to the processed_facet_schemas.json file")
    parser.add_argument("--output", help="Path to write validation report (default: stdout)")
    parser.add_argument("--strict", action="store_true", help="Exit with error code if validation fails")
    parser.add_argument("--shapefile", help="Path to source shapefile for feature count validation")
    parser.add_argument("--validate-features", action="store_true", help="Enable feature count validation")
    
    args = parser.parse_args()
    
    # Validate the file against schema
    is_valid, errors, report = validate_geojson(args.file_path, args.schema_path)
    
    # Add feature count validation if requested
    if args.validate_features and args.file_path.endswith('.geojsonl'):
        logger.info("Validating feature count...")
        feature_valid, feature_error, feature_counts = validate_feature_count(args.file_path, args.shapefile)
        
        # Add feature validation results to report
        report += "\n\nFeature Count Validation\n======================\n"
        
        if feature_valid is True:
            report += f"\nPassed: Both files have {feature_counts['geojsonl']} features."
        elif feature_valid is False:
            report += f"\nFailed: {feature_error}\n"
            report += f"GEOJSONL count: {feature_counts['geojsonl']}\n"
            report += f"Shapefile count: {feature_counts['shapefile']}"
            is_valid = False  # Fail the overall validation if feature count doesn't match
        else:
            report += f"\nSkipped: {feature_error}\n"
            report += f"GEOJSONL Feature count: {feature_counts['geojsonl']}"
    
    # Output the report
    if args.output:
        with open(args.output, 'w') as f:
            f.write(report)
            
            # Also write JSON format for machine processing
            json_report = {
                'is_valid': is_valid,
                'errors': errors,
                'file_path': args.file_path
            }
            
            # Add feature validation results to JSON if available
            if args.validate_features and args.file_path.endswith('.geojsonl'):
                json_report['feature_validation'] = {
                    'is_valid': feature_valid,
                    'error': feature_error,
                    'counts': feature_counts
                }
                
            json_path = args.output + '.json'
            with open(json_path, 'w') as jf:
                json.dump(json_report, jf, indent=2)
            
            print(f"Validation report written to {args.output}")
            print(f"JSON report written to {json_path}")
    else:
        print(report)
    
    # Exit with appropriate code
    if not is_valid and args.strict:
        sys.exit(1)
    
    sys.exit(0)

if __name__ == "__main__":
    main()
