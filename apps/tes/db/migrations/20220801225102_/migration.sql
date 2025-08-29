-- AlterTable
ALTER TABLE "Blockgroup" ALTER COLUMN "afternoon_air_average_temperature" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE "municipality_gid_seq";
ALTER TABLE "Municipality" ALTER COLUMN "gid" SET DEFAULT nextval('municipality_gid_seq');
ALTER SEQUENCE "municipality_gid_seq" OWNED BY "Municipality"."gid";
