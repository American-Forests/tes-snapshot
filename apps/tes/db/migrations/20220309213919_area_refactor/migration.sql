/*
  Warnings:

  - You are about to drop the column `plantableArea` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `totalArea` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `treeCanopy` on the `Area` table. All the data in the column will be lost.
  - Added the required column `area` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impervious_surface` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail_address` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potential_tree_canopy` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tree_canopy` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `water` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "plantableArea",
DROP COLUMN "totalArea",
DROP COLUMN "treeCanopy",
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "impervious_surface" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mail_address" TEXT NOT NULL,
ADD COLUMN     "potential_tree_canopy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tree_canopy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "water" DOUBLE PRECISION NOT NULL;
