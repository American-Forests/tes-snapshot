import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetNeighborhoodLikesByConstituency = z.object({
  constituencyId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetNeighborhoodLikesByConstituency),
  async ({ constituencyId }: { constituencyId: string }) => {
    const neighborhoodLikes = await db.neighborhoodLike.findMany({
      where: { constituency_id: constituencyId },
    })
    if (!neighborhoodLikes) throw new NotFoundError()
    return neighborhoodLikes
  },
)
