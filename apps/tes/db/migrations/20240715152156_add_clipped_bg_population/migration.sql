-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "clipped_bg_population" DOUBLE PRECISION;

-- COPY over current data in total population
UPDATE "Blockgroup" SET "clipped_bg_population" = "total_population";
