import geopandas as gpd
from sqlalchemy import create_engine, inspect, Table, MetaData, text
from shapely import wkb
import os
import io
from shapely.geometry import MultiPolygon
import numpy as np
import psycopg2
import sys
import fiona
from itertools import islice

BASE_BLOCKGROUP_COLUMNS = [
    'id', 'geometry', 'af_id', 'municipality_slug', 'state', 'fips',
    'equity_index', 'tree_canopy_gap_max', 'tree_canopy', 'area_sqkm',
    'poverty_percent', 'poverty_percent_normalized', 'incorporated_place_name',
    'incorporated_place_mean_tree_equity_score', 'poc_percent', 'poc_percent_normalized',
    'unemployment_rate', 'unemployment_rate_normalized', 'dependent_ratio',
    'dependent_ratio_normalized', 'child_percent', 'senior_percent',
    'tree_equity_score', 'congressional_district', 'mental_health',
    'health_normalized', 'clipped_bg_population', 'total_population',
    'tree_canopy_goal', 'tree_canopy_gap', 'temperature', 'temperature_normalized',
    'linguistic_isolation', 'linguistic_isolation_normalized', 'ua_name',
    'county', 'county_slug', 'rank', 'rank_group_size', 'holc_grade',
    'ej_disadvantaged', 'building_shade12', 'total_shade12', 'building_shade18', 'building_shade15', 'trees_shade12', 'total_shade15', 'trees_shade15', 'trees_shade18', 'total_shade18'
]

SUPPLEMENTAL_BLOCKGROUP_COLUMNS = [
    'id', 'potential_tree_canopy', 'potential_vegetation', 'potential_paved', 
    'impervious_surface', 'unsuitable_surface', 'afternoon_air_average_temperature', 
    'evening_air_average_temperature', 'neighborhood', 'name_ej_criteria', 
    'number_ej_criteria', 'subwatershed', 'tree_canopy_gain', 'tree_canopy_loss', 
    'health_risk', 'hez', 'watershed', 'parks_access', 'air_pollution', 
    'qualified_census_tract', 'light_rail', 'mean_radiant_temperature_15', 
    'mean_radiant_temperature_19', 'council_district', 'asthma_percent', 
    'population_density', 'canopy_change_percent', 
    'neighborhood_id', 'neighborhood_score', 'neighborhood_score_category',
    'neighborhood_designation', 'ward', 'tree_planting_investment_index',
    'social_vulnerability_index', 'road_emissions', 'municipality_name',
    'low_food_access', 'community_garden', 'affordable_housing',
    'ttf_tree_equity_planting', 'ej_screen', 'location', 'school_district'
]

def read_geojsonl_in_chunks(filepath, chunksize):
    # The yield keyword makes this function a generator function
    # Instead of returning all data at once, it returns one chunk at a time
    # This helps with memory efficiency when dealing with large files
    try:
        # Try regular GeoJSON first
        print(f"Attempting to read as GeoJSONSeq: {filepath}")
        with fiona.open(filepath, 'r', driver='GeoJSONSeq') as source:
            source_iter = iter(source)
            while True:
                features = list(islice(source_iter, chunksize))
                if not features:
                    break
                gdf = gpd.GeoDataFrame.from_features(features, crs=source.crs)
                yield gdf
    except Exception as e:
        print(f"GeoJSONSeq read failed: {str(e)}")
        print(f"Attempting to read as GeoJSON...")
        with fiona.open(filepath, 'r', driver='GeoJSON') as source:
            source_iter = iter(source)
            while True:
                features = list(islice(source_iter, chunksize))
                if not features:
                    break
                gdf = gpd.GeoDataFrame.from_features(features, crs=source.crs)
                yield gdf

            
def process_gdf(gdf, geojson_path, table, table_name, columns_to_extract=None, include_geometry=True, convert_geometry_to_multipolygon=True):
    
    if columns_to_extract:
        existing_columns = [col for col in columns_to_extract if col in gdf.columns]
        gdf = gdf[existing_columns]

    if include_geometry:
        gdf = convert_geometry(gdf, convert_geometry_to_multipolygon=convert_geometry_to_multipolygon)

    # Replace NaN values with None (which will be converted to NULL in PostgreSQL)
    gdf = gdf.replace({np.nan: None})

    if table_name == 'Area':
        if 'parcels' in os.path.basename(geojson_path):
            gdf['type'] = 'PARCEL'
        elif 'rows' in os.path.basename(geojson_path):
            gdf['type'] = 'RIGHT_OF_WAY'

    if table_name == 'BlockgroupSupplemental' or table_name == 'Area':
        if 'location' in gdf.columns:
            gdf['city'] = gdf['location'].str.upper()

    # Check for extra columns in the data that are not in the table
    table_columns = set(c.name for c in table.columns)
    data_columns = set(gdf.columns)
    extra_columns = data_columns - table_columns
    
    if extra_columns:
        print(f"Dropping extra columns: {extra_columns}")
        gdf = gdf.drop(columns=extra_columns)

    return gdf
    
