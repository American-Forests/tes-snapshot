-- TESA Municipality
-- add city column
ALTER TABLE tesa_munip ADD COLUMN city "City";
UPDATE tesa_munip SET city = UPPER("location")::"City";
ALTER TABLE tesa_munip DROP COLUMN "location";

-- add center column
ALTER TABLE tesa_munip ADD COLUMN "center" geometry(Point, 4326);
UPDATE tesa_munip SET "center" = ST_Centroid(geom);

-- insert
INSERT INTO "Municipality" (
    "state",
    incorporated_place_name,
    incorporated_place_mean_tree_equity_score,
    geom,
    city,
    center,
    slug
) SELECT 
    UPPER("state"),
    incorporated_place_name,
    incorporated_place_mean_tree_equity_score,
    geom,
    city,
    center,
    slug
FROM tesa_munip ON CONFLICT (slug) DO UPDATE SET
    "state" = excluded."state",
    incorporated_place_name = excluded.incorporated_place_name,
    incorporated_place_mean_tree_equity_score = excluded.incorporated_place_mean_tree_equity_score,
    geom = excluded.geom,
    city = excluded.city,
    center = excluded.center,
    slug = excluded.slug;

DROP TABLE IF EXISTS tesa_munip;

-- TESA Blockgroup
-- add city column
ALTER TABLE tesa_blockgroup ADD COLUMN city "City";
UPDATE tesa_blockgroup SET city = UPPER("location")::"City";
ALTER TABLE tesa_blockgroup DROP COLUMN "location";

-- add rank columns
ALTER TABLE tesa_blockgroup ADD COLUMN rank INT;
ALTER TABLE tesa_blockgroup ADD COLUMN rank_group_size INT;

-- set rank to 0 now, will update when in the Blockgroup table since
-- not all columns needed to calculate rank may be in a city
UPDATE tesa_blockgroup SET rank = 0;
UPDATE tesa_blockgroup SET rank_group_size = 0;

INSERT INTO "Blockgroup" (
    id, 
    geom, 
    city, 
    equity_index, 
    tree_canopy_gap_max, 
    water, 
    tree_canopy, 
    impervious_surface,
    unsuitable_surface,
    area,
    poverty_percent,
    poverty_percent_normalized,
    incorporated_place_name,
    incorporated_place_mean_tree_equity_score,
    poc_percent,
    poc_percent_normalized,
    unemployment_rate,
    unemployment_rate_normalized,
    dependent_ratio,
    dependent_ratio_normalized,
    child_percent,
    senior_percent,
    tree_equity_score,
    congressional_district,
    health_normalized,
    total_population,
    tree_canopy_goal,
    tree_canopy_gap,
    temperature,
    temperature_normalized,
    holc_grade,
    potential_tree_canopy,
    "state",
    municipality_slug,
    ua_name,
    linguistic_isolation,
    linguistic_isolation_normalized,
    county,
    county_slug,
    rank,
    rank_group_size,
    potential_vegetation,
    potential_paved,
    air_pollution,
    parks_access,
    watershed,
    neighborhood,
    qualified_census_tract,
    light_rail,
    mean_radiant_temperature_15,
    mean_radiant_temperature_19,
    council_district,
    canopy_change_percent,
    ej_disadvantaged,
    asthma_percent,
    population_density,
    neighborhood_id,
    neighborhood_score,
    neighborhood_score_category,
    neighborhood_designation,
    ward,
    fips,
    tree_planting_investment_index,
    social_vulnerability_index,
    road_emissions,
    municipality_name,
    low_food_access,
    community_garden,
    affordable_housing,
    ttf_tree_equity_planting,
    ej_screen
) SELECT     
    id, 
    geom, 
    city, 
    equity_index, 
    tree_canopy_gap_max, 
    water, 
    tree_canopy, 
    impervious_surface,
    unsuitable_surface,
    area * 247.105,
    poverty_percent,
    poverty_percent_normalized,
    incorporated_place_name,
    incorporated_place_mean_tree_equity_score,
    poc_percent,
    poc_percent_normalized,
    unemployment_rate,
    unemployment_rate_normalized,
    dependent_ratio,
    dependent_ratio_normalized,
    child_percent,
    senior_percent,
    tree_equity_score,
    congressional_district,
    health_normalized,
    total_population,
    tree_canopy_goal,
    tree_canopy_gap,
    temperature,
    temperature_normalized,
    holc_grade,
    potential_tree_canopy,
    UPPER("state"),
    municipality_slug,
    ua_name,
    linguistic_isolation,
    linguistic_isolation_normalized,
    county,
    county_slug,
    rank,
    rank_group_size,
    potential_vegetation,
    potential_paved,
    air_pollution,
    parks_access,
    watershed,
    neighborhood,
    qualified_census_tract,
    light_rail,
    mean_radiant_temperature_15,
    mean_radiant_temperature_19,
    council_district,
    canopy_change_percent,
    ej_disadvantaged,
    asthma_percent,
    population_density,
    neighborhood_id,
    neighborhood_score,
    neighborhood_score_category,
    neighborhood_designation,
    ward,
    fips,
    tree_planting_investment_index,
    social_vulnerability_index,
    road_emissions,
    municipality_name,
    low_food_access,
    community_garden,
    affordable_housing,
    ttf_tree_equity_planting,
    ej_screen
