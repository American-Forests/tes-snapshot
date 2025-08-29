export interface PopupContentProps {
  properties: PopupProperties
  activeStep: string
  timeColumn: string
}

export interface PopupInfo {
  longitude: number
  latitude: number
  properties: PopupProperties
}

export interface PopupProperties {
  tree_canop?: number
  cbg_pop?: number
  pctpov?: number
  pctpoc?: number
  _tot700?: number
  _tot900?: number
  _tot1200?: number
  _tot1600?: number
  _tot1800?: number
  _veg700?: number
  _veg900?: number
  _veg1200?: number
  _veg1600?: number
  _veg1800?: number
  _bld700?: number
  _bld900?: number
  _bld1200?: number
  _bld1600?: number
  _bld1800?: number
  NAME?: string
  STREET?: string
  [key: string]: number | string | undefined
}