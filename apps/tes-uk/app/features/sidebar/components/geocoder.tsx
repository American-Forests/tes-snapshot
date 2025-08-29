import { useQuery } from "@blitzjs/rpc"
import { useState, Suspense, Dispatch, SetStateAction } from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Combobox } from "@headlessui/react"
import getLocalityLikesBySearchQuery from "app/queries/get-locality-likes-by-search-query"
import { useAtomValue } from "jotai"
import { mapAtom } from "../../map/map.state"
import { MapboxGeoCoderParams, useMapboxGeoCoder } from "react-hooks"
import mapboxgl from "mapbox-gl"

type GeoCoderSearchResult = {
  name: string
  center: mapboxgl.LngLatLike
  zoom: number
  setMarker: boolean
  isLocality: boolean
}

const SearchResult = ({ item, key }: { item: GeoCoderSearchResult; key?: number }) => (
  <Combobox.Option value={item} key={key}>
    <div
      className={`px-3 py-2 text-sm text-left cursor-pointer  text-bold hover:bg-[#ECECEC] ${
        item.isLocality ? "text-brand-green-dark" : "text-[#5A5A5A]"
      }`}
    >
      {item.name}
    </div>
  </Combobox.Option>
)

/**
 * @param query: the search query
 * @param mapCenter: Optional, the center of the map, used to filter the mapbox geocoder results
 * @returns
 */
const GeoCoderResults = ({ query, mapCenter }: { query: string; mapCenter?: mapboxgl.LngLat }) => {
  const [localities] = useQuery(
    getLocalityLikesBySearchQuery,
    { query },
    { enabled: query.length > 0 }
  )
  const mapboxGeoCoderParams: MapboxGeoCoderParams = {
    access_token: process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN!,
    country: "gb",
    types: "poi,address,neighborhood,locality,place,postcode",
    proximity: mapCenter && `${mapCenter.lng},${mapCenter.lat}`,
  }

  const mapboxGeocoderResults = useMapboxGeoCoder({ query, params: mapboxGeoCoderParams })

  return (
    <div className="bg-white border-b">
      <Combobox.Options>
        {localities &&
          localities.map((locality, i) => (
            <SearchResult
              key={i}
              item={{ ...locality, zoom: 9, isLocality: true, setMarker: false }}
            />
          ))}
        {mapboxGeocoderResults &&
          mapboxGeocoderResults.map((item, i) => (
            <SearchResult
              key={i}
              item={{
                ...item,
                name: item.place_name,
                zoom: 13,
                isLocality: false,
                setMarker: item.place_type.includes("address") || item.place_type.includes("poi"),
              }}
            />
          ))}
      </Combobox.Options>

      {!localities && !mapboxGeocoderResults && query.length > 0 && (
        <p className="text-gray-500 font-semibold p-4">No results found.</p>
      )}
    </div>
  )
}

const handleOnChange = ({
  item,
  map,
  setQuery,
  marker,
  setMarker,
  setHasUsedGeoCoder,
  setSelectedSearchResult,
}: {
  item: GeoCoderSearchResult | null
  map: mapboxgl.Map | null
  setQuery: Dispatch<SetStateAction<string>>
  marker: mapboxgl.Marker | null
  setMarker: Dispatch<SetStateAction<mapboxgl.Marker | null>>
  setHasUsedGeoCoder: Dispatch<SetStateAction<boolean>>
  setSelectedSearchResult: Dispatch<SetStateAction<GeoCoderSearchResult | null>>
}) => {
  /**
   * remove marker if it exists and a new item is selected
   */
  if (marker) {
    marker.remove()
    setMarker(null)
  }

  /**
   * set marker if item.setMarker is true
   */
  if (map && item && item.setMarker) {
    const newMarker = new mapboxgl.Marker()
    newMarker.setLngLat(item.center).addTo(map)
    setMarker(newMarker)
  }

  /**
   * fly to the center of the item
   */
  if (map && item) {
    map.flyTo({
      center: item.center,
      zoom: item.zoom,
    })
  }

  setQuery("")
  setSelectedSearchResult(item)
  setHasUsedGeoCoder(true)
}

const GeoCoder = () => {
  const [query, setQuery] = useState<string>("")
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setHasUsedGeoCoder] = useState<boolean>(false)
  const [selectedSearchResult, setSelectedSearchResult] = useState<GeoCoderSearchResult | null>(
    null
  )
  const map = useAtomValue(mapAtom)

  return (
    <div className="divide-gray-300 text-sm">
      <Combobox
        value={selectedSearchResult}
        onChange={(item) => {
          handleOnChange({
            item,
            map,
            setQuery,
            marker,
            setMarker,
            setHasUsedGeoCoder,
            setSelectedSearchResult,
          })
        }}
      >
        <div className="relative">
          <Combobox.Input
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            placeholder="Search for a location"
            id="search-geocoder"
            aria-label="Search"
            className="px-4 py-3
          text-black
          block w-full
          text-md
          bg-gray-100
          border-none
          ring-0"
          ></Combobox.Input>
          <MagnifyingGlassIcon className="w-6 h-6 absolute right-3 top-3 text-gray-400 pointer-events-none" />
        </div>
        <Suspense fallback={null}>
          <GeoCoderResults query={query} mapCenter={map?.getCenter()} />
        </Suspense>
      </Combobox>
    </div>
  )
}

export default GeoCoder
