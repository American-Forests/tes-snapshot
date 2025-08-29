import { resolver } from "@blitzjs/rpc";
import getArea from "app/areas/queries/getArea"
import getBlockgroupWithSupplemental from "app/blockgroups/queries/getBlockgroupWithSupplemental"
import { BLOCKGROUP_LAYER_NAME, BlockgroupWithSupplemental, PARCEL_LAYER_NAME, RIGHT_OF_WAY_LAYER_NAME } from "app/constants"
import { Area } from "db"
import { z } from "zod"

const GetFeature = z.object({
  id: z.string(),
  layerId: z.enum([BLOCKGROUP_LAYER_NAME, PARCEL_LAYER_NAME, RIGHT_OF_WAY_LAYER_NAME]),
})

export default resolver.pipe(resolver.zod(GetFeature), async ({ id, layerId }, ctx): Promise<BlockgroupWithSupplemental | Area | null> => {
  if (layerId === BLOCKGROUP_LAYER_NAME) {
    const blockgroupWithSupplemental = await getBlockgroupWithSupplemental({ id }, ctx)
    return blockgroupWithSupplemental
  }

  const area = await getArea({ id }, ctx)
  return area
})
