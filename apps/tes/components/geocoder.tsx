import React, { Suspense, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import { City } from "app/features/regional-map/regional-map.types"
import { ACCESS_TOKEN } from "hooks/use_map"
import { Combobox } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useQuery } from "@blitzjs/rpc"
// import getLocationEnvelope from "app/municipalities/queries/getLocationEnvelope"
import getMunicipalities from "app/municipalities/queries/getMunicipalities"
import { useSetAtom } from "jotai"
import { hasUsedGeocoderAtom } from "app/state"
import { Municipality } from "db"
import { useTranslation } from "react-i18next"
export type MapboxGeoCoderResult = {
  place_name: string
  place_type: string
  center: mapboxgl.LngLatLike
}
function GeoCoderResults(props: {
  mapboxGeocoderResults: MapboxGeoCoderResult[]
  municipalitySearchQuery: string
  cityId: string
}) {
  const { mapboxGeocoderResults, municipalitySearchQuery, cityId } = props

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [municipalities]: any = useQuery(
    getMunicipalities,
    { query: municipalitySearchQuery },
    { enabled: cityId === "national" && municipalitySearchQuery.length > 0 }
  )

  return (
    <Combobox.Options className="bg-white">
      {cityId === "national" &&
        municipalities?.map((item: Municipality, i: number) => (
          <Combobox.Option value={{ ...item, optionType: "municipality" }} key={i}>
            <div className="px-3 py-2 text-sm text-left cursor-pointer text-brand-green-dark text-bold hover:bg-[#ECECEC]">
              {item.incorporated_place_name}, {item.state.toUpperCase()}
            </div>
          </Combobox.Option>
        ))}
      {mapboxGeocoderResults.map((item, i) => (
        <Combobox.Option value={{ ...item, optionType: "mapbox_geocoder_result" }} key={i}>
          {({ active }) => {
            return (
              <div
                className={`
            px-3 py-2
            text-sm text-left
            cursor-pointer
            text-[#5A5A5A] ${active ? "bg-[#ECECEC]" : "hover:bg-[#ECECEC]"}`}
              >
                {item.place_name}
              </div>
            )
          }}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  )
}

export default function GeoCoder(props: { map: mapboxgl.Map | null; city: City }) {
  const { t } = useTranslation(["map"])
  const { map, city } = props
  const [query, setQuery] = useState<string>("")
  const [list, setList] = useState<MapboxGeoCoderResult[]>([])
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null)
  const setHasUsedGeocoder = useSetAtom(hasUsedGeocoderAtom)

  // const [envelope] = useQuery(
  //   getLocationEnvelope,
  //   { city: city.id.toUpperCase() },
  //   { enabled: city.id !== "national" },
  // )

  useEffect(() => {
    if (!query) return
    if (!map) return

    const mapCenter = map.getCenter()
    const centerPoint =
      city.id === "national" ? `${mapCenter.lng},${mapCenter.lat}` : city.centerpoint
    const params = {
      access_token: ACCESS_TOKEN,
      country: city.id === "toronto" ? "CA" : "US",
      proximity: centerPoint,
      types: `address,poi,locality,neighborhood,postcode${city.id !== "national" ? ",place" : ""}`,
      // bbox: city.id !== "national" && envelope ? envelope.join(",") : "",
    }
    const queryString = new URLSearchParams(params).toString()
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query + `${city.id === "national" ? "" : " " + city.geocoderPostfix}`
      )}.json?${queryString}`
    )
      .then((res) => res.json())
      .then((res) => {
        setList(res.features)
      })
    // }, [setList, query, city, envelope])
  }, [setList, query, city])

  return (
    <div className="divide-gray-300 text-sm">
      <Combobox
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value={null as any}
        onChange={(item) => {
          setHasUsedGeocoder(true)

          // remove marker if new item is selected
          if (marker) marker.remove()

          // add marker to map if item is a mapbox query and is an address or poi
          if (
            item &&
            item.optionType === "mapbox_geocoder_result" &&
            (item.place_type.includes("address") || item.place_type.includes("poi"))
          ) {
            const myMarker = new mapboxgl.Marker().setLngLat(item.center).addTo(map as mapboxgl.Map)

            setMarker(myMarker)
          }

          if (item) {
            if (item.bbox) {
              map?.fitBounds(item.bbox)
            } else {
              map?.flyTo({
                center: item.center,
                zoom: item.option_type === "mapbox_geocoder_result" ? 13 : 9,
              })
            }

            setQuery("")
            setList([])
          }
        }}
      >
        <div className="relative">
          <Combobox.Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            placeholder={t("map:search_placeholder")}
            id="search-geocoder"
            aria-label="Search"
            className="px-4 py-3
          text-black
          block w-full
          text-md
          bg-gray-100
          border-none
          ring-0"
          />
          <MagnifyingGlassIcon className="w-6 h-6 absolute right-3 top-3 text-gray-400 pointer-events-none" />
        </div>
        <Suspense fallback={null}>
          <GeoCoderResults
            mapboxGeocoderResults={list}
            municipalitySearchQuery={query}
            cityId={city.id}
          />
        </Suspense>
      </Combobox>
    </div>
  )
}
