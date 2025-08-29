-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "extent" JSONB NOT NULL DEFAULT E'[-180, -90, 180, 90]';
