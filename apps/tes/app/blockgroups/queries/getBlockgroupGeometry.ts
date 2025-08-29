import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetBlockgroup = z.object({
  id: z.string(),
})

const rawQuery = async ({ id }: { id: string }) =>
  await db.$queryRaw`SELECT ST_AsText(geom) as geom FROM "Blockgroup" WHERE id = ${id}`

export default resolver.pipe(resolver.zod(GetBlockgroup), rawQuery)
