import { Blockgroup } from "db";
import { REPORT_SUBPATHS, REPORT_TYPES } from "./constants";
import { STATES_LOOKUP } from "app/constants";
import { ReportType } from "./types";
import { DASHBOARD_BASE_URL } from "../dashboard/dashboard.constants";

/**
 * Generates a URL for a given report type and identifier using predefined subpaths.
 *
 * @param {ReportType} reportType - The type of the report.
 * @param {string} id - The unique identifier for the report, which will be URL-encoded.
 * @returns {string} - The URL to access the report.
 */
export const getReportUrl = (reportType: ReportType, id: string): string => {
    const subpath = REPORT_SUBPATHS[reportType]
    return `${DASHBOARD_BASE_URL}/${subpath}/${encodeURIComponent(id)}`
  }

/**
 * Retrieves related report options based on the report type and a set of blockgroups.
 * For locality report types, it returns unique counties and states with their names and URLs.
 * For other report types, it returns the top 3 localities sorted by their tree equity scores.
 *
 * @param {Blockgroup[]} blockgroups - Array of blockgroup objects to process.
 * @param {ReportType} reportType - The type of report to generate options for.
 * @returns An array of objects containing name and href properties for the relevant report type.
 */
export const getRelatedReportOptionsByReportType = (
    blockgroups: Blockgroup[],
    reportType?: ReportType,
  ): { name: string; href: string; type: string }[ ] => {
    const locality = new Map<string, { name: string; href: string; type: string }>()
    const county = new Map<string, { name: string; href: string; type: string }>()
    const district = new Map<string, { name: string; href: string; type: string }>()
    const state = new Map<string, { name: string; href: string; type: string }>()

    if (!reportType) {
        blockgroups.forEach((bg) => {
            if (bg?.municipality_slug && bg?.incorporated_place_name) {
                locality.set(bg.municipality_slug, {
                  name: `${bg.incorporated_place_name}, ${bg.state}`,
                  href: getReportUrl(REPORT_TYPES.LOCALITY_REPORT_TYPE as ReportType, bg.municipality_slug),
                  type: 'common:locality',
                })
              }
            if (bg?.county && bg?.county_slug) {
              county.set(bg.county, {
                name: `${bg.county}, ${bg.state}`,
                href: getReportUrl(REPORT_TYPES.COUNTY_REPORT_TYPE as ReportType, bg.county_slug),
                type: 'common:county',
              })
            }
            if (bg?.congressional_district ) {
                district.set(bg.congressional_district, {
                  name: `${bg.congressional_district}`,
                  href: getReportUrl(REPORT_TYPES.DISTRICT_REPORT_TYPE as ReportType, bg.congressional_district),
                  type: 'common:district',
                })
              }
            if (bg?.state) {
              state.set(bg.state, {
                name: `State of ${STATES_LOOKUP[bg.state as keyof typeof STATES_LOOKUP]}`,
                href: getReportUrl(REPORT_TYPES.STATE_REPORT_TYPE as ReportType, bg.state),
                type: 'common:state',
              })
            }
          })

          const localities = Array.from(locality.values()).sort((a, b) => a.name.localeCompare(b.name))
          const counties = Array.from(county.values()).sort((a, b) => a.name.localeCompare(b.name))
          const districts = Array.from(district.values()).sort((a, b) => a.name.localeCompare(b.name))
          const states = Array.from(state.values()).sort((a, b) => a.name.localeCompare(b.name))
  
      return [...localities, ...counties, ...districts, ...states]
    }
    if (reportType === REPORT_TYPES.LOCALITY_REPORT_TYPE) {
      const county = new Map<string, { name: string; href: string; type: string }>()
      const state = new Map<string, { name: string; href: string; type: string }>()
  
      blockgroups.forEach((bg) => {
        if (bg?.county && bg?.county_slug) {
          county.set(bg.county, {
            name: `${bg.county}, ${bg.state}`,
            href: getReportUrl(REPORT_TYPES.COUNTY_REPORT_TYPE as ReportType, bg.county_slug),
            type: 'common:county',
          })
        }
        if (bg?.state) {
          state.set(bg.state, {
            name: `State of ${STATES_LOOKUP[bg.state as keyof typeof STATES_LOOKUP]}`,
            href: getReportUrl(REPORT_TYPES.STATE_REPORT_TYPE as ReportType, bg.state),
            type: 'common:state',
          })
        }
      })
  
      const counties = Array.from(county.values()).sort((a, b) => a.name.localeCompare(b.name))
      const states = Array.from(state.values()).sort((a, b) => a.name.localeCompare(b.name))
  
      return [...counties, ...states]
      
    } else {
      // Create a Map to store localities and their block group counts
      const localityBlockgroupCount = new Map<string, { name: string; href: string; count: number }>()
  
      // Count the number of block groups for each locality
      blockgroups.forEach((bg) => {
        if (bg?.municipality_slug && bg?.incorporated_place_name) {
          const key = bg.municipality_slug
          if (localityBlockgroupCount.has(key)) {
            localityBlockgroupCount.get(key)!.count++
          } else {
            localityBlockgroupCount.set(key, {
              name: `${bg.incorporated_place_name}, ${bg.state}`,
              href: getReportUrl(REPORT_TYPES.LOCALITY_REPORT_TYPE as ReportType, bg.municipality_slug),
              count: 1
            })
          }
        }
      })
  
      // Sort localities by block group count and get the top 3
      return Array.from(localityBlockgroupCount.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map(({ name, href }) => ({ name, href, type: 'common:locality' }))
    }
  }