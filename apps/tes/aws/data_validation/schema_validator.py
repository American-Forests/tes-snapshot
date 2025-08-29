import json
import os
import pandas as pd
import numpy as np
import logging
from typing import Dict, List, Any, Tuple, Optional, Set

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('schema_validator')

class SchemaValidator:
    """
    Validates data against schema definitions from processed_facet_schemas.json
    """
    
    def __init__(self, schema_path: str):
        """
        Initialize the validator with the schema path
        
        Args:
            schema_path: Path to the processed_facet_schemas.json file
        """
        self.schema_path = schema_path
        self.schemas = self._load_schemas()
        self.attr_type_map = self._build_attr_type_map()
        
    def _load_schemas(self) -> List[Dict[str, Any]]:
        """Load schema definitions from the JSON file"""
        try:
            with open(self.schema_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load schema file: {e}")
            raise
            
    def _build_attr_type_map(self) -> Dict[str, Dict[str, Any]]:
        """
        Build a mapping of attribute names to their expected data types and constraints
        """
        attr_map = {}
        
        for schema in self.schemas:
            attr = schema.get('attr')
            if not attr:
                continue
                
            # Skip if this attribute is already in the map (use first definition)
            if attr in attr_map:
                continue
                
            data_def = schema.get('data', {})
            data_type = data_def.get('type')
            
            if data_type == 'range':
                attr_map[attr] = {
                    'type': 'range',
                    'range': data_def.get('range', [0, 1]),
                    'gradient': data_def.get('gradient', [])
                }
            elif data_type == 'enum':
                attr_map[attr] = {
                    'type': 'enum',
                    'values': data_def.get('values', [])
                }
            elif data_type == 'boolean':
                attr_map[attr] = {
                    'type': 'boolean'
                }
            else:
                # Default to string for unknown types
                attr_map[attr] = {
                    'type': 'string'
                }
                
        return attr_map
        
    def validate_dataframe(self, df: pd.DataFrame) -> Tuple[bool, List[Dict[str, Any]]]:
        """
        Validate a pandas DataFrame against the schema definitions
        
        Args:
            df: DataFrame to validate
            
        Returns:
            Tuple of (is_valid, validation_errors)
        """
        validation_errors = []
        
        # Check each column that has a schema definition
        for column in df.columns:
            if column in self.attr_type_map:
                column_errors = self._validate_column(df, column)
                validation_errors.extend(column_errors)
                
        return len(validation_errors) == 0, validation_errors
        
    def _validate_column(self, df: pd.DataFrame, column: str) -> List[Dict[str, Any]]:
        """
        Validate a single column in the DataFrame
        
        Args:
            df: DataFrame containing the column
            column: Column name to validate
            
        Returns:
            List of validation errors
        """
        errors = []
        schema = self.attr_type_map.get(column)
        
        if not schema:
            return errors
            
        # Skip validation for columns with all null values
        if df[column].isna().all():
            logger.warning(f"Column '{column}' contains all null values - skipping validation")
            return errors
            
        # Validate based on type
        if schema['type'] == 'boolean':
            # Check that boolean values are integers (0 or 1) and not strings
            non_boolean_values = df[(~df[column].isna()) & 
                                   (~df[column].isin([0, 1]) | 
                                    df[column].apply(lambda x: isinstance(x, str)))]
            
            if len(non_boolean_values) > 0:
                errors.append({
                    'column': column,
                    'error_type': 'boolean_error',
                    'message': f"Column '{column}' contains non-boolean values. Boolean values must be integers 0 or 1.",
                    'sample_values': non_boolean_values[column].head(5).tolist(),
                    'count': len(non_boolean_values)
                })
        elif schema['type'] == 'range':
            min_val, max_val = schema['range']
            
            # Check for non-numeric values (excluding NaN)
            non_numeric = df[~df[column].isna() & ~pd.to_numeric(df[column], errors='coerce').notna()]
            if len(non_numeric) > 0:
                errors.append({
                    'column': column,
                    'error_type': 'type_error',
                    'message': f"Column '{column}' contains non-numeric values",
                    'sample_values': non_numeric[column].head(5).tolist()
                })
            
            # Check for out-of-range values
            out_of_range = df[(df[column] < min_val) | (df[column] > max_val)]
            if len(out_of_range) > 0:
                errors.append({
                    'column': column,
                    'error_type': 'range_error',
                    'message': f"Column '{column}' contains values outside range [{min_val}, {max_val}]",
                    'sample_values': out_of_range[column].head(5).tolist(),
                    'count': len(out_of_range)
                })
                
        elif schema['type'] == 'enum':
            valid_values = set(schema['values'])
            
            # Check for values not in the enum list
            invalid_values = df[~df[column].isna() & ~df[column].isin(valid_values)]
            if len(invalid_values) > 0:
                errors.append({
                    'column': column,
                    'error_type': 'enum_error',
                    'message': f"Column '{column}' contains values not in the allowed set: {valid_values}",
                    'sample_values': invalid_values[column].head(5).tolist(),
                    'count': len(invalid_values)
                })
                
        return errors
    
    def get_schema_for_attribute(self, attr_name: str) -> Optional[Dict[str, Any]]:
        """Get the schema definition for a specific attribute"""
        return self.attr_type_map.get(attr_name)
    
    def get_expected_attributes(self) -> Set[str]:
        """Get the set of all attributes defined in the schema"""
        return set(self.attr_type_map.keys())
    
    def generate_validation_report(self, validation_errors: List[Dict[str, Any]]) -> str:
        """
        Generate a human-readable validation report
        
        Args:
            validation_errors: List of validation errors
            
        Returns:
            Formatted string report
        """
        if not validation_errors:
            return "Validation passed. No errors found."
            
        report = ["Data Validation Report", "====================", ""]
        
        # Group errors by column
        errors_by_column = {}
        for error in validation_errors:
            column = error['column']
            if column not in errors_by_column:
                errors_by_column[column] = []
            errors_by_column[column].append(error)
            
        # Generate report for each column
        for column, errors in errors_by_column.items():
            report.append(f"Column: {column}")
            report.append("-" * (len(column) + 8))
            
            for error in errors:
                report.append(f"  Error Type: {error['error_type']}")
                report.append(f"  Message: {error['message']}")
                if 'sample_values' in error:
                    report.append(f"  Sample Values: {error['sample_values']}")
                if 'count' in error:
                    report.append(f"  Count: {error['count']}")
                report.append("")
                
        return "\n".join(report)


def validate_geojson(geojson_path: str, schema_path: str) -> Tuple[bool, List[Dict[str, Any]], str]:
    """
    Validate a GeoJSON file against the schema definitions
    
    Args:
        geojson_path: Path to the GeoJSON file
        schema_path: Path to the schema file
        
    Returns:
        Tuple of (is_valid, validation_errors, report)
    """
    try:
        import geopandas as gpd
        
        # Load the GeoJSON file
        gdf = gpd.read_file(geojson_path)
        
        # Create validator and validate
        validator = SchemaValidator(schema_path)
        is_valid, errors = validator.validate_dataframe(gdf)
        
        # Generate report
        report = validator.generate_validation_report(errors)
        
        return is_valid, errors, report
    except Exception as e:
        logger.error(f"Error validating GeoJSON file: {e}")
        return False, [{
            'error_type': 'validation_error',
            'message': f"Failed to validate GeoJSON file: {str(e)}"
        }], f"Validation failed with error: {str(e)}"


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Validate GeoJSON data against schema definitions")
    parser.add_argument("geojson_path", help="Path to the GeoJSON file to validate")
    parser.add_argument("--schema-path", default="../data/processed_facet_schemas.json", 
                        help="Path to the processed_facet_schemas.json file")
    
    args = parser.parse_args()
    
    is_valid, errors, report = validate_geojson(args.geojson_path, args.schema_path)
    
    print(report)
    
    if not is_valid:
        exit(1)
