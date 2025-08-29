/*
  Warnings:

  - You are about to drop the `NeighborhoodEquiavlent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NeighborhoodEquiavlent";

-- CreateTable
CREATE TABLE "NeighborhoodLike" (
    "gid" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 4326) NOT NULL,
    "tree_equity_score" INTEGER NOT NULL,
    "priority_indicator" DOUBLE PRECISION NOT NULL,
    "tree_canopy" DOUBLE PRECISION NOT NULL,
    "tree_canopy_goal" DOUBLE PRECISION NOT NULL,
    "tree_canopy_gap" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "NeighborhoodLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "neighborhood_like_idx" ON "NeighborhoodLike" USING GIST ("geom");
