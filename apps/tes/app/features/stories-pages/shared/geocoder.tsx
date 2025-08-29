import dynamic from 'next/dynamic'
import { GeocoderProps } from './types'
import { MAPBOX_TOKEN } from './constants'

// Dynamically import SearchBox with SSR disabled
const SearchBox = dynamic(
  () => import('@mapbox/search-js-react').then((mod) => mod.SearchBox),
  { ssr: false }
)

const darkTheme = {
  variables: {
    colorBackground: '#000000',
    colorBackgroundActive: '#444444',
    colorBackgroundHover: '#3a3a3a',
    colorText: '#ffffff'
  }
}

const Geocoder: React.FC<GeocoderProps> = ({
  viewport,
  setViewport,
  bbox,
  proximity,
  placeholder
}) => {
  if (typeof window === 'undefined') return null;

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-20 md:top-28 z-10">
      <div className="w-72 dark-searchbox">
        <SearchBox
          accessToken={MAPBOX_TOKEN}
          theme={darkTheme}
          placeholder={placeholder}
          options={{
            bbox,
            proximity,
            country: "US",
            types: "neighborhood, address, poi"
          }}
          onRetrieve={({ features }) => {
            if (features && features.length > 0) {
              const [lng, lat] = features[0].geometry.coordinates;
              setViewport({
                ...viewport,
                longitude: lng,
                latitude: lat,
                zoom: 15,
                padding: { top: 0, bottom: 0, left: 0, right: 0 }
              });
            }
          }}
        />
        {/* make sure white text comes through */}
        <style jsx global>{`
          .dark-searchbox input {
            color: #ffffff !important;
          }
          .dark-searchbox .mapbox-search-box-input {
            color: #ffffff !important;
          }
          /* For suggestions/results */
          .dark-searchbox .mapbox-search-box-suggestions {
            color: #ffffff !important;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Geocoder