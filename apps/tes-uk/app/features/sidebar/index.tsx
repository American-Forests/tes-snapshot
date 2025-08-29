import { ErrorBoundary, ErrorComponent } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Suspense } from "react"
import { useAtomValue } from "jotai"
import type { LocalityLike, NeighborhoodLike } from "@prisma/client"
import getNeighborhoodLikeQuery from "app/queries/get-neighborhood-like"
import getLocalityLikeQuery from "app/queries/get-locality-like"
import { Legend } from "app/features/legend"
import { clickedFeatureAtom } from "../map/map.state"
import { SidebarFeatureDataPanel, IntroSidebar } from "./components"
import { SymbolIcon } from "@radix-ui/react-icons"

const SidebarFeatureData = () => {
  const selectedFeature = useAtomValue(clickedFeatureAtom)
  const id = selectedFeature?.properties?.id
  const [neighborhoodLikeData] = useQuery(getNeighborhoodLikeQuery, { id }, { enabled: !!id })
  const [localityData] = useQuery(
    getLocalityLikeQuery,
    { id: neighborhoodLikeData?.locality_id as string },
    { enabled: !!neighborhoodLikeData }
  )
  return selectedFeature ? (
    <SidebarFeatureDataPanel
      neighborhoodLikeData={neighborhoodLikeData as NeighborhoodLike}
      localityData={localityData as LocalityLike}
    />
  ) : (
    <IntroSidebar />
  )
}

export const Sidebar = () => {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={({ error }) => <ErrorComponent statusCode={error.statusCode} />}
      >
        <Suspense
          fallback={
            <div className="p-2 h-full flex items-center justify-center gap-x-2 py-4 text-gray-500">
              <SymbolIcon />
              Loading…
            </div>
          }
        >
          <div className="min-h-[800px]">
            <SidebarFeatureData />
          </div>
        </Suspense>
      </ErrorBoundary>
      <div className="mt-auto relative">
        <Legend />
      </div>
    </>
  )
}
