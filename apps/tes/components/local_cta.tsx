import { CityContext } from "app/features/regional-map/regional-map.state"
import { useContext } from "react"
import { H0 } from "./elements"

export function LocalCTA() {
  const city = useContext(CityContext)!
  return <H0>Help achieve tree equity in {city.title}</H0>
}
