-- AlterTable
ALTER TABLE "RightOfWayOnPlan" ADD COLUMN     "treesBroadleafLarge" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesBroadleafMedium" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesBroadleafSmall" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesConiferousLarge" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesConiferousMedium" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesConiferousSmall" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesDeciduousLarge" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesDeciduousMedium" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "treesDeciduousSmall" SET DEFAULT 0;
