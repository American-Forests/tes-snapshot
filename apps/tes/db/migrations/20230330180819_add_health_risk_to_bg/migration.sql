/*
  Warnings:

  - You are about to drop the column `health_risk` on the `Area` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "health_risk";

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "health_risk" TEXT;
