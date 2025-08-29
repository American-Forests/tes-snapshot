import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteScenario = z.object({
  id: z.number(),
})

// Enforces tenancy
export default resolver.pipe(
  resolver.zod(DeleteScenario),
  resolver.authorize(),
  async ({ id }, ctx) => {
    await db.areaOnScenario.deleteMany({ where: { scenarioId: id } })
    await db.blockgroupOnScenario.deleteMany({ where: { scenarioId: id } })
    const plan = await db.scenario.deleteMany({ where: { id, userId: ctx.session.userId } })
    return plan
  },
)
