import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { COUNTRY_REPORT_TYPE } from "app/features/report/report.constants"

const GetCountries = z.object({
  query: z.string(),
})

export default resolver.pipe(resolver.zod(GetCountries), async ({ query }) => {
  const cleanQuery = query
    .toLowerCase()
    .split(/\s+/)
    .map((s) => s.replace(/[^a-z]/, ""))
    .filter(Boolean)
    .map((s) => `${s}:*`)
    .join(" & ") as string

  const countries = await db.reportArea.findMany({
    where: {
      name: { search: cleanQuery },
      type: COUNTRY_REPORT_TYPE,
    },
    take: 10,
  })

  if (!countries.length) return []
  return countries
})
