import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetBlockgroupOnScenario = z.object({
  blockgroupId: z.string().optional().refine(Boolean, "Required"),
  scenarioId: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetBlockgroupOnScenario),
  resolver.authorize(),
  async ({ blockgroupId, scenarioId }) => {
    const blockgroup = await db.blockgroup.findFirstOrThrow({
      where: {
        id: blockgroupId,
      },
    })

    const scenario = await db.scenario.findFirstOrThrow({
      where: {
        id: scenarioId,
      },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
      },
    })

    const blockgroupOnScenario = await db.blockgroupOnScenario.findFirst({
      where: {
        blockgroupId,
        scenarioId,
      },
    })

    return { blockgroup, scenario, blockgroupOnScenario }
  },
)