def convert_geometry(gdf, convert_geometry_to_multipolygon=True):
    print("Converting geometry to WKB format... Renaming to 'geom'...")

    if convert_geometry_to_multipolygon:
        def to_multipolygon(geom):
            if geom.geom_type == 'MultiPolygon':
                return geom
            return MultiPolygon([geom])
        
        gdf['geometry'] = gdf['geometry'].apply(to_multipolygon)
    
    gdf['geom'] = gdf['geometry'].apply(lambda geom: wkb.dumps(geom, hex=True, srid=4326))
    gdf = gdf.drop(columns=['geometry'])
    print("Geometry conversion completed.")
    return gdf

def get_table(engine, table_name, truncate_table=False):
    if not inspect(engine).has_table(table_name):
        raise ValueError(f"Table '{table_name}' does not exist in the database. Please create the table before loading data.")
    
    metadata = MetaData()
    table = Table(table_name, metadata, autoload_with=engine)

    if truncate_table:
        with engine.connect() as conn:
            conn.execute(text(f'TRUNCATE TABLE "{table.name}" CASCADE'))
            conn.commit()

    # Create a temporary table name
    temp_table_name = f"temp_{table_name}"
    
    # Create temporary table with the same structure as the main table
    with engine.connect() as conn:
        conn.execute(text(f'DROP TABLE IF EXISTS "{temp_table_name}"'))
        conn.execute(text(f'CREATE TEMP TABLE "{temp_table_name}" (LIKE "{table.name}" INCLUDING ALL)'))
        conn.commit()

    return table

def load_gdf_to_temp_table(gdf, cursor, temp_table_name):
    output = io.StringIO()
    gdf.to_csv(
        output,
        sep="\t",
        header=False,
        index=False,
        na_rep="\\N",
        encoding="utf-8",
    )
    output.seek(0)

    # Modify the COPY command to ensure correct syntax and encoding
    columns_string = ", ".join(f'"{col}"' for col in gdf.columns)
    copy_command = f"COPY \"{temp_table_name}\" ({columns_string}) FROM STDIN WITH (FORMAT csv, DELIMITER E'\\t', NULL '\\N', ENCODING 'UTF8')"
    cursor.copy_expert(copy_command, output)

def merge_tables(cursor, table_name, temp_table_name, id_column, truncate_table=False, columns_to_update=None):
    # Merge data from temporary table to main table
    if truncate_table:
        merge_query = f"""
            INSERT INTO "{table_name}"
            SELECT * FROM "{temp_table_name}";
        """
        cursor.execute(merge_query)
    elif columns_to_update:
        merge_query = f"""
            INSERT INTO "{table_name}"
            SELECT * FROM "{temp_table_name}"
            ON CONFLICT ({id_column}) DO UPDATE
            SET {', '.join(columns_to_update)};
        """
        cursor.execute(merge_query)
    cursor.execute(f'DROP TABLE "{temp_table_name}"')

def cleanup_temp_table(cursor, temp_table_name):
    print(f"Trying to drop {temp_table_name} table...")
    try:
        cursor.execute(f'DROP TABLE IF EXISTS "{temp_table_name}"')
    except Exception as e:
        print(f"Warning: Failed to clean up temporary table {temp_table_name}: {str(e)}")

