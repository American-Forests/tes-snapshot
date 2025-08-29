import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import bbox from "@turf/bbox"
import { BBox } from "@turf/helpers"
import { wktToGeoJSON } from "betterknown"
import { QueryExtentEnvelope } from "tes-types"

const GetLocationEnvelope = z.object({
  city: z.string(),
})

function getExtent(envelope: QueryExtentEnvelope): BBox {
  const geometry = envelope && wktToGeoJSON(envelope[0].extent)
  return bbox(geometry)
}

const rawQuery = async ({ city }: { city: string }) => {
  const envelope: QueryExtentEnvelope =
    await db.$queryRaw`SELECT ST_AsText(ST_Envelope(ST_Union(geom))) AS extent FROM "Municipality" WHERE city = ${city}::"City";`
  return getExtent(envelope)
}

export default resolver.pipe(resolver.zod(GetLocationEnvelope), rawQuery)
