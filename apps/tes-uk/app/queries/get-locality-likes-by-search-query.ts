import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { wktToGeoJSON } from "betterknown"

const GetLocalityLikes = z.object({
  query: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetLocalityLikes),
  async ({ query }: { query: string }) => {
    const cleanQuery = query
      .toLowerCase()
      .split(/\s+/)
      .map((s) => s.replace(/[^a-z]/, ""))
      .filter(Boolean)
      .map((s) => `${s}:*`)
      .join(" & ") as string

    const localityLikes = await db.localityLike.findMany({
      where: {
        OR: [{ name: { search: cleanQuery } }, { country: { search: cleanQuery } }],
      },
      take: 10,
    })

    if (!localityLikes.length) return []
    const gids = localityLikes.map((m) => m.gid)

    // get gid and center from locality likes
    const centers: { gid: number; center: string }[] = await db.$queryRawUnsafe(
      `SELECT gid, ST_AsText(ST_Centroid("geom")) as "center" FROM "LocalityLike" WHERE gid IN (${gids.join(
        ", ",
      )});`,
    )

    // convert center to coords and return Map that maps gid to coords
    const coords = new Map(
      centers
        .map((p) => {
          const geometry = wktToGeoJSON(p.center)!
          if (geometry.type === "Point") return [p.gid, geometry.coordinates as [number, number]]
        })
        .filter(Boolean) as [number, [number, number]][],
    )

    // return locality likes with correct center
    return localityLikes.map((m) => ({ ...m, center: coords.get(m.gid) as [number, number] }))
  },
)