FROM "tesa_blockgroup" ON CONFLICT (id) DO UPDATE SET
    id = excluded.id,
    geom = excluded.geom,
    city = excluded.city,
    equity_index = excluded.equity_index,
    tree_canopy_gap_max = excluded.tree_canopy_gap_max,
    water = excluded.water,
    tree_canopy = excluded.tree_canopy,
    impervious_surface = excluded.impervious_surface,
    unsuitable_surface = excluded.unsuitable_surface,
    area = excluded."area",
    poverty_percent = excluded.poverty_percent,
    poverty_percent_normalized = excluded.poverty_percent_normalized,
    incorporated_place_name = excluded.incorporated_place_name,
    incorporated_place_mean_tree_equity_score = excluded.incorporated_place_mean_tree_equity_score,
    poc_percent = excluded.poc_percent,
    poc_percent_normalized = excluded.poc_percent_normalized,
    unemployment_rate = excluded.unemployment_rate,
    unemployment_rate_normalized = excluded.unemployment_rate_normalized,
    dependent_ratio = excluded.dependent_ratio,
    dependent_ratio_normalized = excluded.dependent_ratio_normalized,
    child_percent = excluded.child_percent,
    senior_percent = excluded.senior_percent,
    tree_equity_score = excluded.tree_equity_score,
    congressional_district = excluded.congressional_district,
    health_normalized = excluded.health_normalized,
    total_population = excluded.total_population,
    tree_canopy_goal = excluded.tree_canopy_goal,
    tree_canopy_gap = excluded.tree_canopy_gap,
    temperature = excluded.temperature,
    temperature_normalized = excluded.temperature_normalized,
    holc_grade = excluded.holc_grade,
    potential_tree_canopy = excluded.potential_tree_canopy,
    "state" = excluded."state",
    municipality_slug = excluded.municipality_slug,
    ua_name = excluded.ua_name,
    linguistic_isolation = excluded.linguistic_isolation,
    linguistic_isolation_normalized = excluded.linguistic_isolation_normalized,
    county = excluded.county,
    county_slug = excluded.county_slug,
    rank = excluded.rank,
    rank_group_size = excluded.rank_group_size,
    potential_vegetation = excluded.potential_vegetation,
    potential_paved = excluded.potential_paved,
    air_pollution = excluded.air_pollution,
    parks_access = excluded.parks_access,
    watershed = excluded.watershed,
    neighborhood = excluded.neighborhood,
    qualified_census_tract = excluded.qualified_census_tract,
    light_rail = excluded.light_rail,
    mean_radiant_temperature_15 = excluded.mean_radiant_temperature_15,
    mean_radiant_temperature_19 = excluded.mean_radiant_temperature_19,
    council_district = excluded.council_district,
    canopy_change_percent = excluded.canopy_change_percent,
    ej_disadvantaged = excluded.ej_disadvantaged,
    asthma_percent = excluded.asthma_percent,
    population_density = excluded.population_density,
    neighborhood_id = excluded.neighborhood_id,
    neighborhood_score = excluded.neighborhood_score,
    neighborhood_score_category = excluded.neighborhood_score_category,
    neighborhood_designation = excluded.neighborhood_designation,
    ward = excluded.ward,
    fips = excluded.fips,
    tree_planting_investment_index = excluded.tree_planting_investment_index,
    social_vulnerability_index = excluded.social_vulnerability_index,
    road_emissions = excluded.road_emissions,
    municipality_name = excluded.municipality_name,
    low_food_access = excluded.low_food_access,
    community_garden = excluded.community_garden,
    affordable_housing = excluded.affordable_housing,
    ttf_tree_equity_planting = excluded.ttf_tree_equity_planting,
    ej_screen = excluded.ej_screen;
