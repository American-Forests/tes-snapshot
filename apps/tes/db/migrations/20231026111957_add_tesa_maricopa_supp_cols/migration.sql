-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "bus_stop" BOOLEAN,
ADD COLUMN     "cooling_center" TEXT,
ADD COLUMN     "light_rail" BOOLEAN,
ADD COLUMN     "mean_radiant_temperature_15" DOUBLE PRECISION,
ADD COLUMN     "mean_radiant_temperature_19" DOUBLE PRECISION,
ADD COLUMN     "qualified_census_tract" BOOLEAN;

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "light_rail" BOOLEAN,
ADD COLUMN     "mean_radiant_temperature_15" DOUBLE PRECISION,
ADD COLUMN     "mean_radiant_temperature_19" DOUBLE PRECISION,
ADD COLUMN     "qualified_census_tract" BOOLEAN;
