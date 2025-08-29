import os
import csv
import psycopg2
from dotenv import load_dotenv
import pandas as pd

def save_query_to_csv(query, output_file, database_url):
    # Connect to the database
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()

    try:
        # Execute the query
        cursor.execute(query)

        # Fetch all rows
        rows = cursor.fetchall()

        # Get column names
        column_names = [desc[0] for desc in cursor.description]

        # Write data to CSV file
        with open(output_file, 'w', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            
            # Write header
            csvwriter.writerow(column_names)
            
            # Write data rows
            csvwriter.writerows(rows)

        print(f"Data has been downloaded to {output_file}")

    finally:
        # Close the database connection
        cursor.close()
        conn.close()

def download_users():
    # Load environment variables from .env file (if any)
    load_dotenv()

    # Check if DATABASE_URL environment variable is set
    old_database_url = os.getenv('OLD_DATABASE_URL')
    current_database_url = os.getenv('CURRENT_DATABASE_URL')

    users_query = """
        SELECT *
        FROM \"User\" u
        """
    save_query_to_csv(users_query, "./data/old/users.csv", old_database_url)
    save_query_to_csv(users_query, "./data/current/users.csv", current_database_url)

def download_current_scenarios():
    load_dotenv()
    current_database_url = os.getenv('CURRENT_DATABASE_URL')

    scenario_users_query = """
        SELECT s.*, u.email
        FROM \"Scenario\" s
        LEFT JOIN \"User\" u ON s.\"userId\" = u.id
    """
    save_query_to_csv(scenario_users_query, "./data/current/scenarios.csv", current_database_url)

    blockgroup_query = """
        SELECT bos.*, b.tree_equity_score
        FROM \"BlockgroupOnScenario\" bos
        LEFT JOIN \"Blockgroup\" b ON bos.\"blockgroupId\" = b.id
    """
    save_query_to_csv(blockgroup_query, "./data/current/blockgroupOnScenarios.csv", current_database_url)

    area_query = """
        SELECT s.*, a.\"blockgroupId\"
        FROM \"AreaOnScenario\" s
        LEFT JOIN \"Area\" a ON s.\"areaId\" = a.af_id

    """
    save_query_to_csv(area_query, "./data/current/areaOnScenarios.csv", current_database_url)

download_users()
download_current_scenarios()