import { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"

export type MapboxGeoCoderParams = {
  access_token: string
  country?: string
  proximity?: string
  types?: string
  bbox?: string
}

export type MapboxGeoCoderResult = {
  place_name: string
  place_type: string
  center: mapboxgl.LngLatLike
}

export const useMapboxGeoCoder = ({
  query,
  params,
}: {
  query: string
  params: MapboxGeoCoderParams
}) => {
  const paramString = new URLSearchParams(params).toString()
  const [geoCoderResults, setGeoCoderResults] = useState<
    MapboxGeoCoderResult[] | null
  >(null)
  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?${paramString}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res && res.features && res.features.length > 0) {
          /**
           * the response object is described here: https://docs.mapbox.com/api/search/geocoding/#geocoding-response-object
           * can't find a type for it, so we'll just cast it to any
           */
          const features = res.features as any[]
          /**
           * we don't need the full response object, so we'll just return the place_name, place_type, and center.
           * also, taking just a few properties to allow us to type the response
           */
          const mapboxGeoCoderResults: MapboxGeoCoderResult[] = features.map(
            (feature) => ({
              place_name: feature.place_name,
              place_type: feature.place_type,
              center: feature.center,
            })
          )
          setGeoCoderResults(mapboxGeoCoderResults)
        }
      })
  }, [query])

  return geoCoderResults
}
