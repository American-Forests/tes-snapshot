/*
  Warnings:

  - You are about to drop the column `date` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `pubtype` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_perc` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `area_sqft` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `bare_soil` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `grass_shrubs` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `other_paved` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `roads_railroads` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `structures` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_perc` on the `Blockgroup` table. All the data in the column will be lost.
  - Added the required column `tree_canopy` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "City" ADD VALUE 'BOSTON';

-- AlterTable
ALTER TABLE "Area" DROP COLUMN "date",
DROP COLUMN "owner",
DROP COLUMN "pubtype",
DROP COLUMN "tree_canopy_perc";

-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "area_sqft",
DROP COLUMN "bare_soil",
DROP COLUMN "date",
DROP COLUMN "grass_shrubs",
DROP COLUMN "other_paved",
DROP COLUMN "roads_railroads",
DROP COLUMN "structures",
DROP COLUMN "tree_canopy_perc",
ADD COLUMN     "tree_canopy" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "evening_air_average_temperature" DROP NOT NULL;
