/*
  Warnings:

  - Added the required column `air_pollution` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `air_pollution_normalized` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `children_proportion` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependent_proportion` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependent_ratio` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependent_ratio_normalized` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_normalized` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_rank` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `health_normalized` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `health_rank` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income_normalized` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income_rank` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poc_proportion` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `population` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seniors_proportion` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature_difference` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature_difference_normalized` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tree_canopy_gap_max` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NeighborhoodLike" ADD COLUMN     "air_pollution" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "air_pollution_normalized" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "children_proportion" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "dependent_proportion" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dependent_ratio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dependent_ratio_normalized" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "employment_normalized" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "employment_rank" INTEGER NOT NULL,
ADD COLUMN     "health_normalized" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "health_rank" INTEGER NOT NULL,
ADD COLUMN     "income_normalized" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "income_rank" INTEGER NOT NULL,
ADD COLUMN     "poc_proportion" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "population" INTEGER NOT NULL,
ADD COLUMN     "seniors_proportion" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "temperature_difference" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "temperature_difference_normalized" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tree_canopy_gap_max" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
