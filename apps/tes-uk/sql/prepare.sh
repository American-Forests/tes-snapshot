#!/bin/bash

rm -f data.sql
rm -f load.sql
shp2pgsql -d -m ./neighborhood_like_col.map -s 3857:4326 -D -W LATIN1 ../local/national_bges_simplified.shp tmp_neighborhood_like > ./data.sql
shp2pgsql -d -m ./locality_like_col.map -s 3857:4326 -D -W LATIN1 ../local/local_authorities_simplified.shp tmp_locality_like >> ./data.sql
shp2pgsql -d -m ./constituency_col.map -s 3857:4326 -D -W LATIN1 ../local/constituencies.shp tmp_constituency >> ./data.sql
shp2pgsql -d -m ./country_col.map -s 3857:4326 -D -W LATIN1 ../local/countries.shp tmp_country >> ./data.sql
shp2pgsql -d -s 27700:4326 -D -W LATIN1 ../local/peat_uk_5km_diss_simp.shp tmp_peat >> ./data.sql
shp2pgsql -d -s 27700:4326 -D -W LATIN1 ../local/urban_areas_simplified.shp tmp_ua >> ./data.sql
cat ./data.sql ./cleanup.sql >> ./load.sql	