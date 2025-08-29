import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetNeighborhoodLikesByCountry = z.object({
  countryId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetNeighborhoodLikesByCountry),
  async ({ countryId }: { countryId: string }) => {
    const neighborhoodLikes = await db.neighborhoodLike.findMany({
      where: { country_id: countryId },
    })
    if (!neighborhoodLikes) throw new NotFoundError()
    return neighborhoodLikes
  },
)
