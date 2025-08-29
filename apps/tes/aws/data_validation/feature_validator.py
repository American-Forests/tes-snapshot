#!/usr/bin/env python3
"""
Feature validation utility for TES geojsonl files.
This script validates that all features in the original shapefile are present in the geojsonl file.
"""

import os
import logging
import geopandas as gpd
import pandas as pd
import json

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('feature_validator')

def get_features_from_shapefile(shapefile_path):
    """Get features and their IDs from a shapefile"""
    try:
        gdf = gpd.read_file(shapefile_path)
        # Try to get IDs - look for common ID field names
        id_field = None
        for field in ['id', 'ID', 'Id', 'fid', 'FID', 'OBJECTID', 'OID', 'gid', 'GID']:
            if field in gdf.columns:
                id_field = field
                break
        
        if id_field:
            # Return a dictionary of {id: feature_index}
            return {
                str(gdf[id_field][i]): i for i in range(len(gdf))
            }, len(gdf)
        else:
            # No ID field found, use index as ID
            return {str(i): i for i in range(len(gdf))}, len(gdf)
    except Exception as e:
        logger.error(f"Error reading shapefile {shapefile_path}: {e}")
        return None, None

def get_features_from_geojsonl(geojsonl_path):
    """Get features and their IDs from a GeoJSONL file"""
    try:
        features = {}
        count = 0
        with open(geojsonl_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line:  # Skip empty lines
                    count += 1
                    try:
                        feature = json.loads(line)
                        # Try to get ID from properties
                        props = feature.get('properties', {})
                        feature_id = None
                        
                        # Try different common ID fields
                        for id_field in ['id', 'ID', 'Id', 'fid', 'FID', 'OBJECTID', 'OID', 'gid', 'GID']:
                            if id_field in props:
                                feature_id = props[id_field]
                                break
                        
                        # If no ID found, use index as ID
                        if feature_id is None:
                            feature_id = f"feature_{count}"
                            
                        features[str(feature_id)] = count
                    except json.JSONDecodeError:
                        logger.warning(f"Invalid JSON at line {count} in {geojsonl_path}")
        return features, count
    except Exception as e:
        logger.error(f"Error reading geojsonl file {geojsonl_path}: {e}")
        return None, None

def validate_feature_count(geojsonl_path, shapefile_path=None):
    """
    Validate that the feature count in the geojsonl file matches the shapefile.
    
    If shapefile_path is not provided, this will attempt to locate a corresponding
    shapefile based on naming conventions.
    
    Returns:
        tuple: (is_valid, error_message, feature_counts)
    """
    # Get features from the geojsonl file
    geojsonl_features, geojsonl_count = get_features_from_geojsonl(geojsonl_path)
    
    if geojsonl_features is None or geojsonl_count is None:
        return False, "Failed to read features from geojsonl file", None
    
    # If no shapefile provided, try to find one based on naming conventions
    if shapefile_path is None:
        geojsonl_name = os.path.basename(geojsonl_path)
        dir_path = os.path.dirname(geojsonl_path)
        
        # Remove the file extension and any part numbers
        base_name = geojsonl_name.split('.')[0]
        if '_' in base_name:
            # Handle split files like "parcels_4_of_4.geojsonl"
            parts = base_name.split('_')
            if len(parts) > 2 and parts[-2] == 'of':
                base_name = '_'.join(parts[:-3])
        
        # Look for matching shapefile in the same directory
        potential_shapefile = None
        for file in os.listdir(dir_path):
            if file.endswith('.shp') and base_name.lower() in file.lower():
                potential_shapefile = os.path.join(dir_path, file)
                logger.info(f"Found matching shapefile: {file}")
                break
        
        shapefile_path = potential_shapefile
    
    # If we have a shapefile, get its features and compare
    if shapefile_path and os.path.exists(shapefile_path):
        shapefile_features, shapefile_count = get_features_from_shapefile(shapefile_path)
        
        if shapefile_features is None or shapefile_count is None:
            return False, "Failed to read features from shapefile", {"geojsonl": geojsonl_count}
        
        is_valid = geojsonl_count == shapefile_count
        
        # If counts don't match, identify which features are missing
        if not is_valid:
            error_message = f"Feature count mismatch: geojsonl has {geojsonl_count} features, shapefile has {shapefile_count} features"
            
            # Find missing features
            geojsonl_ids = set(geojsonl_features.keys())
            shapefile_ids = set(shapefile_features.keys())
            
            missing_in_geojsonl = shapefile_ids - geojsonl_ids
            missing_in_shapefile = geojsonl_ids - shapefile_ids
            
            result = {
                "geojsonl": geojsonl_count, 
                "shapefile": shapefile_count,
                "missing_in_geojsonl": list(missing_in_geojsonl)[:10],  # Limit to first 10 for readability
                "missing_in_shapefile": list(missing_in_shapefile)[:10],
                "total_missing_in_geojsonl": len(missing_in_geojsonl),
                "total_missing_in_shapefile": len(missing_in_shapefile)
            }
            
            # Add details about missing features to error message
            if missing_in_geojsonl:
                error_message += f"\n{len(missing_in_geojsonl)} features from shapefile missing in geojsonl"
                if len(missing_in_geojsonl) <= 10:
                    error_message += f": {', '.join(list(missing_in_geojsonl))}"
                else:
                    error_message += f" (first 10): {', '.join(list(missing_in_geojsonl)[:10])}"
                    
            if missing_in_shapefile:
                error_message += f"\n{len(missing_in_shapefile)} features from geojsonl missing in shapefile"
                if len(missing_in_shapefile) <= 10:
                    error_message += f": {', '.join(list(missing_in_shapefile))}"
                else:
                    error_message += f" (first 10): {', '.join(list(missing_in_shapefile)[:10])}"
        else:
            error_message = None
            result = {"geojsonl": geojsonl_count, "shapefile": shapefile_count}
        
        return is_valid, error_message, result
    else:
        # If no shapefile found, just report the geojsonl count
        logger.warning(f"No matching shapefile found for {geojsonl_path}. Can't validate feature count.")
        return None, "No matching shapefile found", {"geojsonl": geojsonl_count}

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Validate feature counts between shapefile and geojsonl")
    parser.add_argument("geojsonl_path", help="Path to the geojsonl file to validate")
    parser.add_argument("--shapefile", help="Optional path to the source shapefile for comparison")
    
    args = parser.parse_args()
    
    is_valid, error_message, counts = validate_feature_count(args.geojsonl_path, args.shapefile)
    
    if is_valid is True:
        print(f"Validation passed. Both files have {counts['geojsonl']} features.")
    elif is_valid is False:
        print(f"Validation failed: {error_message}")
        print(f"Counts: {counts}")
    else:
        print(f"Validation skipped: {error_message}")
        print(f"GEOJSONL Feature count: {counts['geojsonl']}")
