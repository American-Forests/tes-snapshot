TRUNCATE TABLE "NeighborhoodLike" CASCADE;
INSERT INTO "NeighborhoodLike" (
    id,
    "type",
    "population",
    area,
    tree_canopy_goal,
    tree_canopy,
    tree_canopy_gap,
    priority_indicator,
    income_rank,
    income_normalized,
    income_rank_decile,
    employment_rank,
    employment_normalized,
    employment_rank_decile,
    health_rank,
    health_normalized,
    health_rank_decile,
    temperature_difference,
    temperature_difference_normalized,
    air_pollution,
    no2_average,
    no2_normalized,
    pm25_average,
    pm25_normalized,
    dependent_ratio,
    dependent_ratio_normalized,
    dependent_proportion,
    tree_equity_score,
    tree_canopy_gap_max,
    children_proportion,
    seniors_proportion,
    minority_ethnic_group_proportion,
    region,
    peat,
    urban_area_proportion,
    rank,
    rank_group_size,
    locality_id,
    constituency_id,
    country_id,
    geom
) SELECT 
        id,
    "type",
    "population",
    area,
    tree_canopy_goal,
    tree_canopy,
    tree_canopy_gap,
    priority_indicator,
    income_rank,
    income_normalized,
    income_rank_decile,
    employment_rank,
    employment_normalized,
    employment_rank_decile,
    health_rank,
    health_normalized,
    health_rank_decile,
    temperature_difference,
    temperature_difference_normalized,
    air_pollution,
    no2_average,
    no2_normalized,
    pm25_average,
    pm25_normalized,
    dependent_ratio,
    dependent_ratio_normalized,
    dependent_proportion,
    tree_equity_score,
    tree_canopy_gap_max,
    children_proportion,
    seniors_proportion,
    minority_ethnic_group_proportion,
    region,
    peat,
    urban_area_proportion,
    rank,
    rank_group_size,
    locality_id,
    constituency_id,
    country_id,
    geom
FROM tmp_neighborhood_like;
DROP TABLE IF EXISTS tmp_neighborhood_like;

TRUNCATE TABLE "LocalityLike" CASCADE;
INSERT INTO "LocalityLike" (
    id,
    "name",
    country,
    tree_equity_score,
    geom
) SELECT 
    id,
    "name",
    country,
    tree_equity_score,
    geom
FROM tmp_locality_like;
DROP TABLE IF EXISTS tmp_locality_like;

DELETE FROM "ReportArea" WHERE "type" = 'CONSTITUENCY'::"ReportAreaType";
INSERT INTO "ReportArea" (
    id,
    "name",
    "type",
    geom
) SELECT 
    id,
    "name",
    'CONSTITUENCY'::"ReportAreaType",
    geom
FROM tmp_constituency;
DROP TABLE IF EXISTS tmp_constituency;


DELETE FROM "ReportArea" WHERE "type" = 'COUNTRY'::"ReportAreaType";
INSERT INTO "ReportArea" (
    id,
    "name",
    "type",
    geom   
) SELECT 
    id,
    "name",
    'COUNTRY'::"ReportAreaType",
    geom
FROM tmp_country;
DROP TABLE IF EXISTS tmp_country;

TRUNCATE TABLE "Peat" CASCADE;
INSERT INTO "Peat" (
    gid,
    geom
) SELECT 
    gid,
    geom
FROM tmp_peat;
DROP TABLE IF EXISTS tmp_peat;

TRUNCATE TABLE "UrbanArea" CASCADE;
INSERT INTO "UrbanArea" (
    gid,
    geom
) SELECT 
    gid,
    geom
FROM tmp_ua;
DROP TABLE IF EXISTS tmp_ua;