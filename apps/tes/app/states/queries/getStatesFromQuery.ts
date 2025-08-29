import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetStates = z.object({
  query: z.string(),
  maxItems: z.number().optional(),
})

export default resolver.pipe(resolver.zod(GetStates), async ({ query, maxItems = 10 }) => {
  const cleanQuery = query
    .toLowerCase()
    .split(/\s+/)
    .map((s) => s.replace(/[^a-z]/, ""))
    .filter(Boolean)
    .map((s) => `${s}:*`)
    .join(" & ") as string

  const states = await db.state.findMany({
    where: {
      OR: [{ abbreviation: { search: cleanQuery } }, { name: { search: cleanQuery } }],
    },
    take: maxItems,
  })

  if (!states.length) return []

  return states
})
