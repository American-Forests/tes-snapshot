-- CreateTable
CREATE TABLE "UrbanArea" (
    "gid" SERIAL NOT NULL,
    "geom" geometry(MultiPolygon, 4326) NOT NULL,

    CONSTRAINT "UrbanArea_pkey" PRIMARY KEY ("gid")
);

-- CreateIndex
CREATE INDEX "urban_areas_idx" ON "UrbanArea" USING GIST ("geom");
