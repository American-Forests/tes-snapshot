import { resolver } from "@blitzjs/rpc";
import db, { Blockgroup, BlockgroupSupplemental } from "db"
import { z } from "zod"
import { BlockgroupWithSupplemental } from "app/constants"
import { NotFoundError } from "blitz";

const GetBlockgroupWithSupplemental = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetBlockgroupWithSupplemental), async ({ id }: { id: string }): Promise<BlockgroupWithSupplemental | null> => {
  try {

    const blockgroup: Blockgroup = await db.blockgroup.findFirstOrThrow({ where: { id } })
    const supplemental: BlockgroupSupplemental = await db.blockgroupSupplemental.findFirst({ where: { id } })
    return { ...blockgroup, ...supplemental }
  } catch(error) {
    if (error instanceof NotFoundError) {
      console.error("User not found!");
      return null
    }
    else {
      console.error("Unexpected error:", error);
      return null
    }
  }
})
