# TES Data Quality Assurance System

This module provides a data validation framework for the TES application to ensure data updates meet the criteria defined in the processed facet schemas.

## Overview

The data validation system checks incoming GeoJSON data files against the attribute data types and constraints defined in `processed_facet_schemas.json`. It can be used as:

1. A standalone validation tool for testing data files
2. An integrated validation layer in the AWS data processing pipeline
3. A yarn script for validating data locally

## Components

- `schema_validator.py`: Core validation logic that checks data against schema definitions
- `validation_integration.py`: Integration with the existing AWS data processing pipeline
- `lambda_function_with_validation.py`: Modified Lambda function that includes validation
- `validate_data.py`: Standalone validation script for testing data files
- `scripts/validate-data.js`: Node.js script for running validation via yarn

## Installation

```bash
# Navigate to the validation directory
cd apps/tes/aws/data_validation

# Install Python dependencies
pip install -r requirements.txt
```

## Usage

### Using Yarn Script (Recommended)

The easiest way to run validation is using the yarn script:

```bash
# Validate a specific TESA location (e.g., maricopa)
yarn data:validation --tesa=maricopa

# Validate national data
yarn data:validation --national

# Validate with strict mode (exit with error code if validation fails)
yarn data:validation --tesa=maricopa --strict

# Save validation reports to files
yarn data:validation --tesa=maricopa --output=reports

# Validate feature counts (compare with source shapefiles)
yarn data:validation --tesa=maricopa --validate-features
```

### Prerequisites for Yarn Script

Before running validation, ensure you have the data files downloaded:

```bash
# For a specific location (e.g., maricopa)
TESA=maricopa yarn download:tesa

# For national data
yarn download:national
```

### Standalone Python Validation

To validate a GeoJSON file directly with the Python script:

```bash
python validate_data.py path/to/your/file.geojson
```

Options:
- `--schema-path`: Path to the schema file (default: ../../data/processed_facet_schemas.json)
- `--output`: Path to write validation report (default: stdout)
- `--strict`: Exit with error code if validation fails

### Integration with AWS Pipeline

To integrate validation into the AWS data processing pipeline:

1. Update the Lambda function to use `lambda_function_with_validation.py`
2. Configure validation behavior using environment variables:
   - `VALIDATION_STRICT_MODE`: If "true", validation failures will prevent data loading
   - `VALIDATION_NOTIFY_ON_ERROR`: If "true", send notifications on validation errors
   - `VALIDATION_SNS_TOPIC_ARN`: SNS topic ARN for validation error notifications
   - `VALIDATION_SCHEMA_PATH`: Custom path to schema file (optional)

## Validation Checks

The system validates data against the following schema types:

1. **Range values**: Checks that numeric values fall within the defined range
   - Example: Ensuring `tree_equity_score` is between 0-100
   - Example: Ensuring `tree_canopy` is between 0-1

2. **Enum values**: Checks that values match one of the allowed options
   - Example: Ensuring `holc_grade` is one of "A", "B", "C", "D", "E"
   - Example: Ensuring `ej_disadvantaged` is "Yes" when present

3. **Boolean values**: Ensures boolean values are stored as integers (0 or 1), not strings
   - Example: Checking that `school` is stored as `0` or `1`, not "0" or "1"
   - Example: Ensuring `cooling_center` has proper numeric boolean format

4. **Type validation**: Ensures data types match schema definitions
   - Example: Ensuring numeric fields contain only numeric values
   - Example: Checking for non-numeric values in numeric fields

5. **Feature count validation**: Compares features between geojsonl files and source shapefiles
   - Verifies that all features from source shapefiles are properly transferred
   - Identifies specifically which features might be missing
   - Helps diagnose data conversion issues

## Validation Report

The validation report provides detailed information about any validation errors:

```
Data Validation Report
====================

Column: tree_equity_score
------------------------
  Error Type: range_error
  Message: Column 'tree_equity_score' contains values outside range [0, 100]
  Sample Values: [101.2, 105.7, 103.1]
  Count: 15

Column: holc_grade
-----------------
  Error Type: enum_error
  Message: Column 'holc_grade' contains values not in the allowed set: {'A', 'B', 'C', 'D', 'E'}
  Sample Values: ['F', 'G']
  Count: 3
  
Column: school
-----------------
  Error Type: boolean_error
  Message: Column 'school' contains non-boolean values. Boolean values must be integers 0 or 1.
  Sample Values: ["0", "1", "Yes"]
  Count: 8
  
Feature Count Validation
======================

Failed: Feature count mismatch: geojsonl has 98 features, shapefile has 100 features
GEOJSONL count: 98
Shapefile count: 100
2 features from shapefile missing in geojsonl: id123, id456
```

## Error Handling

Validation errors are reported with:
- Column name
- Error type (range_error, enum_error, type_error)
- Detailed message
- Sample of invalid values
- Count of invalid records

In strict mode, validation failures will prevent data from being loaded into the database.
In non-strict mode, validation errors will be logged but processing will continue.

## Notifications

When configured, validation errors will trigger SNS notifications containing:
- File path
- Validation errors
- Detailed report

This allows for automated monitoring of data quality issues.

## File Selection

The validation system focuses on specific file types:

- Only processes `.geojsonl` files (excludes `.geojson` and `.json`)  
- Excludes any trees-related files by default
- Validates files one by one with detailed reporting

This targeted approach ensures efficient and focused validation of the most critical data files.

## Requirements

Python dependencies (see `requirements.txt`):
- pandas>=1.3.0
- numpy>=1.20.0
- geopandas>=0.10.0
- boto3>=1.20.0
- shapely>=1.8.0
- fiona>=1.8.20