DROP TABLE IF EXISTS tesa_blockgroup;

-- TESA Parcels
-- rename parcel columns
ALTER TABLE tesa_parcel RENAME COLUMN geoid TO "blockgroupId";
ALTER TABLE tesa_parcel RENAME COLUMN tree_canop TO tree_canopy;
ALTER TABLE tesa_parcel RENAME COLUMN potential TO potential_tree_canopy;
ALTER TABLE tesa_parcel RENAME COLUMN vegetation TO potential_vegetation;
ALTER TABLE tesa_parcel RENAME COLUMN paved TO potential_paved;
ALTER TABLE tesa_parcel RENAME COLUMN unsuitable TO unsuitable_surface;
ALTER TABLE tesa_parcel RENAME COLUMN impervious TO impervious_surface;
ALTER TABLE tesa_parcel RENAME COLUMN land_area TO area;
ALTER TABLE tesa_parcel RENAME COLUMN coolcenter TO cooling_center;
ALTER TABLE tesa_parcel RENAME COLUMN qct TO qualified_census_tract;
ALTER TABLE tesa_parcel RENAME COLUMN busstop TO bus_stop;
ALTER TABLE tesa_parcel RENAME COLUMN mrt_1500 TO mean_radiant_temperature_15;
ALTER TABLE tesa_parcel RENAME COLUMN mrt_1900 TO mean_radiant_temperature_19;
ALTER TABLE tesa_parcel RENAME COLUMN neighborho TO neighborhood;
ALTER TABLE tesa_parcel RENAME COLUMN canopygain TO tree_canopy_gain;
ALTER TABLE tesa_parcel RENAME COLUMN canopyloss TO tree_canopy_loss;
ALTER TABLE tesa_parcel RENAME COLUMN subwatersh TO subwatershed;
ALTER TABLE tesa_parcel RENAME COLUMN curre_comm TO current_commercial_land_use;
ALTER TABLE tesa_parcel RENAME COLUMN futur_comm TO future_commercial_land_use;
ALTER TABLE tesa_parcel RENAME COLUMN sv_index TO social_vulnerability_index;
ALTER TABLE tesa_parcel RENAME COLUMN nhood_type TO neighborhood_type;
ALTER TABLE tesa_parcel RENAME COLUMN cnpy_chng TO canopy_change_percent;
ALTER TABLE tesa_parcel RENAME COLUMN future_lu TO future_land_use;
ALTER TABLE tesa_parcel RENAME COLUMN pub_type TO public_ownership_type;
ALTER TABLE tesa_parcel RENAME COLUMN af_housing TO affordable_housing;
ALTER TABLE tesa_parcel RENAME COLUMN comm_gardn TO community_garden;

-- add city column
ALTER TABLE tesa_parcel ADD COLUMN city "City";
UPDATE tesa_parcel SET city = UPPER("location")::"City";
ALTER TABLE tesa_parcel DROP COLUMN "location";

-- add type column
ALTER TABLE tesa_parcel ADD COLUMN "type" "AreaType";
UPDATE tesa_parcel SET "type" = 'PARCEL'::"AreaType";

