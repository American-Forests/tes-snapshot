import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import db, { Area } from "db"
import { z } from "zod"

const GetArea = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetArea), resolver.authorize(), async ({ id }): Promise<Area | null> => {
  try {
    const area = await db.area.findFirstOrThrow({ where: { id } })
    return area
  } catch (error) {
    if (error instanceof NotFoundError) {
      console.error("User not found!");
      return null
    }
    else {
      console.error("Unexpected error:", error);
      return null
    }
  }
  
})
