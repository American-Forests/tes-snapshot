import { resolver } from "@blitzjs/rpc"
import db, { Blockgroup } from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"


const GetBlockgroupByState = z.object({
  state: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetBlockgroupByState),
  async ({ state }: { state: string }) => {
    const blockgroups: Blockgroup[] = await db.blockgroup.findMany({
      where: {
        state: state,
      },
    })
    if (!blockgroups || !blockgroups.length) throw new NotFoundError()
    return blockgroups
  },
)
