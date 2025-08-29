import { useEffect, useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"

import { FacetsPanel, FiltersPanel, Button, Ramp } from "./components"
import { ChevronDownIcon, LayersIcon, MixerHorizontalIcon } from "@radix-ui/react-icons"

import {
  LOCALITY_LIKE_ZOOM_LEVEL,
  NEIGHBORHOOD_LIKE_LAYER,
  NEIGHBORHOOD_LIKE_ZOOM_LEVEL,
} from "app/features/map/map.constants"
import {
  activeLocalityFacetAtom,
  activeNeighborhoodFacetAtom,
} from "app/features/facets/facets.state"

import type { Facet } from "app/features/facets/facets.constants"
import { twMerge } from "tailwind-merge"
import { mapZoomLevelAtom } from "../map/map.state"
import { BottomLogos, TopLogos } from "./components/logos"
import { filtersAtom } from "./legend.state"

function LayerAndFilterControls({ activeFacet }: { activeFacet: Facet }) {
  const setActiveFacet = useSetAtom(activeNeighborhoodFacetAtom)
  const filters = useAtomValue(filtersAtom)
  const [mode, setMode] = useState<"facets" | "filters" | null>(null)
  const handleFiltersButtonClick = () => setMode("filters")
  const handleFacetsButtonClick = () => setMode("facets")
  const handleClosePanel = () => setMode(null)
  return (
    <div className="w-full">
      {mode === "facets" ? (
        <FacetsPanel
          activeFacet={activeFacet}
          activeLayer={NEIGHBORHOOD_LIKE_LAYER}
          handleClose={handleClosePanel}
          setActiveFacet={setActiveFacet}
        />
      ) : mode === "filters" ? (
        <FiltersPanel handleClose={handleClosePanel} />
      ) : (
        <div className="grid grid-cols-2 items-center gap-x-2 px-4 py-3">
          <Button
            label="Layers"
            Icon={LayersIcon}
            SecondaryIcon={ChevronDownIcon}
            onClick={handleFacetsButtonClick}
          />
          <Button
            label={!!filters?.length ? "Modify filters" : "Filters"}
            Icon={MixerHorizontalIcon}
            SecondaryIcon={ChevronDownIcon}
            onClick={handleFiltersButtonClick}
            active={!!filters?.length}
          />
        </div>
      )}
    </div>
  )
}

export function Legend() {
  const neighborhoodActiveFacet = useAtomValue(activeNeighborhoodFacetAtom)
  const localityActiveFacet = useAtomValue(activeLocalityFacetAtom)
  const mapZoomLevel = useAtomValue(mapZoomLevelAtom)
  const [activeFacet, setActiveFacet] = useState<Facet | null>(null)
  const displayLayerAndFilterControls =
    mapZoomLevel && mapZoomLevel >= NEIGHBORHOOD_LIKE_ZOOM_LEVEL && activeFacet
  useEffect(() => {
    if (mapZoomLevel && mapZoomLevel >= NEIGHBORHOOD_LIKE_ZOOM_LEVEL) {
      setActiveFacet(neighborhoodActiveFacet)
    } else if (mapZoomLevel && mapZoomLevel >= LOCALITY_LIKE_ZOOM_LEVEL) {
      setActiveFacet(localityActiveFacet)
    } else {
      setActiveFacet(null)
    }
  }, [mapZoomLevel, neighborhoodActiveFacet])
  const positioningCX = "absolute w-full bottom-0"
  const stylingCX = "divide-y divide-gray-200 bg-white transition-all "
  const topDivideCx = displayLayerAndFilterControls ? "border-t border-t-gray-300" : ""
  return (
    <div className={twMerge(positioningCX, stylingCX, topDivideCx)}>
      {displayLayerAndFilterControls ? (
        <LayerAndFilterControls activeFacet={activeFacet} />
      ) : (
        <TopLogos />
      )}
      {activeFacet ? <Ramp activeFacet={activeFacet} /> : <BottomLogos />}
    </div>
  )
}