def load_geojson_to_postgres(geojson_path, table_name, engine, columns_to_extract=None, include_geometry=True, convert_geometry_to_multipolygon=True, truncate_table=False):
    print(f"Starting to load {geojson_path} into {table_name} table...")
    table = get_table(engine, table_name, truncate_table=truncate_table)
    temp_table_name = f"temp_{table_name}"

    conn = engine.raw_connection()
    try:
        print(f"Reading GeoJSON file: {geojson_path}")
        conn.set_client_encoding("UTF8")
        chunksize = 300000
        columns_to_update = None
        id_column = 'slug' if table_name == 'Municipality' else 'id'

        with conn.cursor() as cur:
            chunk_number = 0
            for gdf in read_geojsonl_in_chunks(geojson_path, chunksize):
                print(f"Processing chunk {chunk_number} with {len(gdf)} features.")
                gdf = process_gdf(gdf, geojson_path, table, table_name, columns_to_extract=columns_to_extract, include_geometry=include_geometry, convert_geometry_to_multipolygon=convert_geometry_to_multipolygon)
                if chunk_number == 0:
                    columns_to_update = [f'"{col}" = EXCLUDED."{col}"' for col in gdf.columns if col != id_column]
                load_gdf_to_temp_table(gdf, cur, temp_table_name)
                chunk_number += 1
            print(f"All chunks loaded into Table {temp_table_name}")
            merge_tables(cur, table_name, temp_table_name, id_column, truncate_table=truncate_table, columns_to_update=columns_to_update)
            conn.commit()

    except Exception as e:
        conn.rollback()
        print(f"Error: {str(e)}")
        print(f"File path: {geojson_path}. Table: {table_name}")
        raise
    finally:
        with conn.cursor() as cur:
            cleanup_temp_table(cur, temp_table_name)
        conn.close()

def load_tesa(data_root_path, db_connection_string):
    print("Loading TESA data...")

    # Create a database connection
    print("Creating database connection...")
    engine = create_engine(db_connection_string)
    print("Database connection established.")

    blockgroups_geojson_path = os.path.join(data_root_path, 'blockgroups.geojsonl')
    parcels_geojson_path = os.path.join(data_root_path, 'parcels.geojsonl')
    rows_geojson_path = os.path.join(data_root_path, 'rows.geojsonl')
    
    print(f"Number of columns to extract: {len(SUPPLEMENTAL_BLOCKGROUP_COLUMNS)}")

    def try_load_file(file_path, table_name, columns=None, include_geometry=True):
        try:
            # First attempt: Try loading the full file
            load_geojson_to_postgres(file_path, table_name, engine, 
                                   columns_to_extract=columns, 
                                   include_geometry=include_geometry)
            return True
        except Exception as e:
            print(f"Failed to load full file {file_path}: {str(e)}")
            print("Checking for chunked files...")
            
            # Check for chunked files (e.g., parcels_1_of_5.geojsonl)
            base_name = os.path.splitext(os.path.basename(file_path))[0]  # e.g., 'parcels'
            base_dir = os.path.dirname(file_path)
            chunk_loaded = False
            print(base_name)
            
            # List all files in directory
            for filename in os.listdir(base_dir):
                # Look for files matching pattern: base_name_X_of_Y.geojsonl
                if filename.startswith(f"{base_name}_"):
                    chunk_path = os.path.join(base_dir, filename)
                    try:
                        print(f"Loading chunk file: {chunk_path}")
                        load_geojson_to_postgres(chunk_path, table_name, engine,
                                               columns_to_extract=columns,
                                               include_geometry=include_geometry)
                        chunk_loaded = True
                    except Exception as chunk_e:
                        print(f"Failed to load chunk {chunk_path}: {str(chunk_e)}")
                        return False
            
            return chunk_loaded

    try:
        # Load blockgroups
        print("Loading blockgroups data...")
        if not try_load_file(blockgroups_geojson_path, 'BlockgroupSupplemental', 
                           columns=SUPPLEMENTAL_BLOCKGROUP_COLUMNS, include_geometry=False):
            raise Exception("Failed to load blockgroups data")
        print("Blockgroups data loaded successfully.")

        # Load parcels
        print("Loading parcels data...")
        if not try_load_file(parcels_geojson_path, 'Area', include_geometry=True):
            raise Exception("Failed to load parcels data")
        print("Parcels data loaded successfully.")

        # Load rows
        print("Loading right-of-ways data...")
        if not try_load_file(rows_geojson_path, 'Area', include_geometry=True):
            raise Exception("Failed to load right-of-ways data")
        print("Right-of-ways data loaded successfully.")

        print("TESA data loaded successfully.")
    finally:
        engine.dispose()

