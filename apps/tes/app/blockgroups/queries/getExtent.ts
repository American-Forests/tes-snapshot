import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import bbox from "@turf/bbox"
import { BBox } from "@turf/helpers"
import { wktToGeoJSON } from "betterknown"
import { Prisma } from "@prisma/client"
import { QueryExtentEnvelope } from "tes-types"

const GetExtent = z.object({
  blockgroupIds: z.string().array(),
})

function getExtent(envelope: QueryExtentEnvelope): BBox {
  const geometry = envelope && wktToGeoJSON(envelope[0].extent)
  return bbox(geometry)
}

const rawQuery = async ({ blockgroupIds }: { blockgroupIds: string[] }) => {
  const envelope: QueryExtentEnvelope = await db.$queryRaw`
      SELECT ST_AsText(ST_Extent(geom)) AS extent
      FROM "Blockgroup"
      WHERE id IN (${Prisma.join(blockgroupIds)})
      AND geom IS NOT NULL;
    `
  return getExtent(envelope)
}

export default resolver.pipe(resolver.zod(GetExtent), rawQuery)
