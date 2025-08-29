/*
  Warnings:

  - You are about to drop the column `area_sqft` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `impervious_surface_sqft` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `potential_paved_sqft` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `potential_tree_canopy_sqft` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `potential_vegetation_sqft` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_sqft` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `unsuitable_surface_sqft` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `water_sqft` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `impervious_surface_acres` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `potential_paved_acres` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `potential_tree_canopy_acres` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `potential_vegetation_acres` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_acres` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `unsuitable_surface_acres` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `water_acres` on the `Blockgroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "area_sqft",
DROP COLUMN "impervious_surface_sqft",
DROP COLUMN "potential_paved_sqft",
DROP COLUMN "potential_tree_canopy_sqft",
DROP COLUMN "potential_vegetation_sqft",
DROP COLUMN "tree_canopy_sqft",
DROP COLUMN "unsuitable_surface_sqft",
DROP COLUMN "water_sqft";

-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "impervious_surface_acres",
DROP COLUMN "potential_paved_acres",
DROP COLUMN "potential_tree_canopy_acres",
DROP COLUMN "potential_vegetation_acres",
DROP COLUMN "tree_canopy_acres",
DROP COLUMN "unsuitable_surface_acres",
DROP COLUMN "water_acres";
