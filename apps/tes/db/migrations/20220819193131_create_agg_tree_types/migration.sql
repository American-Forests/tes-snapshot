-- AlterTable
ALTER TABLE "AreaOnScenario" ADD COLUMN     "treesLarge" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesMedium" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treesSmall" INTEGER NOT NULL DEFAULT 0;

--UpdateTable
UPDATE "AreaOnScenario" SET "treesLarge" = "treesDeciduousLarge" + "treesBroadleafLarge" + "treesConiferousLarge";
UPDATE "AreaOnScenario" SET "treesMedium" = "treesDeciduousMedium" + "treesBroadleafMedium" + "treesConiferousMedium";
UPDATE "AreaOnScenario" SET "treesSmall" = "treesDeciduousSmall" + "treesBroadleafSmall" + "treesConiferousSmall";

