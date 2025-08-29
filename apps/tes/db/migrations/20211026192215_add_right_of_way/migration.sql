CREATE EXTENSION postgis;

-- CreateTable
CREATE TABLE "RightOfWayOnPlan" (
    "planId" INTEGER NOT NULL,
    "rightOfWayId" INTEGER NOT NULL,

    CONSTRAINT "RightOfWayOnPlan_pkey" PRIMARY KEY ("planId","rightOfWayId")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RightOfWay" (
    "id" INTEGER NOT NULL,
    "treeCanopy" DOUBLE PRECISION NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "plantableArea" DOUBLE PRECISION NOT NULL,
    "geom" geometry(Polygon, 4326) NOT NULL,

    CONSTRAINT "RightOfWay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "right_of_way_idx" ON "RightOfWay"("geom");

-- AddForeignKey
ALTER TABLE "RightOfWayOnPlan" ADD CONSTRAINT "RightOfWayOnPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RightOfWayOnPlan" ADD CONSTRAINT "RightOfWayOnPlan_rightOfWayId_fkey" FOREIGN KEY ("rightOfWayId") REFERENCES "RightOfWay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
