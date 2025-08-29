import { resolver } from "@blitzjs/rpc"
import db, { Blockgroup } from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetBlockgroupByCounty = z.object({
  countySlug: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetBlockgroupByCounty),
  async ({ countySlug }: { countySlug: string }) => {
    const blockgroups: Blockgroup[] = await db.blockgroup.findMany({
      where: {
        county_slug: countySlug,
      },
    })
    if (!blockgroups || !blockgroups.length) throw new NotFoundError()
    return blockgroups
  },
)
