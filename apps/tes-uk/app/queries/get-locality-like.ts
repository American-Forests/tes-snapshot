import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetLocalityLike = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetLocalityLike), async ({ id }: { id: string }) => {
  const localityLike = await db.localityLike.findFirst({ where: { id } })
  if (!localityLike) throw new NotFoundError()
  return localityLike
})
