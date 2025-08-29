import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { CONSTITUENCY_REPORT_TYPE } from "app/features/report/report.constants"
import type { REPORT_TYPE } from "app/features/report/report.constants"
import getConstituenciesByCountryAndLocalityLike from "./get-constituencies-by-country-and-locality-like"
import type { Report } from "ui"

const GetConstituency = z.object({
  regionId: z.string(),
  subRegionId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetConstituency),
  async ({ regionId, subRegionId }, ctx) => {
    const constituencies = await getConstituenciesByCountryAndLocalityLike(
      { countryId: regionId, localityLikeId: subRegionId },
      ctx,
    )
    if (!constituencies) return []
    const reports: Report[] = constituencies.map((constituency) => ({
      id: constituency.id,
      displayName: constituency.name,
      type: CONSTITUENCY_REPORT_TYPE as REPORT_TYPE,
    }))
    return reports
  },
)
