import { resolver } from "@blitzjs/rpc"
import db, { Blockgroup } from "db"
import { z } from "zod"

const GetBlockgroup = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetBlockgroup),
  async ({ id }: { id: string }): Promise<Blockgroup> => {
    const blockgroup = db.blockgroup.findFirstOrThrow({ where: { id } })
    return blockgroup
  },
)
