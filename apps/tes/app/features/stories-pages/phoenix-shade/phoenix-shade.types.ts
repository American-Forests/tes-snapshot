export interface PopupContentProps {
  properties: PopupProperties
  timeColumn: string
}

export interface PopupInfo {
  longitude: number
  latitude: number
  properties: PopupProperties
}

export interface PopupProperties {
  _tot1200?: number
  _tot1500?: number
  _tot1800?: number
  _veg1200?: number
  _veg1500?: number
  _veg1800?: number
  _bld1200?: number
  _bld1500?: number
  _bld1800?: number
  PROPERTY_N?: string
  [key: string]: number | string | undefined
}