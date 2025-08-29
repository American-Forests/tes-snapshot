/*
  Warnings:

  - You are about to drop the column `impervious_surface` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `potential_paved` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `potential_tree_canopy` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `potential_vegetation` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `unsuitable_surface` on the `Blockgroup` table. All the data in the column will be lost.
  - You are about to drop the column `water` on the `Blockgroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "impervious_surface",
DROP COLUMN "potential_paved",
DROP COLUMN "potential_tree_canopy",
DROP COLUMN "potential_vegetation",
DROP COLUMN "unsuitable_surface",
DROP COLUMN "water";

-- AlterTable
ALTER TABLE "BlockgroupSupplemental" ADD COLUMN     "impervious_surface" DOUBLE PRECISION,
ADD COLUMN     "potential_paved" DOUBLE PRECISION,
ADD COLUMN     "potential_tree_canopy" DOUBLE PRECISION,
ADD COLUMN     "potential_vegetation" DOUBLE PRECISION,
ADD COLUMN     "unsuitable_surface" DOUBLE PRECISION;
