import Layout from "app/core/layouts/Layout"
import Head from "next/head"
import { BlitzPage } from "@blitzjs/next"
import { throttle } from "lodash"
import React, { useState, useEffect, useCallback } from "react"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import "mapbox-gl/dist/mapbox-gl.css"
import {
  detroitCoverProps,
  detroitSections,
  steps
} from "app/features/stories-pages/detroit-shade/detroit-shade-constants"
import CoverSection from "app/features/stories-pages/shared/cover-section"
import StickyNavbar from "app/features/stories-pages/shared/sticky-navbar"
import StoryContent from "app/features/stories-pages/detroit-shade/story-content"
import Footer from "app/features/stories-pages/detroit-shade/footer"
import Maps from "app/features/stories-pages/detroit-shade/maps"
import SpecialFonts from "app/features/stories-pages/shared/special-fonts"

const DetroitShadeStory: BlitzPage = () => {
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

    const sections = detroitSections.reduce((ids: string[], section) => {
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
          content="Detroit, MI - Heat Resilience Starts Here: Cooling Detroit's Bus Stops"
          key="title"
        />
        <meta
          property="og:description"
          content="Most public transit stops in Detroit are exposed to scorching heat in the summertime. State-of-the-art shade data can guide smart investments that improve walkability and make Detroit a cooler place to live and visit."
          key="description"
        />
        <meta
          property="og:url"
          content="https://treeequityscore.org/stories/detroit-shade/"
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
          href={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/det_cover.jpg`}
        />
      </Head>
      <SpecialFonts />
      <div className="bg-black" style={{ fontFamily: 'GT Walsheim, sans-serif' }}>
        <CoverSection {...detroitCoverProps} />
        <StickyNavbar 
          sections={detroitSections}
          activeSection={activeSection}
          isVisible={isNavbarVisible}
          activeColor="#FFBC2B"
        />
        <Maps activeStep={activeStep} />
        <StoryContent onStepEnter={onStepEnter} currentStepImage={currentStepImage} />
        <Footer />
      </div>
    </div>
  )
}

DetroitShadeStory.getLayout = (page) => (
  <Layout title={"Detroit, MI - Heat Resilience Starts Here: Cooling Detroit's Bus Stops"}>{page}</Layout>
)
export default DetroitShadeStory