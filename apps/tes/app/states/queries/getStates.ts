import { resolver } from "@blitzjs/rpc"
import db from "db"
import { State } from "@prisma/client"

export default resolver.pipe(async () => {
  const states: State[] = await db.state.findMany()
  return states
})
