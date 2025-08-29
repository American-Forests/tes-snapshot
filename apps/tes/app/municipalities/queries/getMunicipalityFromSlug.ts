import { resolver } from "@blitzjs/rpc"
import { wktToGeoJSON } from "betterknown"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

// slug is a formatted string with the incorporated place name and state seperated by dashes,
// if the incorporated place name contains more than one word the words are seperated by dashes
// for example, little-rock-ak is the slug for little rock, arkansas and richmond-va is the slug
// for richmond, va

const GetMunicipalityFromSlug = z.object({
  slug: z.string(),
})

export default resolver.pipe(resolver.zod(GetMunicipalityFromSlug), async ({ slug }) => {
  const municipality = await db.municipality.findFirst({
    where: {
      slug: slug,
    },
  })
  if (!municipality) throw new NotFoundError()

  const gid = municipality.gid
  const center: { center: string }[] = await db.$queryRawUnsafe(
    `SELECT ST_AsText(ST_Centroid(geom)) as "center" FROM "Municipality" WHERE gid = ${gid};`
  )
  if (!center) throw new NotFoundError()
  const geometry = wktToGeoJSON(center[0]!.center)
  if (!geometry || geometry.type !== "Point") throw new NotFoundError()
  const coords = geometry.coordinates as [number, number]
  return { ...municipality, center: coords }
})
