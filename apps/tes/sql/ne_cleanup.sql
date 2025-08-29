-- National Explorer Municipality
ALTER TABLE national_munip ADD COLUMN city "City";
UPDATE national_munip SET city = 'NATIONAL'::"City";
ALTER TABLE national_munip ADD COLUMN "center" geometry(Point, 4326);
UPDATE national_munip SET "center" = ST_Centroid(geom);
DELETE FROM "Municipality" WHERE city = 'NATIONAL';
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
FROM national_munip ON CONFLICT DO NOTHING;
DROP TABLE IF EXISTS national_munip;

-- National Explorer Blockgroup
ALTER TABLE national_blockgroup ADD COLUMN city "City" DEFAULT 'NATIONAL'::"City";
ALTER TABLE national_blockgroup ADD water float DEFAULT 0;
ALTER TABLE national_blockgroup ADD impervious_surface float DEFAULT 0;
ALTER TABLE national_blockgroup ADD unsuitable_surface float DEFAULT 0;
ALTER TABLE national_blockgroup ADD potential_tree_canopy float DEFAULT 0;

-- Add a new column 'rank' to the table
ALTER TABLE national_blockgroup ADD COLUMN rank INT;
ALTER TABLE national_blockgroup ADD COLUMN rank_group_size INT;

-- Update the 'rank' column based on 'tree_equity_score' within each 'municipality_slug' group
UPDATE national_blockgroup AS t1
SET rank = subquery.rank
FROM (
    SELECT
        id, -- Assuming there is a primary key column named 'id' in your table
        RANK() OVER (PARTITION BY municipality_slug ORDER BY tree_equity_score DESC) AS rank
    FROM
        national_blockgroup
) AS subquery
WHERE t1.id = subquery.id;

-- save the number of blockgroups included in the rank group
UPDATE national_blockgroup AS t1
SET rank_group_size = subquery.rank_group_size
FROM (
    SELECT
        municipality_slug,
        COUNT(*) AS rank_group_size
    FROM
        national_blockgroup
    GROUP BY
        municipality_slug
) AS subquery
WHERE t1.municipality_slug = subquery.municipality_slug;

-- make state uppercase in national_blockgroup
UPDATE national_blockgroup SET "state" = UPPER("state");

-- multiply area by 247.105 to convert from square kilometers to acres
UPDATE national_blockgroup SET area = area * 247.105;

MERGE INTO "Blockgroup" dst
USING "national_blockgroup" src
ON dst.id = src.id 
WHEN NOT MATCHED THEN
    INSERT (
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
        ej_disadvantaged
    ) VALUES (
        src.id, 
        src.geom,
        src.city,
        src.equity_index,
        src.tree_canopy_gap_max,
        src.water,
        src.tree_canopy,
        src.impervious_surface,
        src.unsuitable_surface,
        src.area,
        src.poverty_percent,
        src.poverty_percent_normalized,
        src.incorporated_place_name,
        src.incorporated_place_mean_tree_equity_score,
        src.poc_percent,
        src.poc_percent_normalized,
        src.unemployment_rate,
        src.unemployment_rate_normalized,
        src.dependent_ratio,
        src.dependent_ratio_normalized,
        src.child_percent,
        src.senior_percent,
        src.tree_equity_score,
        src.congressional_district,
        src.health_normalized,
        src.total_population,
        src.tree_canopy_goal,
        src.tree_canopy_gap,
        src.temperature,
        src.temperature_normalized,
        src.holc_grade,
        src.potential_tree_canopy,
        src."state",
        src.municipality_slug,
        src.ua_name,
        src.linguistic_isolation,
        src.linguistic_isolation_normalized,
        src.county,
        src.county_slug,
        src.rank,
        src.rank_group_size,
        src.ej_disadvantaged
    )