def load_national_explorer(data_root_path, db_connection_string):
    print("Loading National Explorer data...")

    # Create a database connection
    print("Creating database connection...")
    engine = create_engine(db_connection_string)
    print("Database connection established.")

    municipality_geojson_path = os.path.join(data_root_path, 'municipalities.geojsonl')
    blockgroup_geojson_path = os.path.join(data_root_path, 'blockgroups.geojsonl')
    district_geojson_path = os.path.join(data_root_path, 'districts.geojsonl')
    county_geojson_path = os.path.join(data_root_path, 'counties.geojsonl')
    state_geojson_path = os.path.join(data_root_path, 'states.geojsonl')

    try:
        load_geojson_to_postgres(municipality_geojson_path, 'Municipality', engine, include_geometry=True)
        load_geojson_to_postgres(blockgroup_geojson_path, 'Blockgroup', engine, include_geometry=True)
        load_geojson_to_postgres(district_geojson_path, 'CongressionalDistrict', engine, include_geometry=True, convert_geometry_to_multipolygon=False, truncate_table=True)
        load_geojson_to_postgres(county_geojson_path, 'County', engine, include_geometry=True, convert_geometry_to_multipolygon=False, truncate_table=True)
        load_geojson_to_postgres(state_geojson_path, 'State', engine, include_geometry=True, convert_geometry_to_multipolygon=False, truncate_table=True)
        print("National Explorer data loaded successfully.")
    finally:
        engine.dispose()

def load_toronto_tesa(data_root_path, db_connection_string):
    print("Loading Toronto TESA...")
    print(f"Full data root path: {os.path.abspath(data_root_path)}")

    # Create a database connection
    print("Creating database connection...")
    engine = create_engine(db_connection_string)
    print("Database connection established.")

    municipality_geojson_path = os.path.join(data_root_path, 'municipalities.geojsonl')
    blockgroup_geojson_path = os.path.join(data_root_path, 'blockgroups.geojsonl')
    parcel_geojson_path = os.path.join(data_root_path, 'parcels.geojsonl')
    row_geojson_path = os.path.join(data_root_path, 'rows.geojsonl')

    try:
        load_geojson_to_postgres(municipality_geojson_path, 'Municipality', engine, include_geometry=True)
        load_geojson_to_postgres(blockgroup_geojson_path, 'Blockgroup', engine, columns_to_extract=BASE_BLOCKGROUP_COLUMNS, include_geometry=True)
        load_geojson_to_postgres(blockgroup_geojson_path, 'BlockgroupSupplemental', engine, columns_to_extract=SUPPLEMENTAL_BLOCKGROUP_COLUMNS, include_geometry=False)
        load_geojson_to_postgres(parcel_geojson_path, 'Area', engine, include_geometry=True)
        load_geojson_to_postgres(row_geojson_path, 'Area', engine, include_geometry=True)

        print(f"TESA Toronto loaded successfully.")

    finally:
        engine.dispose()

def load_tesa_file(file_path, db_connection_string, file_name, table_name):
    print(f"Loading TESA file {file_name} into {table_name}...")
    
    engine = create_engine(db_connection_string)
    
    try:
        if file_name == 'blockgroups.geojsonl':
            load_geojson_to_postgres(file_path, table_name, engine, 
                                   columns_to_extract=SUPPLEMENTAL_BLOCKGROUP_COLUMNS, 
                                   include_geometry=False)
        else:
            load_geojson_to_postgres(file_path, table_name, engine, 
                                   include_geometry=True)
        
        print(f"TESA file {file_name} loaded successfully.")
    finally:
        engine.dispose()

if __name__ == "__main__":
    print("Starting GeoJSON to PostgreSQL loading script...")
    # Usage: python to_postgres.py <flag> <data_root_path>
    # This script loads GeoJSON data into PostgreSQL tables.
    # The flag should be either "national" or "tesa".
    # The data_root_path should contain the necessary GeoJSON files.
    # The DATABASE_URL environment variable must be set with the database connection string.

    # Get database connection string from environment variable
    db_connection_string = os.environ.get('DATABASE_URL')
    
    if not db_connection_string:
        print("Error: DATABASE_URL environment variable is not set")
        raise ValueError("DATABASE_URL environment variable is not set")

    if len(sys.argv) != 3:
        print("Error: Incorrect number of arguments")
        print("Usage: python to_postgres.py <flag> <data_root_path>")
        sys.exit(1)

    flag = sys.argv[1]
    data_root_path = sys.argv[2]

    print(f"Flag: {flag}")
    print(f"Data root path: {data_root_path}")

    try:
        if flag == "national":
            load_national_explorer(data_root_path, db_connection_string)
        elif flag == "tesa":
            if "toronto" in data_root_path.lower():
                print("Loading Toronto TESA data...")
                load_toronto_tesa(data_root_path, db_connection_string)
            else:
                load_tesa(data_root_path, db_connection_string)
        else:
            print("Error: Invalid flag. Use 'national' or 'tesa'.")
            sys.exit(1)    
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

    print("Script execution completed.")
    