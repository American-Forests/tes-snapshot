import { resolver } from "@blitzjs/rpc"
import db, { iTree } from "db"

import { z } from "zod"

const GetITree = z.object({
  fips_list: z.string().length(5).array(),
})

export default resolver.pipe(resolver.zod(GetITree), async ({ fips_list }) => {
  const iTreeData = await db.iTree.findMany({
    where: {
      fips: { in: fips_list },
    },
  })
  return new Map(iTreeData.map((d: iTree) => [d.fips, d])) as Map<string, iTree>
})
