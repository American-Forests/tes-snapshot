import Head from "next/head"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import { useContext } from "react"
import { styledButton2 } from "components/elements"
import { CityContext } from "app/features/regional-map/regional-map.state"
import DownloadOptionsDropdown from "components/download_options_dropdown"
import { updateText } from "app/utils/formatting_utils"
import { Routes } from "@blitzjs/next"
import Link from "next/link"

function Benefit({ src, children }: { src: string; children: React.ReactNode }) {
  return (
    <div className="text-center border-2 border-solid border-gray-100 bg-white rounded-xl flex align-center flex-col p-2 justify-center h-36">
      <img alt="" src={src} className="mx-auto mb-4 max-w-12 max-h-12" />
      <div className="text-xs uppercase tracking-wider font-bold text-gray-600 leading-tight">
        {children}
      </div>
    </div>
  )
}

export const LocationLandingPage = () => {
  const city = useContext(CityContext)!

  return (
    <div>
      <Head>
        <title>TESA {city?.shortTitle || ""}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Find your score and help create Tree Equity in cities and towns across America."
        />
      </Head>
      <div
        className="flex flex-col lg:mx-4 mx-0 lg:h-[98vh] h-screen"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left center",
          backgroundImage: `url(${
            city.landingPageBackground ? city.landingPageBackground : "/trees-home.jpg"
          })`,
        }}
      >
        <div className="bg-white">
          <Header />
        </div>
        <div className="flex flex-row items-center h-full pl-[10%]">
          <div className="text-gray-700 bg-white bg-opacity-[90%] rounded-xl xl:w-[50%] lg:w-3/4 w-11/12 lg:p-10 p-6 xl:space-y-4 space-y-1">
            <h1 className="font-medium leading-tight xl:text-5xl lg:text-4xl text-3xl">
              Tree Equity Score Analyzer
            </h1>
            <h1 className="font-bold leading-tight text-brand-green-dark lg:text-3xl text-2xl">
              {city.title}
            </h1>

            <p className="md:text-xl text-lg leading-snug pt-2">
              Discover how human-centered tree plantings can improve health and well-being in{" "}
              {city.shortTitle}'s {updateText("urban", city)} {updateText("neighborhood", city)}s.
            </p>
            <p className="xl:text-xl lg:text-lg text-base leading-normal xl:pt-2 pt-1 pb-3">
              Deep dive into the {city.shortTitle} Tree Equity Score Analyzer for{" "}
              {updateText("neighborhood", city)}- and property-level tools that can help you chart a
              course toward Tree Equity.
            </p>
            <div>
            <Link legacyBehavior href={Routes.Map({ city: city.id })}>
              <a
                className={`${styledButton2({
                  variant: "primary",
                  size: "sm",
                })} sm:text-lg text-base`}
              >
                Launch the app
              </a>
            </Link>
            </div>
          </div>
        </div>

        {city.photoCredit && (
          <div className="group">
            <div className="absolute opacity-75 left-[2%] bottom-[4%] z-[1000] bg-black w-6 h-6 rounded-full text-center text-white font-bold group-hover:bg-[#33966D] group-hover:duration-1000 group-hover:cursor-pointer">
              i
            </div>
            <div className="font-medium opacity-0 text-xs whitespace-nowrap w-fit bg-black text-white text-center rounded p-[5px] absolute z-1 bottom-[4%] left-[3%] ml-[20px] duration-1000 group-hover:opacity-100">
              Image: {city.photoCredit}
            </div>
          </div>
        )}
      </div>

      <div className="pt-32">
        <div className="grid md:grid-cols-2 gap-x-10">
          <div className="lg:pl-[20%] md:pl-[10%] pl-[5%] md:pr-0 pr-[5%]">
            <h2 className="text-4xl font-medium text-brand-green-dark xl:pt-[15%] pt-0 leading-tight">
              <span className="text-gray-700">Tree Equity </span>for {city.shortTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700 text-xl">
              Tree Equity is about prioritizing areas with the greatest need to fill gaps in tree
              cover, so that {city.shortTitle} residents can experience all the health, economic and
              other benefits that trees provide.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700 md:text-xl text-lg">
              The {city.shortTitle} Tree Equity Score Analyzer (TESA) is your free, map-based
              application to help you create a roadmap to shift your Tree Equity Scores.
            </p>
          </div>
          <div className="flex items-center py-4">
            <img alt="" loading="lazy" src="/TESA_LandingPage_LaptopCrop_md.png" />
          </div>
        </div>

        <div
          className="bg-white pt-40 pb-20"
          style={{
            backgroundImage: "url(/tes-footer-gradient.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges",
          }}
        >
          <h3 className="pt-4 font-bold text-2xl text-gray-700 text-center m-auto lg:w-1/2 w-11/12">
            Tree Equity Score evaluates data for all {updateText("urban", city)} areas in{" "}
            {city.shortTitle} to help prioritize areas with the greatest need.
          </h3>
          <div className="py-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-5 max-w-5xl lg:mx-auto mx-16">
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

        {/* <Link legacyBehavior href={Routes.Map({ city: city.id })}>
              <a className={`${styledButton2({ variant: "primary", size: "md" })} text-xl`}>
                Launch the app
              </a>
            </Link> */}
      </div>

      <div className="py-40 bg-gradient-to-b from-white to-[#ECF5F2]">
        <div className="max-w-5xl mx-auto lg:px-0">
          <h4 className="pb-4 text-4xl font-medium text-center text-brand-green-dark">
            How TESA works
          </h4>
          <p className="text-gray-700 text-xl text-center pb-6">
            Use Tree Equity Score and supplementary local data to identify{" "}
            {updateText("neighborhood", city)}s with the greatest need. Then dive deeper to the
            property level to discover how you can shift Tree Equity Scores through tree planting.
          </p>
          <div className="p-4 md:p-0 grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            <div className="flex flex-col items-center p-8 bg-white rounded-lg ring-1 ring-gray-200">
              <div className="pb-4 text-center">
                Use our interactive tools and data to explore your location.
              </div>
              <img src="/step1.svg" alt="" />
            </div>
            <div className="flex flex-col items-center p-8 bg-white rounded-lg ring-1 ring-gray-200">
              <div className="pb-4 text-center">
                Find out where to plant trees to create the biggest impact.
              </div>
              <img src="/step2.svg" alt="" />
            </div>
            <div className="flex flex-col items-center p-8 bg-white rounded-lg ring-1 ring-gray-200">
              <div className="pb-4 text-center">
                Create, save and share your tree planting scenario.
              </div>
              <img src="/step3.svg" alt="" />
            </div>
            <div className="flex flex-col items-center p-8 bg-white rounded-lg ring-1 ring-gray-200">
              <div className="pb-4 text-center">
                Use your findings to implement change in your community.
              </div>
              <img src="/step4.svg" alt="" />
            </div>
          </div>
          {/* non-US methods & glossary */}
          {city.methodsLinks && (
            <div className="text-center mt-8">
              <a
                className="sm:text-xl text-base text-white bg-brand-green hover:bg-brand-green-dark transition-all duration-500 rounded-full py-2 mr-7 px-12"
                href={city.methodsLinks[0]}
                target="blank_"
                rel="noreferrer noopener"
              >
                Methods
              </a>
              <a
                className="sm:text-xl text-base text-white bg-brand-green hover:bg-brand-green-dark transition-all duration-500 rounded-full py-2 px-6"
                href={city.methodsLinks[1]}
                target="blank_"
                rel="noreferrer noopener"
              >
                Data Glossary
              </a>
              {city.locale != "en-US" && (
                <DownloadOptionsDropdown
                  label={city.shortTitle}
                  s3key={`tesa_${city.id}`}
                  locale={city.locale}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="lg:py-20 py-5 bg-gradient-to-t from-white to-[#ECF5F2]">
        <div className="w-4/5 m-auto grid lg:grid-cols-2 grid-col-1 gap-x-20">
          <div className="space-y-4 py-2">
            <p className="text-3xl font-medium text-brand-green-dark">About the project</p>
            <p className="md:text-xl text-lg md:leading-normal leading-normal text-gray-700">
              The {city.shortTitle} Tree Equity Score Analyzer was launched in{" "}
              {city.releaseDate ? city.releaseDate : "Spring 2022"}. Every TESA is customized to
              support local decision-making needs. American Forests co-developed this tool with a
              team of dedicated {city.shortTitle} stakeholders composed of city{" "}
              {updateText("and state ", city)}
              government, non-profit environmental organizations and residents. The supplementary
              data incorporated into {city.shortTitle}'s TESA&mdash;for example,{" "}
              {city.supplementaryData}&mdash;represent factors that are most important to
              stakeholder council members and {city.shortTitle} residents when they make decisions
              about planting and protecting trees.
            </p>
            <p className="text-3xl font-medium text-brand-green-dark">Our Funders</p>
            <p className="sm:text-xl text-base text-white flex flex-wrap">
              {/* the following empty p tag prevents the first button from stretching vertically */}
              <p></p>
              <a
                className="bg-brand-orange-light hover:bg-brand-orange transition-all duration-500 rounded-full py-1 px-4 mr-4"
                href={city.funderLink}
                target="blank_"
                rel="noreferrer noopener"
              >
                {city.funder}
              </a>
            </p>
          </div>
          <div className="space-y-4 lg:py-2 py-6">
            <p className="text-3xl font-medium text-brand-green-dark">Our Partners</p>
            <div className="pt-1">
              <a
                className="sm:text-xl text-base text-white bg-brand-green hover:bg-brand-green-dark transition-all duration-500 rounded-full py-1 px-4"
                href={city.PrimaryPartnerLink}
                target="blank_"
                rel="noreferrer noopener"
              >
                {city.PrimaryPartner}
              </a>
              <p className="md:text-xl text-lg md:leading-relaxed leading-relaxed text-gray-700 pt-5">
                {city.partnerList}
              </p>
            </div>

            {/* this commented out section retains the styling that we will use for Strapi to replace the partners list with links */}
            {/* <p className="sm:text-xl text-base text-white flex flex-wrap space-y-4"> */}

            {/* the following empty p tag prevents the first button from stretching vertically */}
            {/*
              <p></p>
              <a
                className="bg-brand-green hover:bg-brand-green-dark transition-all duration-500 rounded-full py-1 px-4 mr-4"
                href="https://www.rva.gov/"
                target="blank_"
                rel="noreferrer noopener"
              >
                City of Richmond
              </a>
              <a
                className="bg-brand-green hover:bg-brand-green-dark transition-all duration-500 rounded-full py-1 px-4 mr-4"
                href="https://vacommunityvoice.org/"
                target="blank_"
                rel="noreferrer noopener"
              >
                Virginia Community Voice
              </a>
              <a
                className="bg-brand-green hover:bg-brand-green-dark transition-all duration-500 rounded-full py-1 px-4 mr-4"
                href="https://richmondtreestewards.org/"
                target="blank_"
                rel="noreferrer noopener"
              >
                Richmond Tree Stewards
              </a> */}
            {/* </p> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
