/*
  Warnings:

  - You are about to drop the column `treesBroadleafLarge` on the `AreaOnScenario` table. All the data in the column will be lost.
  - You are about to drop the column `treesBroadleafMedium` on the `AreaOnScenario` table. All the data in the column will be lost.
  - You are about to drop the column `treesBroadleafSmall` on the `AreaOnScenario` table. All the data in the column will be lost.
  - You are about to drop the column `treesConiferousLarge` on the `AreaOnScenario` table. All the data in the column will be lost.
  - You are about to drop the column `treesConiferousMedium` on the `AreaOnScenario` table. All the data in the column will be lost.
  - You are about to drop the column `treesConiferousSmall` on the `AreaOnScenario` table. All the data in the column will be lost.
  - You are about to drop the column `treesDeciduousLarge` on the `AreaOnScenario` table. All the data in the column will be lost.
  - You are about to drop the column `treesDeciduousMedium` on the `AreaOnScenario` table. All the data in the column will be lost.
  - You are about to drop the column `treesDeciduousSmall` on the `AreaOnScenario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AreaOnScenario" DROP COLUMN "treesBroadleafLarge",
DROP COLUMN "treesBroadleafMedium",
DROP COLUMN "treesBroadleafSmall",
DROP COLUMN "treesConiferousLarge",
DROP COLUMN "treesConiferousMedium",
DROP COLUMN "treesConiferousSmall",
DROP COLUMN "treesDeciduousLarge",
DROP COLUMN "treesDeciduousMedium",
DROP COLUMN "treesDeciduousSmall";
