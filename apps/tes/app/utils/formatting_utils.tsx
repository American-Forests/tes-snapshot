import { STATES_LOOKUP } from "app/constants"
import Hashids from "hashids"
import type { City } from "app/features/regional-map/regional-map.types"

const HASH_LENGTH = 8
const hashids = new Hashids("TESA hashing salt", HASH_LENGTH)

export function scenarioIdEncode(id: number): string {
  return hashids.encode(id)
}

export function scenarioIdDecode(hash: string | undefined) {
  if (!hash) return
  return hashids.decode(hash)[0] as number
}

export function dollarFormat(value: number) {
  const M = 1000000
  if (value >= M) {
    return `${(value / M).toLocaleString("en", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} million`
  }
  return value.toLocaleString("en", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

export function mFormat(value: number) {
  const M = 1000000000
  if (value >= M) {
    return (
      <>
        {Math.floor(value / M).toLocaleString("en")}
        <span className="ml-1">
          km<sup>3</sup>
        </span>
      </>
    )
  }
  return (
    <>
      {value.toLocaleString("en")}
      <span className="ml-1">
        m<sup>3</sup>
      </span>
    </>
  )
}

export function squareFeetFormat(value: number) {
  return (
    <span>
      {`${Math.floor(value).toLocaleString("en")} ft`}
      <sup>2</sup>
    </span>
  )
}

export function squareMetersFormat(value: number) {
  return (
    <span>
      {`${Math.floor(value).toLocaleString("en")} m`}
      <sup>2</sup>
    </span>
  )
}

/**
 * @param state_abbr
 * @returns full state name
 */
export const getFullStateNameFromAbbreviation = (state_abbr: string): string => {
  return new Map(Object.entries(STATES_LOOKUP)).get(state_abbr) as string
}

export function formatNumber(x: number): string {
  return new Intl.NumberFormat("en-us").format(Math.round(x))
}

export function roundToNearestThousand(value: number): string {
  return (Math.round(value / 1000) * 1000).toLocaleString("en")
}

export function localeWithDecimals(value: number): string {
  return value.toLocaleString("en", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

export const formatNumberWithPostfix = (num: number): string => {
  const numStr = num + ""
  const lastDigit = num % 10
  const secondLastDigit = num % 100

  if (secondLastDigit >= 11 && secondLastDigit <= 13) {
    return numStr + "th"
  }

  switch (lastDigit) {
    case 1:
      return numStr + "st"
    case 2:
      return numStr + "nd"
    case 3:
      return numStr + "rd"
    default:
      return numStr + "th"
  }
}

export function updateText(text: string, city: City) {
  if (city.id === "toronto") {
    text = text.replace(/neighborhood/g, "neighbourhood")
    text = text.replace(/urban/g, "")
    text = text.replace(/and state/g, "")
  }
  return text
}

export const formatCongressionalDistrictName = (name: string) => {
  const districtNumber = getDistrictNumber(name)
  if (districtNumber === 0) return name
  return formatNumberWithPostfix(districtNumber)
}

export const isValidNumber = (str: string) => {
  return !isNaN(parseFloat(str))
}

export const getDistrictNumber = (name: string) => {
  const nameSplit = name.split(" ")
  const districtNumber = nameSplit[nameSplit.length - 1]
  if (!isValidNumber(districtNumber ?? "")) return 0
  return parseInt(districtNumber!)
}
