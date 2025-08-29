-- create postgis extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "NeighborhoodEquiavlent" (
    "gid" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 4326) NOT NULL,
    "tree_equity_score" INTEGER NOT NULL,
    "priority_indicator" DOUBLE PRECISION NOT NULL,
    "tree_canopy" DOUBLE PRECISION NOT NULL,
    "tree_canopy_goal" DOUBLE PRECISION NOT NULL,
    "tree_canopy_gap" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "NeighborhoodEquiavlent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "neighborhood_equivalent_idx" ON "NeighborhoodEquiavlent" USING GIST ("geom");
