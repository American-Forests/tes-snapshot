import { resolver } from "@blitzjs/rpc";
import { Ctx, NotFoundError } from "blitz";
import db from "db"
import { z } from "zod"
import type { BlockgroupWithCenter } from "app/constants"
import { wktToGeoJSON } from "betterknown"
import getBlockgroupByMunicipality from "./getBlockgroupByMunicipality"

const GetBlockgroupWithCenterByMunicipality = z.object({
  municipalitySlug: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetBlockgroupWithCenterByMunicipality),
  
  async ({ municipalitySlug }, ctx: Ctx): Promise<BlockgroupWithCenter[]> => {
    const blockgroups = await getBlockgroupByMunicipality({ municipalitySlug }, ctx)

    if (!blockgroups || !blockgroups.length) throw new NotFoundError()

    const blockgroupIds = blockgroups.map(bg => bg.id)

    const centers: { id: string; center: string }[] = await db.$queryRawUnsafe(
        `SELECT id, ST_AsText(ST_Centroid(geom)) as center FROM "Blockgroup" WHERE id IN (${blockgroupIds.map(id => `'${id}'`).join(',')})`
    )

    const centerMap = new Map(centers.map(c => [c.id, c.center]))

    return blockgroups.map(bg => ({
        ...bg,
        center: centerMap.has(bg.id)
        ? (wktToGeoJSON(centerMap.get(bg.id)!) as GeoJSON.Point).coordinates as [number, number]
        : null
    }))
  },
)
