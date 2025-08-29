-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "municipality_slug" TEXT;

-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "slug" TEXT;
