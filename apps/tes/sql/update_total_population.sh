#!/bin/bash

# Check if the database name is passed as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <database_name>"
  exit 1
fi

DATABASE_NAME=$1

# Connect to the database and create the temporary table
psql -d $DATABASE_NAME -c "CREATE TABLE temp_acs_pop (GEOID VARCHAR(255), acs_pop DOUBLE PRECISION);"

# Copy data from CSV file into the temporary table
psql -d $DATABASE_NAME -c "\copy temp_acs_pop (GEOID, acs_pop) FROM './national_acs_pop.csv' WITH (FORMAT csv, HEADER true);"

# Update the Blockgroup table with the new population data
psql -d $DATABASE_NAME -c "UPDATE \"Blockgroup\" bg SET total_population = tap.acs_pop FROM temp_acs_pop tap WHERE bg.id = tap.GEOID;"

# Drop the temporary table
psql -d $DATABASE_NAME -c "DROP TABLE temp_acs_pop;"
