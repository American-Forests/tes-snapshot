import { resolver } from "@blitzjs/rpc"
import db, { City } from "db"
import { CreateScenario } from "app/validations"

// Enforces tenancy
export default resolver.pipe(
  resolver.zod(CreateScenario),
  resolver.authorize(),
  async ({ name, city }, ctx) => {
    // TODO: casting city string to type City may be messy, is there a better way to do this?
    // look into enums with zod
    const plan = await db.scenario.create({
      data: { name, city: city as City, userId: ctx.session.userId },
    })
    return plan
  },
)
