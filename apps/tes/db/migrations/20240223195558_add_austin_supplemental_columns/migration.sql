-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "affordable_housing" BOOLEAN,
ADD COLUMN     "community_garden" BOOLEAN;

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "affordable_housing" BOOLEAN,
ADD COLUMN     "community_garden" BOOLEAN,
ADD COLUMN     "low_food_access" BOOLEAN,
ADD COLUMN     "municipality_name" TEXT,
ADD COLUMN     "road_emissions" DOUBLE PRECISION,
ADD COLUMN     "social_vulnerability_index" DOUBLE PRECISION,
ADD COLUMN     "tree_planting_investment_index" DOUBLE PRECISION;
