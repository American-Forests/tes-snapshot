import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetITree = z.object({
  localityIds: z.string().array(),
})

export default resolver.pipe(
  resolver.zod(GetITree),
  async ({ localityIds }: { localityIds: string[] }) => {
    const iTreeData = await db.iTree.findMany({
      where: {
        la_code: { in: localityIds },
      },
    })
    return new Map(iTreeData.map((d) => [d.la_code, d]))
  },
)
