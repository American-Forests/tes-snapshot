import { resolver } from "@blitzjs/rpc"
import { UpdateAreaOnScenario } from "app/validations"
import db from "db"

// Enforces tenancy
export default resolver.pipe(
  resolver.zod(UpdateAreaOnScenario),
  resolver.authorize(),
  async ({ scenarioId, areaId, name, ...trees }, ctx) => {
    await db.scenario.findFirstOrThrow({
      where: {
        id: scenarioId,
        userId: ctx.session.userId,
      },
    })
    const area = await db.area.findFirstOrThrow({
      where: {
        id: areaId,
      },
    })
    const areaOnScenario = await db.areaOnScenario.updateMany({
      data: {
        ...trees,
        name,
      },
      where: {
        scenarioId,
        areaId,
      },
    })

    if (areaOnScenario.count === 0) {
      await db.areaOnScenario.create({
        data: {
          ...trees,
          scenarioId,
          areaId,
          name,
        },
      })

      const blockgroupOnScenario = await db.blockgroupOnScenario.findFirst({
        where: {
          scenarioId,
          blockgroupId: area.blockgroupId,
        },
      })

      if (!blockgroupOnScenario) {
        await db.blockgroupOnScenario.create({
          data: {
            scenarioId,
            blockgroupId: area.blockgroupId,
          },
        })
      }
    }

    return areaOnScenario
  },
)
