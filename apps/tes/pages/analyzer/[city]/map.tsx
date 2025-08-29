import { useRouter } from "next/router"
import { BlitzPage, useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { IdlePanelContents } from "components/idle_panel_contents"
import { EditBlockgroupItem } from "components/edit_blockgroup_item"
import { EditItem } from "components/edit_item"
import TesaMap from "app/features/regional-map"
import { WithCity } from "app/features/regional-map/regional-map.state"
import { ScenarioEditor } from "components/scenario_editor"
import React, { Suspense } from "react"
import { scenarioIdDecode } from "app/utils/formatting_utils"
import { TESAReleaseBanner } from "app/features/dashboard/components/release-banner"
import { SHADE_TESAS } from "app/constants"


const Map: BlitzPage = () => {
  // const id = useParam("id", "string")!
  const { blockgroupId, areaId, scenarioId } = useRouter().query
  const cityId = String(useParam("city"))

  return (
    <WithCity>
      <Suspense fallback={null}>
        {cityId && SHADE_TESAS.includes(cityId) && (
          <TESAReleaseBanner />
        )}
        <TesaMap>
          {blockgroupId ? (
            <EditBlockgroupItem
              blockgroupId={String(blockgroupId)}
              scenarioId={scenarioIdDecode(scenarioId as string)!}
            />
          ) : areaId ? (
            <EditItem
              areaId={String(areaId)}
              scenarioId={scenarioIdDecode(scenarioId as string)!}
            />
          ) : scenarioId ? (
            <ScenarioEditor scenarioId={scenarioIdDecode(scenarioId as string)!} />
          ) : (
            <IdlePanelContents />
          )}
        </TesaMap>
      </Suspense>
    </WithCity>
  )
}

Map.getLayout = (page) => <Layout>{page}</Layout>

export default Map
