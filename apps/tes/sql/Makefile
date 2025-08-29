national:
	shp2pgsql -d -m ./national_munip_col.map -D -W LATIN1 -s 3857:4326 ../local/national/municipalities_simplified.shp national_munip > ../local/national/conus.sql
	shp2pgsql -d -m ./national_blockgroup_col.map -D -W LATIN1 -s 3857:4326 ../local/national/national_blockgroups_simplified.shp national_blockgroup >> ../local/national/conus.sql
	shp2pgsql -d -m ./congressional_districts_col.map -D -W LATIN1 -s 3857:4326 ../local/national/congressional.shp national_congressional_district >> ../local/national/conus.sql
	shp2pgsql -d -m ./state_col.map -D -W LATIN1 -s 3857:4326 ../local/national/states.shp national_state >> ../local/national/conus.sql
	shp2pgsql -d -m ./county_col.map -D -W LATIN1 -s 3857:4326 ../local/national/counties.shp national_county >> ../local/national/conus.sql
	cat ../local/national/conus.sql ./ne_cleanup.sql > ./load.sql
	
local: 
	psql -d tes < ./load.sql > output.log 2>&1

production:
	heroku pg:psql -a tes-app < ./load.sql

staging:
	heroku pg:psql -a staging-tes-app < ./load.sql

tesa:
	rm -f ./load.sql
	rm -f ./tesa.sql
	cat tesa_setup.sql > ./tesa.sql
	shp2pgsql -d -m ./national_munip_col.map -D -W LATIN1 $(path_to_data)/munips.shp tesa_munip >> ./tesa.sql
	shp2pgsql -a -m ./tesa_blockgroup_col.map -D -W LATIN1 $(path_to_data)/blockgroups.shp tesa_blockgroup >> ./tesa.sql
	shp2pgsql -a -D -W LATIN1 $(path_to_data)/parcels.shp tesa_parcel >> ./tesa.sql
	shp2pgsql -a -D -W LATIN1 $(path_to_data)/row.shp tesa_row >> ./tesa.sql
	cat ./tesa.sql ./tesa_cleanup.sql > ./load.sql