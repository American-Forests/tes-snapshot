-- CreateEnum
CREATE TYPE "City" AS ENUM ('RICHMOND');

-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "city" "City" NOT NULL DEFAULT E'RICHMOND';

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "city" "City" NOT NULL DEFAULT E'RICHMOND';

-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "city" "City" NOT NULL DEFAULT E'RICHMOND';

-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "city" "City" NOT NULL DEFAULT E'RICHMOND';
