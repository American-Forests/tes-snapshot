import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateScenario = z.object({
  id: z.number(),
  name: z.string(),
})

// Enforces tenancy
export default resolver.pipe(
  resolver.zod(UpdateScenario),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const plan = await db.scenario.updateMany({ where: { id, userId: ctx.session.userId }, data })

    return plan
  },
)
