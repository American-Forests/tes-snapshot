/*
  Warnings:

  - Added the required column `emergent_wetlands` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `structures` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "emergent_wetlands" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "industrial" BOOLEAN,
ADD COLUMN     "rented" BOOLEAN,
ADD COLUMN     "structures" DOUBLE PRECISION NOT NULL;
