/*
  Warnings:

  - You are about to drop the column `tree_canopy` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `umaxchild` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `umaxpoc` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `umaxpov` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `umaxsenior` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `umaxtemp` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `umaxunempl` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `uminchild` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `uminpoc` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `uminpov` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `uminsenior` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `umintemp` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `uminunempl` on the `Blockgroup` table. All the data in the column will be lost.
  - Added the required column `afternoon_air_average_temperature` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evening_air_average_temperature` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impervious_surface_acres` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potential_tree_canopy_acres` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tree_canopy_perc_acres` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `water_acres` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "tree_canopy",
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
ADD COLUMN     "afternoon_air_average_temperature" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "evening_air_average_temperature" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "impervious_surface_acres" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "potential_tree_canopy_acres" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tree_canopy_perc_acres" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "water_acres" DOUBLE PRECISION NOT NULL;
