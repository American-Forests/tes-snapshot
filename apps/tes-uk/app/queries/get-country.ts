import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { COUNTRY_REPORT_TYPE } from "app/features/report/report.constants"
import { NotFoundError } from "blitz"

const GetCountry = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetCountry), async ({ id }: { id: string }) => {
  const country = await db.reportArea.findFirst({
    where: {
      id: id,
      type: COUNTRY_REPORT_TYPE,
    },
  })
  if (!country) throw new NotFoundError()
  return country
})
