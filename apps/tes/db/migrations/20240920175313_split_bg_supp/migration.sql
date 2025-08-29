/*
  Warnings:

  - You are about to drop the column `affordable_housing` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `afternoon_air_average_temperature` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `air_pollution` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `asthma_percent` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `canopy_change_percent` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `community_garden` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `council_district` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `ej_screen` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `evening_air_average_temperature` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `health_risk` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `hez` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `light_rail` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `low_food_access` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `mean_radiant_temperature_15` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `mean_radiant_temperature_19` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `municipality_name` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `name_ej_criteria` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood_designation` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood_id` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood_score` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood_score_category` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `number_ej_criteria` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `parks_access` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `population_density` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `qualified_census_tract` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `road_emissions` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `social_vulnerability_index` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `subwatershed` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_gain` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_loss` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `tree_planting_investment_index` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `ttf_tree_equity_planting` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `ward` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `watershed` on the `Blockgroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "affordable_housing",
DROP COLUMN "afternoon_air_average_temperature",
DROP COLUMN "air_pollution",
DROP COLUMN "asthma_percent",
DROP COLUMN "canopy_change_percent",
DROP COLUMN "community_garden",
DROP COLUMN "council_district",
DROP COLUMN "ej_screen",
DROP COLUMN "evening_air_average_temperature",
DROP COLUMN "health_risk",
DROP COLUMN "hez",
DROP COLUMN "light_rail",
DROP COLUMN "low_food_access",
DROP COLUMN "mean_radiant_temperature_15",
DROP COLUMN "mean_radiant_temperature_19",
DROP COLUMN "municipality_name",
DROP COLUMN "name_ej_criteria",
DROP COLUMN "neighborhood",
DROP COLUMN "neighborhood_designation",
DROP COLUMN "neighborhood_id",
DROP COLUMN "neighborhood_score",
DROP COLUMN "neighborhood_score_category",
DROP COLUMN "number_ej_criteria",
DROP COLUMN "parks_access",
DROP COLUMN "population_density",
DROP COLUMN "qualified_census_tract",
DROP COLUMN "road_emissions",
DROP COLUMN "social_vulnerability_index",
DROP COLUMN "subwatershed",
DROP COLUMN "tree_canopy_gain",
DROP COLUMN "tree_canopy_loss",
DROP COLUMN "tree_planting_investment_index",
DROP COLUMN "ttf_tree_equity_planting",
DROP COLUMN "ward",
DROP COLUMN "watershed";

-- CreateTable
CREATE TABLE "BlockgroupSupplemental" (
    "id" TEXT NOT NULL,
    "afternoon_air_average_temperature" DOUBLE PRECISION,
    "evening_air_average_temperature" DOUBLE PRECISION,
    "neighborhood" TEXT,
    "name_ej_criteria" TEXT,
    "number_ej_criteria" INTEGER,
    "subwatershed" TEXT,
    "tree_canopy_gain" DOUBLE PRECISION,
    "tree_canopy_loss" DOUBLE PRECISION,
    "health_risk" TEXT,
    "hez" BOOLEAN,
    "watershed" TEXT,
    "parks_access" DOUBLE PRECISION,
    "air_pollution" TEXT,
    "qualified_census_tract" BOOLEAN,
    "light_rail" BOOLEAN,
    "mean_radiant_temperature_15" DOUBLE PRECISION,
    "mean_radiant_temperature_19" DOUBLE PRECISION,
    "council_district" TEXT,
    "asthma_percent" DOUBLE PRECISION,
    "population_density" DOUBLE PRECISION,
    "canopy_change_percent" DOUBLE PRECISION,
    "neighborhood_id" TEXT,
    "neighborhood_score" INTEGER,
    "neighborhood_score_category" TEXT,
    "neighborhood_designation" TEXT,
    "ward" TEXT,
    "tree_planting_investment_index" DOUBLE PRECISION,
    "social_vulnerability_index" DOUBLE PRECISION,
    "road_emissions" DOUBLE PRECISION,
    "municipality_name" TEXT,
    "low_food_access" BOOLEAN,
    "community_garden" BOOLEAN,
    "affordable_housing" BOOLEAN,
    "ttf_tree_equity_planting" TEXT,
    "ej_screen" DOUBLE PRECISION,

    CONSTRAINT "BlockgroupSupplemental_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlockgroupSupplemental" ADD CONSTRAINT "BlockgroupSupplemental_id_fkey" FOREIGN KEY ("id") REFERENCES "Blockgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
