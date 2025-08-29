import { groupBy } from "lodash"
import { useLayerFacets } from "react-hooks"
import { HelpTooltip } from "ui"
import { useAtom, useAtomValue } from "jotai"
import { Button } from "./button"
import { CheckCircledIcon, ChevronLeftIcon } from "@radix-ui/react-icons"

import { activeBaseLayerAtom, mapAtom } from "app/features/map/map.state"

import { FACETS, FACETS_CATEGORIES } from "app/features/facets/facets.constants"

import type { Facet, FacetCategory } from "app/features/facets/facets.constants"
import { BASE_LAYERS, BaseLayer, MapLayer } from "app/features/map/map.constants"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { toggleLayer } from "utils"
export const MUTED_MAP_STYLE = "mapbox://styles/tesa-app/ckf7dsrw807la1amt1fjwh7l5"
export const SATELLITE_MAP_STYLE = "mapbox://styles/tesa-app/cl1y3sjid001o14mwv9bes7wg"
type BaseMapStyle = typeof MUTED_MAP_STYLE | typeof SATELLITE_MAP_STYLE
const FacetToggleButton = ({
  facet,
  active,
  onClick,
}: {
  facet: Facet
  active: boolean
  onClick: () => void
}) => {
  return (
    <button
      key={facet.attr}
      className={`w-full mb-1.5 transition-all flex items-center justify-between gap-x-1 group text-sm font-medium cursor-pointer rounded-full py-0.5 px-1 ${
        active
          ? "text-white bg-brand-green-dark"
          : "text-gray-600 hover:text-white hover:bg-brand-green"
      }`}
      onClick={onClick}
    >
      <div>
        <CheckCircledIcon
          className={`text-white transition-all inline mr-2 group-hover:text-brand-green`}
        />
        <span>{facet.layerName || facet.name}</span>
      </div>
      <HelpTooltip
        className={`group-hover:text-white ${active ? "text-white" : "text-brand-green"}`}
      >
        <>
          <p className="text-left">{facet.explanation}</p>
          {facet.source && (
            <p className="text-gray-400 text-xs text-left pt-2">{`[Data Source: ${facet.source}]`}</p>
          )}
        </>
      </HelpTooltip>
    </button>
  )
}

const LayerToggleButton = ({
  title,
  active,
  source,
  explanation,
  onClick,
}: {
  title: string
  active: boolean
  source: string
  explanation: string
  onClick: () => void
}) => {
  return (
    <button
      key={title}
      className={`w-full transition-all flex items-center justify-between gap-x-1 group text-sm font-medium cursor-pointer rounded-full py-0.5 px-1 ${
        active
          ? "text-white bg-brand-green-dark"
          : "text-gray-600 hover:text-white hover:bg-brand-green"
      }`}
      onClick={onClick}
    >
      <div>
        <CheckCircledIcon
          className={`text-white transition-all inline mr-2 group-hover:text-brand-green`}
        />
        <span className="capitalize">{title}</span>
      </div>
      <HelpTooltip
        className={`group-hover:text-white ${active ? "text-white" : "text-brand-green"}`}
      >
        <>
          <p className="text-left">{explanation}</p>
          <p className="text-gray-400 text-xs text-left pt-2">{`Data source: ${source}`}</p>
        </>
      </HelpTooltip>
    </button>
  )
}

