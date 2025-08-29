import { resolver } from "@blitzjs/rpc"
import { wktToGeoJSON } from "betterknown"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"


const GetCongressionalDistrict = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetCongressionalDistrict),
  async ({ name }: { name: string }) => {
    const congressionalDistrict = await db.congressionalDistrict.findFirst({
      where: {
        name: name,
      },
    })
    if (!congressionalDistrict) throw new NotFoundError()

    const gid = congressionalDistrict.gid
    const center: { center: string }[] = await db.$queryRawUnsafe(
      `SELECT ST_AsText("geom") as "center" FROM "CongressionalDistrict" WHERE gid = ${gid};`,
    )
    if (!center) throw new NotFoundError()
    const geometry = wktToGeoJSON(center[0]!.center)
    if (!geometry || geometry.type !== "Point") throw new NotFoundError()
    const coords = geometry.coordinates as [number, number]
    return { ...congressionalDistrict, center: coords }
  },
)
