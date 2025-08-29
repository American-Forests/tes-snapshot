import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetScenario = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

// Enforces tenancy
const getScenario = resolver.pipe(
  resolver.zod(GetScenario),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const scenario = await db.scenario.findFirst({
      where: { id, userId: ctx.session.userId },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
        blockgroups: {
          include: {
            blockgroup: true,
          },
        },
      },
    })

    if (!scenario) throw new NotFoundError()

    return scenario
  },
)

export default getScenario

export type GetScenario = Awaited<ReturnType<typeof getScenario>>
