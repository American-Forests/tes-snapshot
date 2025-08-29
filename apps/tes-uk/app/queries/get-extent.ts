import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import bbox from "@turf/bbox"
import { wktToGeoJSON } from "betterknown"
import { Prisma } from "@prisma/client"
import { NotFoundError } from "blitz"

const GetExtent = z.object({
  neighborhoodIds: z.string().array(),
})

interface Envelope {
  extent: string
}

function getExtent(envelope: Envelope) {
  const geometry = wktToGeoJSON(envelope.extent)
  return bbox(geometry) as [number, number, number, number]
}

const rawQuery = async ({ neighborhoodIds }: { neighborhoodIds: string[] }) => {
  const result: Envelope[] | undefined =
    await db.$queryRaw`SELECT ST_AsText(ST_Envelope(ST_Union(geom))) AS extent FROM "NeighborhoodLike" WHERE id IN (${Prisma.join(
      neighborhoodIds,
    )});`
  if (result && result[0]) return getExtent(result[0])
  else throw new NotFoundError()
}

export default resolver.pipe(resolver.zod(GetExtent), rawQuery)
