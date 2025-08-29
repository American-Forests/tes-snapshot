import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetLocalityLikes = z.object({
  query: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetLocalityLikes),
  async ({ query }: { query: string }) => {
    const cleanQuery = query
      .toLowerCase()
      .split(/\s+/)
      .map((s) => s.replace(/[^a-z]/, ""))
      .filter(Boolean)
      .map((s) => `${s}:*`)
      .join(" & ") as string

    const localityLikes = await db.localityLike.findMany({
      where: {
        OR: [{ name: { search: cleanQuery } }, { country: { search: cleanQuery } }],
      },
      take: 10,
    })

    if (!localityLikes.length) return []
    return localityLikes
  },
)
