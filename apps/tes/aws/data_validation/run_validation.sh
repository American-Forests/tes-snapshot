#!/bin/bash

# Parse arguments
TESA=""
NATIONAL=false
SCHEMA_PATH="../../data/processed_facet_schemas.json"

# Process all arguments passed to the script
for arg in "$@"; do
  if [[ $arg == --tesa=* ]]; then
    TESA="${arg#*=}"
  elif [[ $arg == "--national" ]]; then
    NATIONAL=true
  fi
done

# Validate arguments
if [[ -z "$TESA" && "$NATIONAL" == "false" ]]; then
  echo "Error: You must specify either --tesa=<location> or --national"
  exit 1
fi

if [[ -n "$TESA" && "$NATIONAL" == "true" ]]; then
  echo "Error: You cannot specify both --tesa and --national"
  exit 1
fi

# Determine data path
if [[ "$NATIONAL" == "true" ]]; then
  DATA_PATH="../../local/national"
else
  DATA_PATH="../../local/location/$TESA"
fi

# Check if data directory exists
if [[ ! -d "$DATA_PATH" ]]; then
  echo "Error: Data directory not found at $DATA_PATH"
  echo "You may need to download the data first with:"
  if [[ "$NATIONAL" == "true" ]]; then
    echo "  yarn download:national"
  else
    echo "  TESA=$TESA yarn download:tesa"
  fi
  exit 1
fi

# Find GeoJSON files to validate
GEOJSON_FILES=($DATA_PATH/*.geojson $DATA_PATH/*.json 2>/dev/null)

# Check if any files were found
if [[ ${#GEOJSON_FILES[@]} -eq 0 || ! -f "${GEOJSON_FILES[0]}" ]]; then
  echo "Error: No GeoJSON files found in $DATA_PATH"
  exit 1
fi

echo "Found ${#GEOJSON_FILES[@]} files to validate in $DATA_PATH"

# Validate each file
echo "Starting data validation..."
echo "Schema: $SCHEMA_PATH"
echo "Data location: $DATA_PATH"

EXIT_CODE=0

for file in "${GEOJSON_FILES[@]}"; do
  if [[ -f "$file" ]]; then
    echo "Validating $(basename "$file")..."
    python validate_data.py "$file" --schema-path "$SCHEMA_PATH"
    
    # Capture the exit code but don't exit immediately
    if [[ $? -ne 0 ]]; then
      EXIT_CODE=1
    fi
  fi
done

if [[ $EXIT_CODE -eq 0 ]]; then
  echo "Validation complete. All files passed."
else
  echo "Validation complete. Some files had validation issues."
fi

exit $EXIT_CODE
