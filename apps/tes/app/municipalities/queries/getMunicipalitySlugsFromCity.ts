import { resolver } from "@blitzjs/rpc";
import db from "db"

import { z } from "zod"

const Input = z.object({
  city: z.string(),
})

const Output = z.array(z.string())

export default resolver.pipe(
  resolver.zod(Input),
  async ({ city }) => {
    const uppercaseCity = city.toUpperCase()
    // First, get the blockgroup IDs from blockgroupSupplemental
    const blockgroupIds: { id: string }[] = await db.blockgroupSupplemental.findMany({
      where: { city: uppercaseCity },
      select: { id: true },
      distinct: ['id']
    })

    // Then, join with blockgroup to get municipality slugs
    const municipalitySlugs: { municipality_slug: string }[] = await db.blockgroup.findMany({
      where: {
        id: { in: blockgroupIds.map(bg => bg.id) }
      },
      select: {
        municipality_slug: true
      },
      distinct: ['municipality_slug']
    })

    // Extract and filter the slugs
    const slugs = municipalitySlugs
      .map(bg => bg.municipality_slug)
      .filter((slug): slug is string => slug !== null && slug !== undefined)

    return Output.parse(slugs)
  }
)
