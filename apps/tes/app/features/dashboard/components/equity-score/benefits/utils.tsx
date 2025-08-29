export const split = (thresh: number) => (value: number, a: number | string, b: number | string) =>
  value >= thresh ? b : a
export const splitn = (thresh: number) => (value: number) =>
  value >= thresh ? value / thresh : value
export const splitByThousand = split(1000)
export const splitByThousandN = splitn(1000)
export const splitByMillion = split(1000000)
export const roundToNearest = (nearest: number, number: number) =>
  Math.round(number / nearest) * nearest
