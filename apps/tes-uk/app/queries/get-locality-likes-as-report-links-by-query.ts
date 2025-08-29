import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import type { Report } from "ui"
import getLocalityLikesByQuery from "./get-locality-likes-by-query"
import { LOCALITY_REPORT_TYPE, REPORT_TYPE } from "app/features/report/report.constants"

const GetLocalityLikesAsReports = z.object({
  query: z.string(),
})

export default resolver.pipe(resolver.zod(GetLocalityLikesAsReports), async (input, ctx) => {
  const localityLikes = await getLocalityLikesByQuery(input, ctx)
  const reports: Report[] = localityLikes.map((localityLike) => ({
    id: localityLike.id,
    displayName: `${localityLike.name}, ${localityLike.country}`,
    type: LOCALITY_REPORT_TYPE as REPORT_TYPE,
  }))
  return reports
})
