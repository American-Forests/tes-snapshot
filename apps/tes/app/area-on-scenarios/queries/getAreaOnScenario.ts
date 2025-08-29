import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetAreaOnScenario = z.object({
  areaId: z.string().optional().refine(Boolean, "Required"),
  scenarioId: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetAreaOnScenario),
  resolver.authorize(),
  async ({ areaId, scenarioId }) => {
    try {
      const area = await db.area.findFirstOrThrow({
        where: {
          id: areaId,
        },
      })

      const scenario = await db.scenario.findFirstOrThrow({
        where: {
          id: scenarioId,
        },
      })

      const areaOnScenario = await db.areaOnScenario.findFirst({
        where: {
          areaId,
          scenarioId,
        },
      })

      return { area, scenario, areaOnScenario }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        // Prisma's code for "Record not found"
        throw new NotFoundError("Area or Scenario not found")
      } else if (error instanceof NotFoundError) {
        // Catch Blitz NotFoundError if thrown directly
        throw error
      } else {
        // Re-throw other errors
        console.error("Error in getAreaOnScenario:", error) // Log unexpected errors
        throw new Error("Failed to fetch area/scenario data") // Throw a generic error
      }
    }
  }
)
