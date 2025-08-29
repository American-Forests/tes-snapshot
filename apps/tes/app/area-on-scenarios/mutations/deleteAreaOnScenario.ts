import { resolver } from "@blitzjs/rpc"
import { DeleteAreaOnScenario } from "app/validations"
import db from "db"

// Enforces tenancy
export default resolver.pipe(
  resolver.zod(DeleteAreaOnScenario),
  resolver.authorize(),
  async ({ scenarioId, areaId }, ctx) => {
    await db.scenario.findFirstOrThrow({
      where: {
        id: scenarioId,
        userId: ctx.session.userId,
      },
    })
    const areaOnScenario = await db.areaOnScenario.deleteMany({
      where: {
        scenarioId,
        areaId,
      },
    })

    return areaOnScenario
  },
)
