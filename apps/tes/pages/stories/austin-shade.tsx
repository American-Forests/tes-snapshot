import Layout from "app/core/layouts/Layout"
import Head from "next/head"
import { BlitzPage } from "@blitzjs/next"
import { throttle } from "lodash"
import React, { useState, useEffect, useCallback } from "react"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import "mapbox-gl/dist/mapbox-gl.css"
import {
  austinCoverProps,
  austinSections,
  steps
} from "app/features/stories-pages/austin-shade/austin-shade-constants"
import CoverSection from "app/features/stories-pages/shared/cover-section"
import StickyNavbar from "app/features/stories-pages/shared/sticky-navbar"
import Maps from "app/features/stories-pages/austin-shade/maps"
import StoryContent from "app/features/stories-pages/austin-shade/story-content"
import Footer from "app/features/stories-pages/austin-shade/footer"
import SpecialFonts from "app/features/stories-pages/shared/special-fonts"

const AustinShadeStory: BlitzPage = () => {
  const [currentStepImage, setCurrentStepImage] = useState<string>("")

  const onStepEnter = useCallback(({ data }: { data: string | null }) => {
    setCurrentStepImage(data || "")
  }, [])

  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [activeStep, setActiveStep] = useState("")

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    setIsNavbarVisible(scrollPosition > 900)

    const sections = austinSections.reduce((ids: string[], section) => {
      if (section.activeIds) {
        return [...ids, ...section.activeIds]
      }
      return [...ids, section.id]
    }, [])

    let currentActiveSection = ""
    let currentActiveStep = ""

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const { top, bottom } = element.getBoundingClientRect()
        if (top <= window.innerHeight * 0.7 && bottom >= 0) {
          currentActiveSection = sectionId
        }
      }
    })

    steps.forEach((step) => {
      const element = document.getElementById(step)
      if (element) {
        const { top, bottom } = element.getBoundingClientRect()
        if (top <= window.innerHeight + 0.1 && bottom >= -0.1) {
          currentActiveStep = step
        }
      }
    })

    // Only set state if the values have changed
    if (currentActiveSection !== activeSection) {
      setActiveSection(currentActiveSection)
    }

    if (currentActiveStep !== activeStep) {
      setActiveStep(currentActiveStep)
    }
  }, [activeSection, activeStep])

  useEffect(() => {
    // Throttle the scroll event listener
    const handleScrollThrottled = throttle(handleScroll, 100)
    window.addEventListener("scroll", handleScrollThrottled)

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled)
    }
  }, [handleScroll])

  return (
    <div className="min-h-screen">
      <Head>
        <meta
          property="og:title"
          content="Austin, TX - School Routes Aren't the Coolest"
          key="title"
        />
        <meta
          property="og:description"
          content="How hot is your route to school? We analyzed shade along school walking routes in Austin to find out."
          key="description"
        />
        <meta
          property="og:url"
          content="https://treeequityscore.org/stories/austin-shade/"
          key="url"
        />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" 
        />

        <link rel="icon" href="/favicon.png" />
        <link
          rel="preload"
          as="image"
          href={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/aus_cover_img.jpg`}
        />
      </Head>
      <SpecialFonts />
      <div className="bg-black" style={{ fontFamily: 'GT Walsheim, sans-serif' }}>
        <CoverSection {...austinCoverProps} />
        <StickyNavbar 
          sections={austinSections}
          activeSection={activeSection}
          isVisible={isNavbarVisible}
          activeColor="#EBA9E4"
        />
        <Maps activeStep={activeStep} />
        <StoryContent onStepEnter={onStepEnter} currentStepImage={currentStepImage} />
        <Footer />
      </div>
    </div>
  )
}

AustinShadeStory.getLayout = (page) => (
  <Layout title={"Austin, TX - School Routes Aren't the Coolest"}>{page}</Layout>
)
export default AustinShadeStory