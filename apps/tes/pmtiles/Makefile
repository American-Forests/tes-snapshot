national_municipality:
	zip -j national_municipality.zip ../local/national/municipalities_simplified.geojson ./configs/national.municipality.config.json ./configs/base.municipality.json
	aws s3 cp national_municipality.zip s3://tes-pmtiles-source

national_blockgroup:
	zip -j national_blockgroup.zip ../local/national/national_blockgroups_simplified.geojson ./configs/national.blockgroup.config.json ./configs/base.blockgroup.json
	aws s3 cp national_blockgroup.zip s3://tes-pmtiles-source

national_pmtiles:
	make national_municipality
	make national_blockgroup

tesa_pmtiles:
	@if [ -z "$$TESA_SLUG" ]; then \
		echo "Error: TESA_SLUG environment variable is not set"; \
		exit 1; \
	fi

tesa_bg: 
	zip -j boston_blockgroup.zip ../local/location/boston/blockgroups.geojson ../local/location/boston/boston.blockgroups.config.json
	aws s3 cp boston_blockgroup.zip s3://tes-pmtiles-source

tesa_areas:
	zip -j boston_area.zip ../local/location/boston/areas.geojson ../local/location/boston/boston.areas.config.json
	aws s3 cp boston_area.zip s3://tes-pmtiles-source