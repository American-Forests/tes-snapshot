-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "neighborhood" TEXT;

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "tree_canopy_acres" DOUBLE PRECISION;
