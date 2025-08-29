import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import type { Blockgroup } from "db"
import { NotFoundError } from "blitz"

const GetBlockgroupByMunicipality = z.object({
  municipalitySlug: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetBlockgroupByMunicipality),
  async ({ municipalitySlug }: { municipalitySlug: string }): Promise<Blockgroup[]> => {
    const blockgroups = await db.blockgroup.findMany({
      where: {
        municipality_slug: municipalitySlug,
      },
    })
    if (!blockgroups || !blockgroups.length) throw new NotFoundError()
    return blockgroups
  },
)
