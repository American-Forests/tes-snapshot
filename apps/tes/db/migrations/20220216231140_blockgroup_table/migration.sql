/*
  Warnings:

  - The values [BLOCKGROUP] on the enum `AreaType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `child_percent` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `congressional_district` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `dependent_ratio` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `dependent_ratio_normalized` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `extent` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `health_normalized` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `incorporated_place_mean_tree_equity_score` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `incorporated_place_name` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `mental_health` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `physical_normalized` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `poc_percent` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `poc_percent_normalized` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `poverty_percent` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `poverty_percent_normalized` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `senior_percent` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `temperature_normalized` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `total_population` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_gap` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_gap_max` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_goal` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `tree_equity_score` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `umaxchild` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `umaxpoc` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `umaxpov` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `umaxsenior` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `umaxtemp` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `umaxunempl` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `uminchild` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `uminpoc` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `uminpov` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `uminsenior` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `umintemp` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `uminunempl` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `unemployment_rate` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `unemployment_rate_normalized` on the `Area` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AreaType_new" AS ENUM ('RIGHT_OF_WAY', 'PARCEL');
ALTER TABLE "Area" ALTER COLUMN "type" TYPE "AreaType_new" USING ("type"::text::"AreaType_new");
ALTER TYPE "AreaType" RENAME TO "AreaType_old";
ALTER TYPE "AreaType_new" RENAME TO "AreaType";
DROP TYPE "AreaType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Area" DROP COLUMN "child_percent",
DROP COLUMN "congressional_district",
DROP COLUMN "dependent_ratio",
DROP COLUMN "dependent_ratio_normalized",
DROP COLUMN "extent",
DROP COLUMN "health_normalized",
DROP COLUMN "incorporated_place_mean_tree_equity_score",
DROP COLUMN "incorporated_place_name",
DROP COLUMN "mental_health",
DROP COLUMN "physical_normalized",
DROP COLUMN "poc_percent",
DROP COLUMN "poc_percent_normalized",
DROP COLUMN "poverty_percent",
DROP COLUMN "poverty_percent_normalized",
DROP COLUMN "senior_percent",
DROP COLUMN "temperature",
DROP COLUMN "temperature_normalized",
DROP COLUMN "total_population",
DROP COLUMN "tree_canopy",
DROP COLUMN "tree_canopy_gap",
DROP COLUMN "tree_canopy_gap_max",
DROP COLUMN "tree_canopy_goal",
DROP COLUMN "tree_equity_score",
DROP COLUMN "umaxchild",
DROP COLUMN "umaxpoc",
DROP COLUMN "umaxpov",
DROP COLUMN "umaxsenior",
DROP COLUMN "umaxtemp",
DROP COLUMN "umaxunempl",
DROP COLUMN "uminchild",
DROP COLUMN "uminpoc",
DROP COLUMN "uminpov",
DROP COLUMN "uminsenior",
DROP COLUMN "umintemp",
DROP COLUMN "uminunempl",
DROP COLUMN "unemployment_rate",
DROP COLUMN "unemployment_rate_normalized";

-- CreateTable
CREATE TABLE "BlockgroupOnScenario" (
    "scenarioId" INTEGER NOT NULL,
    "blockgroupId" TEXT NOT NULL,
    "targetArea" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BlockgroupOnScenario_pkey" PRIMARY KEY ("scenarioId","blockgroupId")
);

-- CreateTable
CREATE TABLE "Blockgroup" (
    "id" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 4326) NOT NULL,
    "extent" JSONB NOT NULL DEFAULT '[-180, -90, 180, 90]',
    "poverty_percent" DOUBLE PRECISION,
    "poverty_percent_normalized" DOUBLE PRECISION,
    "incorporated_place_name" DOUBLE PRECISION,
    "incorporated_place_mean_tree_equity_score" DOUBLE PRECISION,
    "poc_percent" DOUBLE PRECISION,
    "poc_percent_normalized" DOUBLE PRECISION,
    "unemployment_rate" DOUBLE PRECISION,
    "unemployment_rate_normalized" DOUBLE PRECISION,
    "dependent_ratio" DOUBLE PRECISION,
    "dependent_ratio_normalized" DOUBLE PRECISION,
    "child_percent" DOUBLE PRECISION,
    "senior_percent" DOUBLE PRECISION,
    "tree_equity_score" DOUBLE PRECISION,
    "tree_canopy" DOUBLE PRECISION,
    "congressional_district" DOUBLE PRECISION,
    "mental_health" DOUBLE PRECISION,
    "physical_normalized" DOUBLE PRECISION,
    "health_normalized" DOUBLE PRECISION,
    "total_population" DOUBLE PRECISION,
    "tree_canopy_goal" DOUBLE PRECISION,
    "tree_canopy_gap" DOUBLE PRECISION,
    "tree_canopy_gap_max" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "temperature_normalized" DOUBLE PRECISION,
    "umaxchild" DOUBLE PRECISION,
    "uminchild" DOUBLE PRECISION,
    "umaxsenior" DOUBLE PRECISION,
    "uminsenior" DOUBLE PRECISION,
    "umaxpoc" DOUBLE PRECISION,
    "uminpoc" DOUBLE PRECISION,
    "umaxpov" DOUBLE PRECISION,
    "uminpov" DOUBLE PRECISION,
    "umaxunempl" DOUBLE PRECISION,
    "uminunempl" DOUBLE PRECISION,
    "umaxtemp" DOUBLE PRECISION,
    "umintemp" DOUBLE PRECISION,

    CONSTRAINT "Blockgroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blockgroup_idx" ON "Blockgroup"("geom");

-- AddForeignKey
ALTER TABLE "BlockgroupOnScenario" ADD CONSTRAINT "BlockgroupOnScenario_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockgroupOnScenario" ADD CONSTRAINT "BlockgroupOnScenario_blockgroupId_fkey" FOREIGN KEY ("blockgroupId") REFERENCES "Blockgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
