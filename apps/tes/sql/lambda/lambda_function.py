import boto3
import sqlalchemy
import geopandas as gpd 
import os 

def handler(event, context):
    s3 = boto3.client('s3')

    # Extract bucket name and file key from the Lambda event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    file_url = f's3://{bucket}/{key}'

    # Check if the uploaded file is 'trees.shp'
    if not key.endswith('trees.shp'):
        print(f"The file {key} is not a 'trees.shp', no action taken.")
        return 

    try:
        database_url = os.environ['DATABASE_URL']
        print(f'Trying to connect to the database.')
        engine = sqlalchemy.create_engine(database_url)
        print('Successfully connected to the database.')

    except Exception as e:
        print(e)
        print("Error connecting to the database.")
        raise e

    try:
        print(f'Trying to read {file_url}.')
        trees = gpd.read_file(file_url)
        print(f'Successfully read {file_url}.')

    except Exception as e:
        print(e)
        print(f'Error reading {file_url}.')
        raise e

    try:
        table_name = 'tmp_trees'
        print(f'Trying to write {file_url} to table {table_name} in the database.')
        trees.to_postgis(table_name, engine, if_exists='replace')
        print(f'Successfully wrote {file_url} to table {table_name} in the database.')

    except Exception as e:
        print(e)
        print(f'Error writing {file_url} to {table_name} in the database.')
        raise e
    
    # allow trees to be garbage collected
    del trees

    def read_file(file_path):
        with open(file_path, 'r') as file:
            return file.read().replace("\n", " ")
    try:
        sql_file = './trees_cleanup.sql'
        print(f'Trying to read SQL cleanup commands from {sql_file}.')
        sql_commands = read_file(sql_file).split(';')
        print(f'Successfully read SQL cleanup commands.')

    except Exception as e:
        print(e)
        print(f'Error reading SQL cleanup commands from {sql_file}.')
        raise e

    try:
        print(f'Trying to run SQL cleanup commands.')
        with engine.connect() as connection:
            for command in sql_commands:
                if command.strip():
                    connection.execute(sqlalchemy.text(command))
            connection.commit()
        print(f'Successfully ran SQL cleanup commands.')

    except Exception as e:
        print(e)
        print(f'Error running SQL cleanup commands.')
        raise e