INSERT INTO "Area" (
    af_id,
    geom,
    "blockgroupId",
    "address",
    water,
    tree_canopy,
    potential_tree_canopy,
    potential_vegetation,
    potential_paved,
    unsuitable_surface,
    impervious_surface,
    area,
    "type",
    city,
    land_use,
    cooling_center,
    qualified_census_tract,
    bus_stop,
    light_rail,
    mean_radiant_temperature_15,
    mean_radiant_temperature_19,
    school,
    park,
    social_vulnerability_index,
    neighborhood_type,
    canopy_change_percent,
    future_land_use,
    public_ownership_type,
    brownfield,
    library,
    affordable_housing,
    community_garden,
    ej_screen
) SELECT 
    af_id,
    geom,
    "blockgroupId",
    "address",
    water,
    tree_canopy,
    potential_tree_canopy,
    potential_vegetation,
    potential_paved,
    unsuitable_surface,
    impervious_surface,
    area * 247.105,
    "type", 
    city,
    land_use,
    cooling_center,
    qualified_census_tract,
    bus_stop,
    light_rail,
    mean_radiant_temperature_15,
    mean_radiant_temperature_19,
    school,
    park,
    social_vulnerability_index,
    neighborhood_type,
    canopy_change_percent,
    future_land_use,
    public_ownership_type,
    brownfield,
    library,
    affordable_housing,
    community_garden,
    ej_screen
FROM tesa_parcel ON CONFLICT (af_id) DO UPDATE SET
    af_id = excluded.af_id,
    geom = excluded.geom,
    "blockgroupId" = excluded."blockgroupId",
    "address" = excluded."address",
    water = excluded.water,
    tree_canopy = excluded.tree_canopy,
    potential_tree_canopy = excluded.potential_tree_canopy,
    potential_vegetation = excluded.potential_vegetation,
    potential_paved = excluded.potential_paved,
    unsuitable_surface = excluded.unsuitable_surface,
    impervious_surface = excluded.impervious_surface,
    area = excluded.area,
    "type" = excluded."type",
    city = excluded.city,
    land_use = excluded.land_use,
    cooling_center = excluded.cooling_center,
    qualified_census_tract = excluded.qualified_census_tract,
    bus_stop = excluded.bus_stop,
    light_rail = excluded.light_rail,
    mean_radiant_temperature_15 = excluded.mean_radiant_temperature_15,
    mean_radiant_temperature_19 = excluded.mean_radiant_temperature_19,
    school = excluded.school,
    park = excluded.park,
    social_vulnerability_index = excluded.social_vulnerability_index,
    neighborhood_type = excluded.neighborhood_type,
    canopy_change_percent = excluded.canopy_change_percent,
    future_land_use = excluded.future_land_use,
    public_ownership_type = excluded.public_ownership_type,
    brownfield = excluded.brownfield,
    library = excluded.library,
    affordable_housing = excluded.affordable_housing,
    community_garden = excluded.community_garden,
    ej_screen = excluded.ej_screen;
    
DROP TABLE IF EXISTS tesa_parcel;

-- TESA ROW

-- rename ROW columns
ALTER TABLE tesa_row RENAME COLUMN geoid TO "blockgroupId";
ALTER TABLE tesa_row RENAME COLUMN tree_canop TO tree_canopy;
ALTER TABLE tesa_row RENAME COLUMN potential TO potential_tree_canopy;
ALTER TABLE tesa_row RENAME COLUMN vegetation TO potential_vegetation;
ALTER TABLE tesa_row RENAME COLUMN paved TO potential_paved;
ALTER TABLE tesa_row RENAME COLUMN unsuitable TO unsuitable_surface;
ALTER TABLE tesa_row RENAME COLUMN impervious TO impervious_surface;
ALTER TABLE tesa_row RENAME COLUMN land_area TO area;
ALTER TABLE tesa_row RENAME COLUMN coolcenter TO cooling_center;
ALTER TABLE tesa_row RENAME COLUMN qct TO qualified_census_tract;
ALTER TABLE tesa_row RENAME COLUMN busstop TO bus_stop;
ALTER TABLE tesa_row RENAME COLUMN mrt_1500 TO mean_radiant_temperature_15;
ALTER TABLE tesa_row RENAME COLUMN mrt_1900 TO mean_radiant_temperature_19;
ALTER TABLE tesa_row RENAME COLUMN neighborho TO neighborhood;
ALTER TABLE tesa_row RENAME COLUMN canopygain TO tree_canopy_gain;
ALTER TABLE tesa_row RENAME COLUMN canopyloss TO tree_canopy_loss;
ALTER TABLE tesa_row RENAME COLUMN subwatersh TO subwatershed;
ALTER TABLE tesa_row RENAME COLUMN curre_comm TO current_commercial_land_use;
ALTER TABLE tesa_row RENAME COLUMN futu_comm TO future_commercial_land_use;
ALTER TABLE tesa_row RENAME COLUMN sv_index TO social_vulnerability_index;
ALTER TABLE tesa_row RENAME COLUMN nhood_type TO neighborhood_type;
ALTER TABLE tesa_row RENAME COLUMN cnpy_chng TO canopy_change_percent;
ALTER TABLE tesa_row RENAME COLUMN future_lu TO future_land_use;
ALTER TABLE tesa_row RENAME COLUMN pub_type TO public_ownership_type;
ALTER TABLE tesa_row RENAME COLUMN af_housing TO affordable_housing;
ALTER TABLE tesa_row RENAME COLUMN comm_gardn TO community_garden;

