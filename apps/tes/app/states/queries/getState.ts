import { resolver } from "@blitzjs/rpc"
import { wktToGeoJSON } from "betterknown"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"


const GetState = z.object({
  abbreviation: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetState),
  async ({ abbreviation }: { abbreviation: string }) => {
    const state = await db.state.findFirst({
      where: {
        abbreviation: abbreviation,
      },
    })
    if (!state) throw new NotFoundError()

    const gid = state.gid
    const center: { center: string }[] = await db.$queryRawUnsafe(
      `SELECT ST_AsText("geom") as "center" FROM "State" WHERE gid = ${gid};`,
    )
    if (!center) throw new NotFoundError()
    const geometry = wktToGeoJSON(center[0]!.center)
    if (!geometry || geometry.type !== "Point") throw new NotFoundError()
    const coords = geometry.coordinates as [number, number]
    return { ...state, center: coords }
  },
)
