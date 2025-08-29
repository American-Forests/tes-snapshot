import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { COUNTRY_REPORT_TYPE, LOCALITY_REPORT_TYPE } from "app/features/report/report.constants"
import type { REPORT_TYPE } from "app/features/report/report.constants"

const GetCountriesAndLocalityLikes = z.object({
  query: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetCountriesAndLocalityLikes),
  async ({ query }: { query: string }) => {
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

    const localityLikes = await db.localityLike.findMany({
      where: {
        OR: [{ name: { search: cleanQuery } }, { country: { search: cleanQuery } }],
      },
      take: 10,
    })

    return [
      ...(countries || []).map(({ id, name }) => ({
        id: id,
        displayName: name,
        type: COUNTRY_REPORT_TYPE as REPORT_TYPE,
      })),
      ...(localityLikes || []).map(({ id, name, country }) => ({
        id: id,
        displayName: `${name}, ${country}`,
        type: LOCALITY_REPORT_TYPE as REPORT_TYPE,
      })),
    ]
  },
)
