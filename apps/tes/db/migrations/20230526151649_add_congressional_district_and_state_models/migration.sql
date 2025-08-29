-- CreateTable
CREATE TABLE "CongressionalDistrict" (
    "gid" SERIAL NOT NULL,
    "center" geometry(Point, 4326) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CongressionalDistrict_pkey" PRIMARY KEY ("gid")
);

-- CreateTable
CREATE TABLE "State" (
    "gid" SERIAL NOT NULL,
    "center" geometry(Point, 4326) NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("gid")
);

-- CreateIndex
CREATE INDEX "congressional_district_idx" ON "CongressionalDistrict" USING GIST ("center");

-- CreateIndex
CREATE INDEX "state_idx" ON "State" USING GIST ("center");