function BaseMapOption({
  map,
  title,
  style,
  setBaseMapStyle,
  currentBaseMapStyle,
}: {
  map: mapboxgl.Map | null
  title: string
  style: BaseMapStyle
  setBaseMapStyle: Dispatch<SetStateAction<BaseMapStyle>>
  currentBaseMapStyle: BaseMapStyle
}) {
  return (
    <button
      className={`w-full transition-all flex items-center gap-x-1 group text-sm font-medium cursor-pointer rounded-full py-0.5 px-1 ${
        style === currentBaseMapStyle
          ? "text-white bg-brand-green-dark"
          : "text-gray-600 hover:bg-brand-green hover:text-white"
      }`}
      onClick={() => {
        map?.setStyle(style)
        setBaseMapStyle(style)
      }}
    >
      <svg className={`w-4 h-4 text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {title}
    </button>
  )
}
export const FacetsPanel = ({
  activeFacet,
  activeLayer,
  handleClose,
  setActiveFacet,
}: {
  activeFacet: Facet
  activeLayer: MapLayer
  handleClose: () => void
  setActiveFacet: (facet: Facet) => void
}) => {
  const facets = FACETS.filter((facet) => facet.layer === activeLayer).filter(
    (facet) => facet.isLayer
  )
  // Ensure that only facets with a defined category are displayed
  const facetsByCategory = groupBy(
    facets.filter((facet) => facet.category !== undefined),
    (facet) => facet.category
  )
  const map: mapboxgl.Map | null = useAtomValue(mapAtom)
  const [activeBaseLayer, setActiveBaseLayer] = useAtom(activeBaseLayerAtom)
  const [basemapStyle, setBaseMapStyle] = useState<BaseMapStyle>(MUTED_MAP_STYLE)
  useLayerFacets({ map, layer: activeLayer, facet: activeFacet })

  const handleLayerToggle = useCallback(
    (layerId: BaseLayer, layerOpacity: number) => {
      if (map) {
        if (layerId === activeBaseLayer) {
          toggleLayer({ map, layerId, layerOpacity })
          setActiveBaseLayer(null)
        } else if (activeBaseLayer) {
          toggleLayer({ map, layerId, layerOpacity })
          toggleLayer({ map, layerId: activeBaseLayer!, layerOpacity })
          setActiveBaseLayer(layerId)
        } else {
          toggleLayer({ map, layerId, layerOpacity })
          setActiveBaseLayer(layerId)
        }
      }
    },
    [map, activeBaseLayer]
  )

  return (
    <div className="w-full">
      <div className="px-4 py-2 w-full flex flex-row justify-between items-center border-b border-b-slate-300">
        <span className="font-medium">Layers</span>
        <Button Icon={ChevronLeftIcon} label="close" onClick={handleClose} />
      </div>

      {Object.keys(facetsByCategory).map((category) => (
        <section key={category} className="px-4">
          <div className="text-xs tracking-wide text-gray-700 uppercase font-semibold pb-1.5">
            {FACETS_CATEGORIES[category as FacetCategory]}
          </div>
          {facetsByCategory[category]?.map((facet) => (
            <FacetToggleButton
              key={facet.attr}
              facet={facet}
              onClick={() => setActiveFacet(facet)}
              active={facet.attr === activeFacet.attr}
            />
          ))}
        </section>
      ))}
      <div className="w-full px-4 py-2 border-t border-t-slate-300">
        <p className="text-xs tracking-wide text-gray-700 uppercase font-semibold pb-1.5">
          Base layers
        </p>
        {BASE_LAYERS.map((layer) => (
          <LayerToggleButton
            key={layer.id}
            title={layer.title}
            source={layer.dataSource}
            explanation={layer.explanation}
            onClick={() => handleLayerToggle(layer.id, layer.opacity)}
            active={layer.id === activeBaseLayer}
          />
        ))}
      </div>
      <div className="w-full px-4 py-2 border-t border-t-slate-300">
        <p className="text-xs tracking-wide text-gray-700 uppercase font-semibold pb-1.5">
          Base maps
        </p>
        <BaseMapOption
          map={map}
          title="Default"
          style={MUTED_MAP_STYLE}
          setBaseMapStyle={setBaseMapStyle}
          currentBaseMapStyle={basemapStyle}
        />
        <BaseMapOption
          map={map}
          title="Satellite"
          style={SATELLITE_MAP_STYLE}
          setBaseMapStyle={setBaseMapStyle}
          currentBaseMapStyle={basemapStyle}
        />
      </div>
    </div>
  )
}
