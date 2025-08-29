import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { CONSTITUENCY_REPORT_TYPE } from "app/features/report/report.constants"
import { uniq } from "lodash"
import { NotFoundError } from "blitz"


const GetConstituency = z.object({
  countryId: z.string(),
  localityLikeId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetConstituency),
  async ({ countryId, localityLikeId }: { countryId: string; localityLikeId: string }) => {
    const neighborhoods = await db.neighborhoodLike.findMany({
      where: { locality_id: localityLikeId, country_id: countryId },
    })

    if (!neighborhoods) throw new NotFoundError()
    const constituencyIds = uniq(neighborhoods.map((n) => n.constituency_id))
    const constituencies = await db.reportArea.findMany({
      where: {
        AND: [{ type: CONSTITUENCY_REPORT_TYPE }, { id: { in: constituencyIds } }],
      },
    })
    if (!constituencies) throw new NotFoundError()
    return constituencies
  },
)
