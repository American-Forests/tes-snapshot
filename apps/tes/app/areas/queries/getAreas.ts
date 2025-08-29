import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { paginate } from "blitz"

interface GetAreasInput
  extends Pick<Prisma.AreaFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAreasInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: areas,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.area.count({ where }),
      query: (paginateArgs) => db.area.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      areas,
      nextPage,
      hasMore,
      count,
    }
  },
)
