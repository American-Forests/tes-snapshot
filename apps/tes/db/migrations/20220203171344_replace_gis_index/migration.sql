-- DropIndex
DROP INDEX "right_of_way_idx";
CREATE INDEX right_of_way_idx ON "Area" USING GIST (geom);
