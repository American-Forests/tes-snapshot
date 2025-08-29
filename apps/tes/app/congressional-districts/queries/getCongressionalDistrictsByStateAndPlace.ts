import { resolver } from "@blitzjs/rpc"
import db, { Blockgroup, CongressionalDistrict } from "db"
import { z } from "zod"

const GetCongressionalDistrictsByStateAndPlace = z.object({
  state: z.string(),
  place: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetCongressionalDistrictsByStateAndPlace),
  async ({ state, place }: { state: string; place?: string }) => {
    const blockgroups = await db.blockgroup.findMany({
      where: {
        state: state,
      },
    })
    if (!blockgroups) return []

    if (!place)
      return await db.congressionalDistrict.findMany({
        where: {
          name: {
            in: blockgroups.map((blockgroup: Blockgroup) => blockgroup.congressional_district),
          },
        },
      })

    const blockgroupsInPlace = blockgroups.filter(
      (blockgroup: Blockgroup) =>
        blockgroup.municipality_slug === place || blockgroup.incorporated_place_name === place,
    )
    const districts: CongressionalDistrict[] = await db.congressionalDistrict.findMany({
      where: {
        name: {
          in: blockgroupsInPlace.map((blockgroup: Blockgroup) => blockgroup.congressional_district),
        },
      },
    })
    return districts
  },
)
