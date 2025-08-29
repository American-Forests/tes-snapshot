/*
  Warnings:

  - A unique constraint covering the columns `[userId,name,city]` on the table `Scenario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Scenario_userId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Scenario_userId_name_city_key" ON "Scenario"("userId", "name", "city");
