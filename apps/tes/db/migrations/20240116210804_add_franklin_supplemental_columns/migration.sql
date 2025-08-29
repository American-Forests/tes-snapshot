-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "canopy_change_percent" DOUBLE PRECISION,
ADD COLUMN     "future_land_use" TEXT,
ADD COLUMN     "public_ownership_type" TEXT;

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "canopy_change_percent" DOUBLE PRECISION,
ADD COLUMN     "ej_disadvantaged" BOOLEAN;
