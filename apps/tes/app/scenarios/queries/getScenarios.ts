import { resolver } from "@blitzjs/rpc"
import { Ctx, paginate} from "blitz"
import db from "db"

// Enforces tenancy
export default resolver.pipe(
  resolver.authorize(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ where, orderBy, skip = 0, take = 100 }: any, ctx: Ctx) => {
    const {
      items: scenarios,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.scenario.count({ where }),
      query: (paginateArgs) =>
        db.scenario.findMany({
          ...paginateArgs,
          where: { ...where, userId: ctx.session.userId },
          orderBy: orderBy,
        }),
    })

    return {
      scenarios,
      nextPage,
      hasMore,
      count,
    }
  },
)
