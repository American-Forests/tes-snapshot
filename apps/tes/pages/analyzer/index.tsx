import Link from "next/link"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { useState } from "react"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import { Step, Scrollama } from "react-scrollama"
import { CITIES } from "app/features/regional-map/regional-map.constants"
import ChooseAnalyzer from "components/choose_analyzer"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

// sort cities alphabetically
CITIES.sort((a, b) => a.title.localeCompare(b.title))

function Benefit({ src, children }: { src: string; children: React.ReactNode }) {
  return (
    <div className="text-center bg-white rounded-lg flex align-center flex-col p-2 justify-center h-36">
      <img alt="" src={src} className="mx-auto mb-4 max-w-12 max-h-12" />
      <div className="text-xs uppercase tracking-wider font-bold text-gray-600 leading-tight">
        {children}
      </div>
    </div>
  )
}

const TesaHome: BlitzPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }: { data: number }) => {
    setCurrentStepIndex(data)
  }

  const stepData = [
    {
      url: "/tesa-exploremap_bg.png",
      heading: "Explore maps",
      subheading: "Uncover the hidden story behind where trees are in your community.",
      text: "Dive into user-friendly maps to peel back layers of rich spatial information down to the property level. Explore demographic data, assess environmental factors and land use, evaluate the potential for tree planting on individual properties, and view high-resolution tree canopy and satellite imagery. Discover valuable insights to increase your impact through tree planting and protection and guide engagement with residents.",
    },
    {
      url: "/tesa-evaluatedata_bg.png",
      heading: "Evaluate data",
      subheading: "Access local data to guide your tree planting and protection efforts.",
      text: "Easily evaluate and prioritize areas with the greatest need by using convenient mapping tools. Access valuable information to support planning, reporting and funding efforts. Tree Equity Score Analyzer puts data at your fingertips to help you maximize the positive effects of your tree initiatives.",
    },
    {
      url: "/tesa-buildscenarios_bg.png",
      heading: "Build scenarios",
      subheading: "Add your tree plantings, improve your score and see your impact.",
      text: "Reaching a Tree Equity Score of 100 may take several years of effort. User-friendly scenario building tools help you set achievable milestones and estimate the number of trees needed to reach your goals. Easily plan and track tree plantings and monitor your progress towards your goals. Find out how your tree plantings can positively transform the health and well-being of neighborhoods and communities.",
    },
    {
      url: "/tesa-measureimpact_bg.png",
      heading: "Communicate impact",
      subheading: "Effectively share your plans and accomplishments.",

      text: "Each time you create a new planting scenario, an auto-generated impact report computes a variety of useful data points to help you prove out the Tree Equity impacts of your project. Each report summarizes your goals and/or tree plantings, and calculates the estimated economic, health and environmental benefits contributed by the trees already present on site and the additional benefits contributed by your project.",
    },
  ]

  return (
    <div className="min-h-screen">
      <div
        className="bg-white"
        style={{
          backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/Parcel_Tree_Outlines_noROW_lite_gradient.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          imageRendering: "crisp-edges",
        }}
      >
        <Header />
        <div className="pt-20 grid lg:grid-cols-2">
          <div className="flex items-center lg:pl-[20%] pl-[10%] md:pr-0 pr-[10%]">
            <div>
              <p className="xl:text-[46px] lg:text-[40px] text-3xl md:leading-snug font-medium text-brand-green-dark pb-8">
                Tree Equity Score Analyzer provides human centered, deep-dive decision making for
                urban tree plantings.
              </p>
              <div>
                <ChooseAnalyzer
                  text="Explore a location&nbsp;"
                  className="bg-brand-green-dark text-white text-base font-bold uppercase rounded-full py-2 px-5"
                />
              </div>
            </div>
          </div>

          <div>
            <img
              alt="This is a picture of a laptop displaying the TESA application. On the left, there is a sidebar detailing block group data related to tree equity. On the right, there is a map with parcel and right-of-way geometries. Tree canopy outlines are also included in the map."
              loading="lazy"
              src="/TESA_LandingPage_LaptopCrop_md.png"
              className="mt-12 mb-6 lg:mt-0 lg:mb-0 lg:h-full lg:w-full lg:object-cover lg:object-left"
            />
          </div>
        </div>
        <div className="xl:w-1/2 lg:w-4/5 w-11/12 m-auto pt-40 pb-20">
          <div className="text-center text-gray-700 pt-8 pb-12">
            <p className="uppercase font-bold pb-5 tracking-wide text-brand-green-dark">
              Take the Deep Dive
            </p>
            <p className="text-3xl font-bold">
              American Forests developed the Tree Equity Score Analyzer for cities and states ready
              to bring Tree Equity to fruition, one city lot at a time.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: "url(/tes-banner-ltgreen.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        className="px-8 pt-32 pb-24 parallax"
      >
        <h2 className="lg:w-fit w-4/5 bg-white px-8 py-2 mx-auto rounded-md text-2xl text-brand-green-dark text-center font-bold">
          Tree Equity Score integrates data for all urban areas across the United States.
        </h2>
        <div className="py-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-5 max-w-5xl lg:mx-auto mx-10">
          <Benefit src="/icons/tree.svg">Tree canopy</Benefit>
          <Benefit src="/icons/buildingdensity.svg">Building density</Benefit>
          <Benefit src="/icons/income.svg">Income & Employment</Benefit>
          <Benefit src="/icons/race.svg">Race</Benefit>
          <Benefit src="/icons/temp.svg">Surface temperature</Benefit>
          <Benefit src="/icons/health.svg">Health</Benefit>
          <Benefit src="/icons/language.svg">Language</Benefit>
          <Benefit src="/icons/age.svg">Age</Benefit>
        </div>
      </div>
      <section className="bg-gradient-to-b from-white to-[#ECF5F2]">
        <div className="w-[90%] lg:w-1/2 m-auto text-center pt-40 pb-12">
          <p className="uppercase font-bold pb-5 tracking-wide text-brand-green-dark">
            Discover TESA
          </p>
          <h2 className="lg:pb-0 pb-10 text-3xl font-bold leading-snug text-gray-700">
            Find out where to plant trees to create the biggest impact.
          </h2>
        </div>
      </section>

      <section className="bg-[#ECF5F2]">
        <div className="lg:flex lg:justify-between lg:flex-row-reverse xl:w-5/6 md:w-11/12 w-full m-auto">
          <div
            className="sticky top-0 z-0 h-screen flex items-center justify-center lg:basis-1/2"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            <img alt="" loading="lazy" src={stepData[currentStepIndex]!.url} />
          </div>
          <div className="lg:basis-1/2 relative z-40" style={{ transform: "translate3d(0,0,0)" }}>
            <Scrollama offset={0.4} onStepEnter={onStepEnter}>
              {[0, 1, 2, 3].map((_, stepIndex) => (
                <Step data={stepIndex} key={stepIndex}>
                  <div className="h-screen flex items-center justify-center mx-8 xl:mx-0">
                    <div className="bg-white rounded-lg bg-opacity-95 shadow lg:bg-opacity-0 lg:shadow-none 2xl:p-8 lg:p-2 p-5">
                      <h2 className="font-medium text-brand-green-dark mb-4 lg:mb-8 xl:text-6xl lg:text-4xl text-3xl">
                        {stepData[stepIndex]!.heading}
                      </h2>
                      <p className="font-semibold text-gray-700 xl:text-2xl lg:text-xl text-base xl:leading-relaxed leading-relaxed pb-2">
                        {stepData[stepIndex]!.subheading}
                      </p>
                      <p className="font-medium text-gray-700 xl:text-xl lg:text-lg text-sm xl:leading-relaxed leading-relaxed">
                        {stepData[stepIndex]!.text}
                      </p>
                    </div>
                  </div>
                </Step>
              ))}
            </Scrollama>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-[#ECF5F2] to-white">
        <div className="py-32">
          <div className="w-11/12 px-8 mx-auto -mt-8 lg:px-0">
            <p className="pb-8 text-xl font-bold uppercase text-center">
              Explore available TESA applications
            </p>
            <div className="flex flex-row flex-wrap justify-around items-center space-y-4 space-x-3">
              {CITIES.filter((city) => city.id != "national").map(
                (city, i) => {
                  return (
                    <Link legacyBehavior key={i} href={Routes.LandingPage({ city: city.id })}>
                      <a className="h-56 w-[18rem] p-2 flex flex-col items-center hover:shadow-lg rounded-md hover:scale-[1.04] transition duration-200">
                        <img
                          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/tesa-${city.id}.png`}
                          alt=""
                          className=""
                        />

                        <p className="mt-2 text-center text-slate-700 font-bold">{city.title}</p>
                        <p className="text-center font-bold text-brand-green-dark">Explore</p>
                      </a>
                    </Link>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

TesaHome.suppressFirstRenderFlicker = true
TesaHome.getLayout = (page) => <Layout title="TESA Home">{page}</Layout>

export default TesaHome
