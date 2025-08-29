import { atom } from "jotai"
import { BaseLayer } from "./map.constants"

export const mapAtom = atom<mapboxgl.Map | null>(null)
export const clickedFeatureAtom = atom<mapboxgl.MapboxGeoJSONFeature | null>(null)
export const hoveredFeatureAtom = atom<mapboxgl.MapboxGeoJSONFeature | null>(null)
export const mapZoomLevelAtom = atom<number | null>(null)
export const activeBaseLayerAtom = atom<BaseLayer | null>(null)
