/*
  Warnings:

  - You are about to drop the column `overty_percent` on the `Area` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "overty_percent",
ADD COLUMN     "poverty_percent" DOUBLE PRECISION;