WHEN MATCHED AND dst.city = 'NATIONAL' THEN
UPDATE SET
    geom = src.geom,
    city = src.city,
    equity_index = src.equity_index,
    tree_canopy_gap_max = src.tree_canopy_gap_max,
    water = src.water,
    tree_canopy = src.tree_canopy,
    impervious_surface = src.impervious_surface,
    unsuitable_surface = src.unsuitable_surface,
    area = src.area,
    poverty_percent = src.poverty_percent,
    poverty_percent_normalized = src.poverty_percent_normalized,
    incorporated_place_name = src.incorporated_place_name,
    incorporated_place_mean_tree_equity_score = src.incorporated_place_mean_tree_equity_score,
    poc_percent = src.poc_percent,
    poc_percent_normalized = src.poc_percent_normalized,
    unemployment_rate = src.unemployment_rate,
    unemployment_rate_normalized = src.unemployment_rate_normalized,
    dependent_ratio = src.dependent_ratio,
    dependent_ratio_normalized = src.dependent_ratio_normalized,
    child_percent = src.child_percent,
    senior_percent = src.senior_percent,
    tree_equity_score = src.tree_equity_score,
    congressional_district = src.congressional_district,
    health_normalized = src.health_normalized,
    total_population = src.total_population,
    tree_canopy_goal = src.tree_canopy_goal,
    tree_canopy_gap = src.tree_canopy_gap,
    temperature = src.temperature,
    temperature_normalized = src.temperature_normalized,
    holc_grade = src.holc_grade,
    potential_tree_canopy = src.potential_tree_canopy,
    "state" = src."state",
    municipality_slug = src.municipality_slug,
    ua_name = src.ua_name,
    linguistic_isolation = src.linguistic_isolation,
    linguistic_isolation_normalized = src.linguistic_isolation_normalized,
    county = src.county,
    county_slug = src.county_slug,
    rank = src.rank,
    rank_group_size = src.rank_group_size,
    ej_disadvantaged = src.ej_disadvantaged;
DROP TABLE IF EXISTS "national_blockgroup";

-- National Explorer Congressional Districts
TRUNCATE TABLE "CongressionalDistrict";
INSERT INTO "CongressionalDistrict" (
    geom,
    "name"
) SELECT 
    geom,
    "name"
FROM national_congressional_district;
DROP TABLE IF EXISTS national_congressional_district;

-- create states names table
ALTER TABLE national_state
ADD COLUMN "name" VARCHAR(50);

CREATE TABLE state_names (
  state_abbr VARCHAR(2) PRIMARY KEY,
  full_name VARCHAR(50)
);

INSERT INTO state_names (state_abbr, full_name)
VALUES
  ('AL', 'Alabama'),
  ('AK', 'Alaska'),
  ('AZ', 'Arizona'),
  ('AR', 'Arkansas'),
  ('CA', 'California'),
  ('CO', 'Colorado'),
  ('CT', 'Connecticut'),
  ('DE', 'Delaware'),
  ('FL', 'Florida'),
  ('GA', 'Georgia'),
  ('HI', 'Hawaii'),
  ('ID', 'Idaho'),
  ('IL', 'Illinois'),
  ('IN', 'Indiana'),
  ('IA', 'Iowa'),
  ('KS', 'Kansas'),
  ('KY', 'Kentucky'),
  ('LA', 'Louisiana'),
  ('ME', 'Maine'),
  ('MD', 'Maryland'),
  ('MA', 'Massachusetts'),
  ('MI', 'Michigan'),
  ('MN', 'Minnesota'),
  ('MS', 'Mississippi'),
  ('MO', 'Missouri'),
  ('MT', 'Montana'),
  ('NE', 'Nebraska'),
  ('NV', 'Nevada'),
  ('NH', 'New Hampshire'),
  ('NJ', 'New Jersey'),
  ('NM', 'New Mexico'),
  ('NY', 'New York'),
  ('NC', 'North Carolina'),
  ('ND', 'North Dakota'),
  ('OH', 'Ohio'),
  ('OK', 'Oklahoma'),
  ('OR', 'Oregon'),
  ('PA', 'Pennsylvania'),
  ('RI', 'Rhode Island'),
  ('SC', 'South Carolina'),
  ('SD', 'South Dakota'),
  ('TN', 'Tennessee'),
  ('TX', 'Texas'),
  ('UT', 'Utah'),
  ('VT', 'Vermont'),
  ('VA', 'Virginia'),
  ('WA', 'Washington'),
  ('WV', 'West Virginia'),
  ('WI', 'Wisconsin'),
  ('WY', 'Wyoming'),
  ('DC', 'District of Columbia');

UPDATE national_state
SET "name" = state_names.full_name
FROM state_names
WHERE national_state.abbreviation = state_names.state_abbr;

-- National Explorer States
TRUNCATE TABLE "State";
INSERT INTO "State" (
    geom,
    abbreviation,
    "name"
) SELECT 
    geom,
    abbreviation,
    "name"
FROM national_state;
DROP TABLE IF EXISTS national_state;

DROP TABLE IF EXISTS state_names;

-- National Explorer County
TRUNCATE TABLE "County";
INSERT INTO "County" (
    geom, 
    "name",
    slug,
    "state"
) SELECT 
    geom, 
    "name",
    slug,
    "state"
FROM national_county;
DROP TABLE IF EXISTS national_county;

