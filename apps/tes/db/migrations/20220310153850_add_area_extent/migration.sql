-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "extent" JSONB NOT NULL DEFAULT '[-180, -90, 180, 90]';
