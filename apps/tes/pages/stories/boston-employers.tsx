import Layout from "app/core/layouts/Layout"
import Head from "next/head"
import { BlitzPage } from "@blitzjs/next"
import React from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import Maps from "app/features/stories-pages/boston-employers/maps"

const BostonEmployers: BlitzPage = () => {

  return (
    <div className="min-h-screen">
      <Head>
        <meta
          property="og:title"
          content="Boston Green Industry Employers"
          key="title"
        />
        <meta
          property="og:description"
          content=""
          key="description"
        />
        <meta
          property="og:url"
          content="https://treeequityscore.org/stories/boston-employers/"
          key="url"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <link rel="icon" href="/favicon.png" />
        {/* <link
          rel="preload"
          as="image"
          href={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/det_cover.jpg`}
        /> */}
      </Head>
      <Maps />
    </div>
  )
}

BostonEmployers.getLayout = (page) => (
  <Layout title={"Boston Green Industry Employers"}>{page}</Layout>
)
export default BostonEmployers
