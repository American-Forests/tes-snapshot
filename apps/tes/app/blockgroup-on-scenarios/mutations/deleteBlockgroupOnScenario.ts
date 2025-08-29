import { resolver } from "@blitzjs/rpc"
import { DeleteBlockgroupOnScenario } from "app/validations"
import db from "db"
import { ScenarioArea } from "types/data"

// Enforces tenancy
export default resolver.pipe(
  resolver.zod(DeleteBlockgroupOnScenario),
  resolver.authorize(),
  async ({ scenarioId, blockgroupId }, ctx) => {
    await db.scenario.findFirstOrThrow({
      where: {
        id: scenarioId,
        userId: ctx.session.userId,
      },
    })
    const areas = await db.areaOnScenario.findMany({
      where: {
        scenarioId,
      },
      include: {
        area: true,
      },
    })
    await db.areaOnScenario.deleteMany({
      where: {
        scenarioId,
        areaId: {
          in: areas
            .filter((area: ScenarioArea) => area.area.blockgroupId === blockgroupId)
            .map((area: ScenarioArea) => area.areaId),
        },
      },
    })
    const blockgroupOnScenario = await db.blockgroupOnScenario.deleteMany({
      where: {
        scenarioId,
        blockgroupId,
      },
    })

    return blockgroupOnScenario
  },
)
