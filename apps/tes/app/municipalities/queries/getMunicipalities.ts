import { resolver } from "@blitzjs/rpc"
import db, { Municipality } from "db"
import { z } from "zod"
import { wktToGeoJSON } from "betterknown"

const GetMunicipalities = z.object({
  query: z.string(),
  maxItems: z.number().optional(),
})

export default resolver.pipe(resolver.zod(GetMunicipalities), async ({ query, maxItems = 10 }) => {
  const cleanQuery = query
    .toLowerCase()
    .split(/\s+/)
    .map((s) => s.replace(/[^a-z]/, ""))
    .filter(Boolean)
    .map((s) => `${s}:*`)
    .join(" & ") as string

  const municipalities = await db.municipality.findMany({
    where: {
      NOT: {
        city: "TORONTO",
      },
      OR: [{ incorporated_place_name: { search: cleanQuery } }, { state: { search: cleanQuery } }],
    },
    take: maxItems,
  })

  if (!municipalities.length) return []
  const gids = municipalities.map((m: Municipality) => m.gid)

  // get gid and center from municipalities
  const centers: { gid: number; center: string }[] = await db.$queryRawUnsafe(
    `SELECT gid, ST_AsText(ST_Centroid(geom)) as "center" FROM "Municipality" WHERE gid IN (${gids.join(
      ", "
    )});`
  )

  // convert center to coords and return Map that maps gid to coords
  const coords = new Map(
    centers
      .map((p) => {
        const geometry = wktToGeoJSON(p.center)!
        if (geometry.type === "Point") return [p.gid, geometry.coordinates as [number, number]]
      })
      .filter(Boolean) as [number, [number, number]][]
  )

  // return municipalities with correct center
  return municipalities.map((m: Municipality) => ({ ...m, center: coords.get(m.gid) }))
})
