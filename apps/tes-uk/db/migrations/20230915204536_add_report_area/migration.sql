-- CreateTable
CREATE TABLE "ReportArea" (
    "gid" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "geom" geometry(Point, 4326) NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ReportArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "report_area_idx" ON "ReportArea" USING GIST ("geom");
