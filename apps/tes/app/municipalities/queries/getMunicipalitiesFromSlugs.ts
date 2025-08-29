import { resolver } from "@blitzjs/rpc"
import { wktToGeoJSON } from "betterknown"
import db from "db"
import { z } from "zod"
import type { Municipality } from "db"

const GetMunicipalitiesFromSlugs = z.object({
  slugs: z.array(z.string()),
})

export default resolver.pipe(resolver.zod(GetMunicipalitiesFromSlugs), async ({ slugs }) => {
  const municipalities: Municipality[] = await db.municipality.findMany({
    where: {
      slug: {
        in: slugs,
      },
    },
  })

  if (!municipalities.length) return []

  const gids = municipalities.map((m) => m.gid)

  const centers: { gid: number; center: string }[] = await db.$queryRawUnsafe(
    `SELECT gid, ST_AsText(ST_Centroid(geom)) as "center" FROM "Municipality" WHERE gid IN (${gids.join(
      ", "
    )});`
  )

  const centerMap = new Map(centers.map((c) => [c.gid, c.center]))

  return municipalities.map((municipality) => ({
    ...municipality,
    center: centerMap.has(municipality.gid)
      ? ((wktToGeoJSON(centerMap.get(municipality.gid)!) as GeoJSON.Point).coordinates as [
          number,
          number
        ])
      : null,
  }))
})
