export interface PopupContentProps {
  properties: PopupProperties
}

export interface PopupInfo {
  longitude: number
  latitude: number
  properties: PopupProperties
}

export interface PopupProperties {
  address?: string // address
  company?: string // company
  cov_area?: string // coverage area
  website?: string // website
  job_posts?: number // job postings
  job_title?: string // job title
  location?: string // location
  min_educat?: string // minimum education
  org_type?: string // organization type
  pctpoc?: number
  pctpov?: number
  unemplrate?: number
  place?: string
  tes?: number
  [key: string]: number | string | undefined
}