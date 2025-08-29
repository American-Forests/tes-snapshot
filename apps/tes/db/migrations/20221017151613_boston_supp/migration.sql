-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "open_space" BOOLEAN;

-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "name_ej_criteria" TEXT,
ADD COLUMN     "number_ej_criteria" INTEGER;
