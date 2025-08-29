import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetNeighborhoodLikesByLocalityLike = z.object({
  localityLikeId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetNeighborhoodLikesByLocalityLike),
  async ({ localityLikeId }: { localityLikeId: string }) => {
    const neighborhoodLikes = await db.neighborhoodLike.findMany({
      where: { locality_id: localityLikeId },
    })
    if (!neighborhoodLikes) throw new NotFoundError()
    return neighborhoodLikes
  },
)
