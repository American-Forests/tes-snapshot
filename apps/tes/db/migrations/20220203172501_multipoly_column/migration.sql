-- This is an empty migration.
SELECT DropGeometryColumn ('public','Area','geom');
SELECT AddGeometryColumn ('public','Area','geom', 4326, 'MultiPolygon', 2);
