-- AlterTable
ALTER TABLE "BlockgroupOnScenario" ADD COLUMN     "treeEquityScoreTarget" INTEGER NOT NULL DEFAULT 0;
    
WITH data3 AS (
    WITH data2 AS (
        WITH data1 AS 
        (SELECT id, equity_index, tree_canopy_goal, tree_canopy, area, tree_canopy_gap_max, 
        "BlockgroupOnScenario"."targetArea", ((area * tree_canopy) + "BlockgroupOnScenario"."targetArea") / area AS target_tree_canopy, 
        CASE 
            WHEN tree_canopy_gap_max = 0 THEN 0 
            WHEN tree_canopy_goal - (((area * tree_canopy) + "BlockgroupOnScenario"."targetArea") / area) < 0 THEN 0 
            ELSE (tree_canopy_goal - (((area * tree_canopy) + "BlockgroupOnScenario"."targetArea") / area)) / tree_canopy_gap_max END AS gap_score 
            from "Blockgroup" INNER JOIN "BlockgroupOnScenario" ON "Blockgroup"."id" = "BlockgroupOnScenario"."blockgroupId") 
        SELECT *, ROUND(100 * (1 - (gap_score * equity_index))) AS "treeEquityScoreTarget" FROM data1
    ) SELECT "treeEquityScoreTarget", id FROM data2
) 
    UPDATE "BlockgroupOnScenario" 
    SET "treeEquityScoreTarget" = "data3"."treeEquityScoreTarget"
    FROM "data3"
    WHERE "BlockgroupOnScenario"."blockgroupId" = "data3"."id";