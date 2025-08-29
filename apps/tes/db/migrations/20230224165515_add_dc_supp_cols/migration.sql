-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "subwatershed" TEXT,
ADD COLUMN     "tree_canopy_gain" DOUBLE PRECISION,
ADD COLUMN     "tree_canopy_loss" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "subwatershed" TEXT,
ADD COLUMN     "tree_canopy_gain" DOUBLE PRECISION,
ADD COLUMN     "tree_canopy_loss" DOUBLE PRECISION;
