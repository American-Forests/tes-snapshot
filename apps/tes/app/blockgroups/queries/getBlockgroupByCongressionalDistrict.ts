import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetBlockgroupByCongressionalDistrict = z.object({
  congressionalDistrict: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetBlockgroupByCongressionalDistrict),
  async ({ congressionalDistrict }: { congressionalDistrict: string }) => {
    const blockgroups = await db.blockgroup.findMany({
      where: {
        congressional_district: congressionalDistrict,
      },
    })
    if (!blockgroups || !blockgroups.length) throw new NotFoundError()
    return blockgroups
  },
)
