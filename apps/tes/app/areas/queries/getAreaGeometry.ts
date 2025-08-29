import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetArea = z.object({
  id: z.string(),
})

const rawQuery = async ({ id }: { id: string }) =>
  await db.$queryRaw`SELECT ST_AsText(geom) as geom FROM "Area" WHERE id = ${id}`

export default resolver.pipe(resolver.zod(GetArea), rawQuery)
