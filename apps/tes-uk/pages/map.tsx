import Router from "next/router"
import { BlitzPage } from "@blitzjs/next"
import { useMediaQuery } from "@material-ui/core"

import { SidebarHeader } from "ui"

import Layout from "pages/_layout"
import { Map as TreeEquityScoreMap } from "app/features/map/map"
import { Sidebar } from "app/features/sidebar"
import GeoCoder from "app/features/sidebar/components/geocoder"
import { getAssetUrl } from "app/constants"

const Map: BlitzPage = () => {
  const handleHeaderLogoClick = () => Router.push("/")
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="min-h-screen sm:h-screen inset-0 flex flex-col sm:flex-row">
      {!isMobile && (
        <>
          <div className="flex flex-col overflow-y-auto sm:w-96 bg-[#FCFDFE] sm:border-r border-gray-400 sm:shadow-md transition-all">
            <SidebarHeader iconPath={getAssetUrl("tes-uk.svg")} onClick={handleHeaderLogoClick} />
            <GeoCoder />
            <Sidebar />
          </div>
          <TreeEquityScoreMap />
        </>
      )}

      {isMobile && (
        <>
          <div className="flex flex-col overflow-y-auto sm:w-96 bg-[#FCFDFE] sm:border-r border-gray-400 sm:shadow-md transition-all">
            <SidebarHeader iconPath={getAssetUrl("tes-uk.svg")} onClick={handleHeaderLogoClick} />
            <GeoCoder />
          </div>
          <TreeEquityScoreMap />
          <div className="h-full">
            <Sidebar />
          </div>
        </>
      )}
    </div>
  )
}

Map.suppressFirstRenderFlicker = true
Map.getLayout = (page) => <Layout title="Tree Equity Score UK Map">{page}</Layout>

export default Map
