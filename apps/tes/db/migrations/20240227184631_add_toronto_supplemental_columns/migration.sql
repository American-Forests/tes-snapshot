-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "library" BOOLEAN;

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "neighborhood_designation" TEXT,
ADD COLUMN     "neighborhood_id" TEXT,
ADD COLUMN     "neighborhood_score" INTEGER,
ADD COLUMN     "ward" TEXT;
