import { resolver } from "@blitzjs/rpc"
import { wktToGeoJSON } from "betterknown"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetCounty = z.object({
  slug: z.string(),
})

export default resolver.pipe(resolver.zod(GetCounty), async ({ slug }: { slug: string }) => {
  const county = await db.county.findFirst({
    where: {
      slug: slug,
    },
  })
  if (!county) throw new NotFoundError()

  const gid = county.gid
  const center: { center: string }[] = await db.$queryRawUnsafe(
    `SELECT ST_AsText("geom") as "center" FROM "County" WHERE gid = ${gid};`,
  )
  if (!center) throw new NotFoundError()
  const geometry = wktToGeoJSON(center[0]!.center)
  if (!geometry || geometry.type !== "Point") throw new NotFoundError()
  const coords = geometry.coordinates as [number, number]
  return { ...county, center: coords }
})
