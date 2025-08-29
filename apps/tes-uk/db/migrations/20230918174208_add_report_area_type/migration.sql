/*
  Warnings:

  - Changed the type of `type` on the `ReportArea` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ReportAreaType" AS ENUM ('CONSTITUENCY', 'COUNTRY');

-- AlterTable
ALTER TABLE "ReportArea" DROP COLUMN "type",
ADD COLUMN     "type" "ReportAreaType" NOT NULL;
