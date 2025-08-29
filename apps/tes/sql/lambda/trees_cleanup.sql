DELETE FROM "TreeCanopy"
WHERE city = (SELECT UPPER("location")::"City" FROM tmp_trees LIMIT 1);

ALTER TABLE tmp_trees ADD COLUMN city "City";
UPDATE tmp_trees SET city = UPPER("location")::"City";
ALTER TABLE tmp_trees DROP COLUMN "location";
ALTER TABLE tmp_trees RENAME COLUMN "geometry" TO geom;

INSERT INTO "TreeCanopy" (
    city,
    geom
) SELECT 
    city,
    ST_Multi(geom)
FROM tmp_trees;

DROP TABLE IF EXISTS tmp_trees;