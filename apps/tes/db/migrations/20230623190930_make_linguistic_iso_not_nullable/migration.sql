/*
  Warnings:

  - Made the column `linguistic_isolation` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linguistic_isolation_normalized` on table `Blockgroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blockgroup" ALTER COLUMN "linguistic_isolation" SET NOT NULL,
ALTER COLUMN "linguistic_isolation_normalized" SET NOT NULL;
