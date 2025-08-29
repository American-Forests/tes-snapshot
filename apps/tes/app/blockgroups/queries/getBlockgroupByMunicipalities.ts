import { resolver } from "@blitzjs/rpc"
import db, { Blockgroup } from "db"
import { z } from "zod"

const GetBlockgroupByMunicipalities = z.object({
  municipalitySlugs: z.array(z.string()),
})

export default resolver.pipe(
  resolver.zod(GetBlockgroupByMunicipalities),
  async ({ municipalitySlugs }) => {
    const blockgroups: Blockgroup[] = await db.blockgroup.findMany({
      where: {
        municipality_slug: {
          in: municipalitySlugs,
        },
      },
    })
    return blockgroups
  },
)
