-- AlterEnum
ALTER TYPE "City" ADD VALUE 'DALLAS';

-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "neighborhood_type" TEXT,
ADD COLUMN     "social_vulnerability_index" DOUBLE PRECISION;
