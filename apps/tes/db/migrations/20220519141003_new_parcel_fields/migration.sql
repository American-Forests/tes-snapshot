/*
  Warnings:

  - You are about to drop the column `mail_address` on the `Area` table. All the data in the column will be lost.
  - Added the required column `area_sqft` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bare_soil` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flood` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grass_shrubs` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impervious_surface_sqft` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `low_vegetation` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_paved` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `park` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potential_tree_canopy_sqft` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roads_railroads` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tree_canopy_sqft` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `water_sqft` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "mail_address",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "area_sqft" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bare_soil" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "flood" TEXT NOT NULL,
ADD COLUMN     "grass_shrubs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "impervious_surface_sqft" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "low_vegetation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "other_paved" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "park" BOOLEAN NOT NULL,
ADD COLUMN     "potential_tree_canopy_sqft" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL,
ADD COLUMN     "roads_railroads" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "school" BOOLEAN NOT NULL,
ADD COLUMN     "tree_canopy_sqft" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "water_sqft" DOUBLE PRECISION NOT NULL;