-- add city column
ALTER TABLE tesa_row ADD COLUMN city "City";
UPDATE tesa_row SET city = UPPER("location")::"City";
ALTER TABLE tesa_row DROP COLUMN "location";

-- add type column
ALTER TABLE tesa_row ADD COLUMN "type" "AreaType";
UPDATE tesa_row SET "type" = 'RIGHT_OF_WAY'::"AreaType";

INSERT INTO "Area" (
    af_id,
    geom,
    "blockgroupId",
    "address",
    water,
    tree_canopy,
    potential_tree_canopy,
    potential_vegetation,
    potential_paved,
    unsuitable_surface,
    impervious_surface,
    area,
    "type",
    city,
    land_use,
    cooling_center,
    qualified_census_tract,
    bus_stop,
    light_rail,
    mean_radiant_temperature_15,
    mean_radiant_temperature_19,
    school,
    park,
    social_vulnerability_index,
    neighborhood_type,
    canopy_change_percent,
    future_land_use,
    public_ownership_type,
    brownfield,
    library,
    affordable_housing,
    community_garden,
    ej_screen
) SELECT 
    af_id,
    geom,
    "blockgroupId",
    "address",
    water,
    tree_canopy,
    potential_tree_canopy,
    potential_vegetation,
    potential_paved,
    unsuitable_surface,
    impervious_surface,
    area * 247.105,
    "type", 
    city,
    land_use,
    cooling_center,
    qualified_census_tract,
    bus_stop,
    light_rail,
    mean_radiant_temperature_15,
    mean_radiant_temperature_19,
    school,
    park,
    social_vulnerability_index,
    neighborhood_type,
    canopy_change_percent,
    future_land_use,
    public_ownership_type,
    brownfield,
    library,
    affordable_housing, 
    community_garden,
    ej_screen
FROM tesa_row ON CONFLICT (af_id) DO UPDATE SET
    af_id = excluded.af_id,
    geom = excluded.geom,
    "blockgroupId" = excluded."blockgroupId",
    "address" = excluded."address",
    water = excluded.water,
    tree_canopy = excluded.tree_canopy,
    potential_tree_canopy = excluded.potential_tree_canopy,
    potential_vegetation = excluded.potential_vegetation,
    potential_paved = excluded.potential_paved,
    unsuitable_surface = excluded.unsuitable_surface,
    impervious_surface = excluded.impervious_surface,
    area = excluded.area,
    "type" = excluded."type",
    city = excluded.city,
    land_use = excluded.land_use,
    cooling_center = excluded.cooling_center,
    qualified_census_tract = excluded.qualified_census_tract,
    bus_stop = excluded.bus_stop,
    light_rail = excluded.light_rail,
    mean_radiant_temperature_15 = excluded.mean_radiant_temperature_15,
    mean_radiant_temperature_19 = excluded.mean_radiant_temperature_19,
    school = excluded.school,
    park = excluded.park,
    social_vulnerability_index = excluded.social_vulnerability_index,
    neighborhood_type = excluded.neighborhood_type,
    canopy_change_percent = excluded.canopy_change_percent,
    future_land_use = excluded.future_land_use,
    public_ownership_type = excluded.public_ownership_type,
    brownfield = excluded.brownfield,
    library = excluded.library,
    affordable_housing = excluded.affordable_housing,
    community_garden = excluded.community_garden,
    ej_screen = excluded.ej_screen;
DROP TABLE IF EXISTS tesa_row;
