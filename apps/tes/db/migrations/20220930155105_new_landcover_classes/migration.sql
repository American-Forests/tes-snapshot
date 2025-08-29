/*
  Warnings:

  - You are about to drop the column `bare_soil` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `emergent_wetlands` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `grass_shrubs` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `low_vegetation` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `other_paved` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `roads_railroads` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `structures` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `tree_canopy_perc_acres` on the `Blockgroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "bare_soil",
DROP COLUMN "emergent_wetlands",
DROP COLUMN "grass_shrubs",
DROP COLUMN "low_vegetation",
DROP COLUMN "other_paved",
DROP COLUMN "roads_railroads",
DROP COLUMN "structures",
ADD COLUMN     "potential_paved" DOUBLE PRECISION,
ADD COLUMN     "potential_vegetation" DOUBLE PRECISION,
ADD COLUMN     "unsuitable_surface" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "tree_canopy_perc_acres",
ADD COLUMN     "potential_paved" DOUBLE PRECISION,
ADD COLUMN     "potential_paved_acres" DOUBLE PRECISION,
ADD COLUMN     "potential_vegetation" DOUBLE PRECISION,
ADD COLUMN     "potential_vegetation_acres" DOUBLE PRECISION,
ADD COLUMN     "unsuitable_surface" DOUBLE PRECISION,
ADD COLUMN     "unsuitable_surface_acres" DOUBLE PRECISION;
