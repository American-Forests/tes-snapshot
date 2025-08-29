import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetCounties = z.object({
  query: z.string(),
  maxItems: z.number().optional(),
})

export default resolver.pipe(resolver.zod(GetCounties), async ({ query, maxItems = 10 }) => {
  const cleanQuery = query
    .toLowerCase()
    .split(/\s+/)
    .map((s) => s.replace(/[^a-z]/, ""))
    .filter(Boolean)
    .map((s) => `${s}:*`)
    .join(" & ") as string

  const counties = await db.county.findMany({
    where: {
      name: { search: cleanQuery },
    },
    take: maxItems,
  })

  if (!counties.length) return []
  return counties
})
