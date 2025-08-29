import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetScenarioNoAuth = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

// Enforces tenancy
const getScenarioNoAuth = resolver.pipe(resolver.zod(GetScenarioNoAuth), async ({ id }) => {
  const scenario = await db.scenario.findFirst({
    where: { id },
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
})

export default getScenarioNoAuth

export type GetScenarioNoAuth = Awaited<ReturnType<typeof getScenarioNoAuth>>
