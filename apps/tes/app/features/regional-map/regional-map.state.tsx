import { useParam } from "@blitzjs/next"
import { createContext } from "react"
import { CITIES } from "./regional-map.constants"
import { City } from "./regional-map.types"

export const MapContext = createContext<mapboxgl.Map | null>(null)
export const CityContext = createContext<City | null>(null)

export function WithCity({ children }: { children: React.ReactNode }) {
  const cityId = String(useParam("city"))

  const cityConfig = CITIES.find((city) => city.id === cityId)

  /**
   * This will happen if this page server-side renders!
   */
  if (!cityConfig) {
    return null
  }

  return <CityContext.Provider value={cityConfig}>{children}</CityContext.Provider>
}

