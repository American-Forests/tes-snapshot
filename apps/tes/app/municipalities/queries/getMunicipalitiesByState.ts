import { resolver } from "@blitzjs/rpc"
import db, { Municipality } from "db"
import { z } from "zod"

const GetMunicipalitiesByState = z.object({
  state: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetMunicipalitiesByState),
  async ({ state }: { state: string }) => {
    const municipalities: Municipality[] = await db.municipality.findMany({
      where: {
        state: state,
      },
    })
    return municipalities
  },
)
