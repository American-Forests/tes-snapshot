import { resolver } from "@blitzjs/rpc"
import { UpdateBlockgroupOnScenario } from "app/validations"
import db from "db"

// Enforces tenancy
export default resolver.pipe(
  resolver.zod(UpdateBlockgroupOnScenario),
  resolver.authorize(),
  async ({ scenarioId, blockgroupId, name, treeEquityScoreTarget, targetArea }, ctx) => {
    await db.scenario.findFirstOrThrow({
      where: {
        id: scenarioId,
        userId: ctx.session.userId,
      },
    })
    const blockgroupOnScenario = await db.blockgroupOnScenario.updateMany({
      data: {
        name,
        treeEquityScoreTarget,
        targetArea,
      },
      where: {
        scenarioId,
        blockgroupId,
      },
    })

    if (blockgroupOnScenario.count === 0) {
      await db.blockgroupOnScenario.create({
        data: {
          name,
          treeEquityScoreTarget,
          scenarioId,
          blockgroupId,
          targetArea,
        },
      })
    }

    return blockgroupOnScenario
  },
)
