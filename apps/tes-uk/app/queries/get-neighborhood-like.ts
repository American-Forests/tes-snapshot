import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetNeighborhoodLike = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetNeighborhoodLike), async ({ id }: { id: string }) => {
  const neighborhoodLike = await db.neighborhoodLike.findFirst({ where: { id } })
  if (!neighborhoodLike) throw new NotFoundError()
  return neighborhoodLike
})
