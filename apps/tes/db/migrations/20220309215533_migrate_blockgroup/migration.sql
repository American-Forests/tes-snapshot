/*
  Warnings:

  - You are about to drop the column `physical_normalized` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `plantable_area` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `total_area` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_gap_max` on the `Blockgroup` table. All the data in the column will be lost.
  - Added the required column `area` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impervious_surface` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potential_tree_canopy` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tree_canopy_perc` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `water` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Made the column `poverty_percent` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `poverty_percent_normalized` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `incorporated_place_name` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `incorporated_place_mean_tree_equity_score` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `poc_percent` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `poc_percent_normalized` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unemployment_rate` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unemployment_rate_normalized` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dependent_ratio` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dependent_ratio_normalized` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `child_percent` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senior_percent` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tree_equity_score` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tree_canopy` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `congressional_district` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mental_health` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `health_normalized` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_population` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tree_canopy_goal` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tree_canopy_gap` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `temperature` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `temperature_normalized` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `umaxchild` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uminchild` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `umaxsenior` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uminsenior` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `umaxpoc` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uminpoc` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `umaxpov` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uminpov` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `umaxunempl` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uminunempl` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `umaxtemp` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `umintemp` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "physical_normalized",
DROP COLUMN "plantable_area",
DROP COLUMN "total_area",
DROP COLUMN "tree_canopy_gap_max",
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "holc_grade" TEXT,
ADD COLUMN     "impervious_surface" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "potential_tree_canopy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tree_canopy_perc" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "water" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "poverty_percent" SET NOT NULL,
ALTER COLUMN "poverty_percent_normalized" SET NOT NULL,
ALTER COLUMN "incorporated_place_name" SET NOT NULL,
ALTER COLUMN "incorporated_place_name" SET DATA TYPE TEXT,
ALTER COLUMN "incorporated_place_mean_tree_equity_score" SET NOT NULL,
ALTER COLUMN "poc_percent" SET NOT NULL,
ALTER COLUMN "poc_percent_normalized" SET NOT NULL,
ALTER COLUMN "unemployment_rate" SET NOT NULL,
ALTER COLUMN "unemployment_rate_normalized" SET NOT NULL,
ALTER COLUMN "dependent_ratio" SET NOT NULL,
ALTER COLUMN "dependent_ratio_normalized" SET NOT NULL,
ALTER COLUMN "child_percent" SET NOT NULL,
ALTER COLUMN "senior_percent" SET NOT NULL,
ALTER COLUMN "tree_equity_score" SET NOT NULL,
ALTER COLUMN "tree_canopy" SET NOT NULL,
ALTER COLUMN "congressional_district" SET NOT NULL,
ALTER COLUMN "congressional_district" SET DATA TYPE TEXT,
ALTER COLUMN "mental_health" SET NOT NULL,
ALTER COLUMN "health_normalized" SET NOT NULL,
ALTER COLUMN "total_population" SET NOT NULL,
ALTER COLUMN "tree_canopy_goal" SET NOT NULL,
ALTER COLUMN "tree_canopy_gap" SET NOT NULL,
ALTER COLUMN "temperature" SET NOT NULL,
ALTER COLUMN "temperature_normalized" SET NOT NULL,
ALTER COLUMN "umaxchild" SET NOT NULL,
ALTER COLUMN "uminchild" SET NOT NULL,
ALTER COLUMN "umaxsenior" SET NOT NULL,
ALTER COLUMN "uminsenior" SET NOT NULL,
ALTER COLUMN "umaxpoc" SET NOT NULL,
ALTER COLUMN "uminpoc" SET NOT NULL,
ALTER COLUMN "umaxpov" SET NOT NULL,
ALTER COLUMN "uminpov" SET NOT NULL,
ALTER COLUMN "umaxunempl" SET NOT NULL,
ALTER COLUMN "uminunempl" SET NOT NULL,
ALTER COLUMN "umaxtemp" SET NOT NULL,
ALTER COLUMN "umintemp" SET NOT NULL;
