import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { CONSTITUENCY_REPORT_TYPE } from "app/features/report/report.constants"
import { NotFoundError } from "blitz"


const GetConstituency = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetConstituency), async ({ id }: { id: string }) => {
  const constituency = await db.reportArea.findFirst({
    where: {
      id: id,
      type: CONSTITUENCY_REPORT_TYPE,
    },
  })
  if (!constituency) throw new NotFoundError()
  return constituency
})
