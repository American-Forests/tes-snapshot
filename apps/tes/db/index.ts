import { enhancePrisma } from "blitz"
import { PrismaClient } from "@prisma/client"

const EnhancedPrisma = enhancePrisma(PrismaClient)

export * from "@prisma/client"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default new EnhancedPrisma() as any
