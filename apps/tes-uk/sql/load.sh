#!/bin/bash

psql -d $PGDATABASE < ./load.sql
node load_itree.js | psql -d $PGDATABASE