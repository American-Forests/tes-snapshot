import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { COUNTRY_REPORT_TYPE } from "app/features/report/report.constants"
import { NotFoundError } from "blitz"

const GetCountries = z.void()

export default resolver.pipe(resolver.zod(GetCountries), async () => {
  const countries = await db.reportArea.findMany({
    where: {
      type: COUNTRY_REPORT_TYPE,
    },
  })
  if (!countries) throw new NotFoundError()
  return countries
})
