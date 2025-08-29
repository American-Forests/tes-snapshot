-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "brownfield" BOOLEAN;

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "asthma_percent" DOUBLE PRECISION,
ADD COLUMN     "population_density" DOUBLE PRECISION;
