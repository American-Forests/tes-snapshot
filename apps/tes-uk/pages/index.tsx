import Head from "next/head"
import Link from "next/link"
import { Routes, BlitzPage } from "@blitzjs/next"
import Layout from "pages/_layout"
import Header from "app/features/home-page/header"
import Footer from "app/features/home-page/footer"
import Tabs from "app/features/home-page/tabs"
import Logos from "app/features/home-page/logos"
import { getAssetUrl } from "app/constants"
import { HOW_IT_WORKS, ABOUT, CONTRIBUTORS } from "app/features/home-page/home-page.constants"

function Benefit({ src, children }: { src: string; children: React.ReactNode }) {
  return (
    <div className="text-center flex align-center flex-col p-2 justify-center xl:h-36 h-20">
      <img alt="" src={getAssetUrl(src)} className="mx-auto mb-4 max-w-12 max-h-12" />
      <div className="text-xs uppercase tracking-wider font-bold leading-tight text-center text-gray-700">
        {children}
      </div>
    </div>
  )
}

const Home: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Tree Equity Score UK</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Find your score and help create Tree Equity in cities and towns across the UK."
        />
      </Head>
      <div>
        <div className="bg-white">
          <Header />
        </div>
        <div
          className="flex flex-col lg:mx-4 mx-0 lg:h-[90vh] h-screen"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: `url(${getAssetUrl("tes-uk-hero-crop.jpg")})`,
          }}
        >
          <div className="flex flex-col justify-center text-center lg:pt-[28vh] pt-0 h-full md:w-full w-11/12 m-auto lg:leading-[58px] md:leading-[50px] leading-[38px] text-white">
            <h1 className="text-[46px] md:text-[64px] lg:text-[74px] font-bold leading-none [text-shadow:_0_0px_15px_rgb(0_0_0_/_60%)]">
              Tree Equity Score UK
            </h1>
            <h1 className="lg:pt-6 pt-2 text-base md:text-lg lg:text-xl font-extrabold tracking-widest md:tracking-widest lg:tracking-widest [text-shadow:_0_0px_15px_rgb(0_0_0_/_80%)]">
              ENGLAND · SCOTLAND · WALES · NORTHERN IRELAND
            </h1>
            <h1 className="pt-10 lg:text-2xl text-lg font-bold tracking-wider leading-tight [text-shadow:_0_0px_15px_rgb(0_0_0_/_80%)]">
              Help create Tree Equity in towns and cities across the UK.
            </h1>
            <div className="pt-2">
              <Link legacyBehavior href={Routes.Map()}>
                <a className="inline-block text-sm font-bold tracking-wider text-white uppercase rounded-full bg-uk-green hover:bg-brand-green-dark py-2.5 px-6">
                  Find your Tree Equity Score
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:pt-32 lg:pt-24 pt-16">
        <div className="grid md:grid-cols-2">
          <div className="xl:pl-[28%] md:pl-[10%] pl-[5%] md:pr-0 pr-[5%]">
            <h2 className="lg:text-5xl text-3xl font-medium text-uk-green xl:pt-[15%] lg:pt-[10%] pt-0 leading-tight">
              Discover <br />
              <span className="text-gray-700">Tree Equity Score UK</span>
            </h2>
            <p className="xl:mt-8 mt-4 leading-relaxed text-gray-700 lg:text-xl text-sm font-semibold xl:pb-12 pb-6">
              Trees are essential to public health and wellbeing, yet not everyone has good access
              to trees and their benefits where they live. Tree Equity Score UK is a map-based
              application that was created to help address disparities in urban tree distribution by
              identifying the areas in greatest need of people-focused investment in trees.
            </p>
            <Logos />
          </div>
          <div className="flex items-center py-4">
            <img
              alt="This is a picture of a laptop displaying the Tree Equity Score UK National Explorer application. On the left, there is a sidebar detailing data related to tree equity. On the right, there is a map showing Tree Equity Scores."
              loading="lazy"
              src={getAssetUrl("UKTES_Half_Laptop.png")}
              className="mt-12 mb-6 lg:mt-0 lg:mb-0 lg:h-full lg:w-full lg:object-cover lg:object-left"
            />
          </div>
        </div>
        <div
          className="bg-white xl:pt-40 lg:pt-32 pt-20 xl:pb-20 lg:pb-12 pb-6"
          style={{
            backgroundImage: `url(${getAssetUrl("tes-footer-gradient.jpg")})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges",
          }}
        >
          <h3 className="pt-4 font-bold xl:text-xl lg:text-lg text-base text-gray-700 text-center m-auto xl:w-1/2 w-11/12">
            Tree Equity Score UK combines information from a variety of sources to create a single
            measure from 0 to 100—the lower the score, the greater the need for investment.
          </h3>
          <div className="py-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-4 gap-y-5 max-w-5xl lg:mx-auto mx-16">
            <Benefit src="tree-canopy.svg">Tree canopy</Benefit>
            <Benefit src="income.svg">Income</Benefit>
            <Benefit src="health.svg">Health</Benefit>
            <Benefit src="employment.svg">Employment</Benefit>
            <Benefit src="age.svg">Age</Benefit>
            <Benefit src="temperature.svg">Heat</Benefit>
            <Benefit src="air-pollution.svg">Air pollution</Benefit>
          </div>
        </div>
      </div>
      <div className="items-center grid md:grid-cols-2 gap-x-10 py-20 xl:px-64 lg:px-10 px-5 text-white bg-gradient-to-b from-uk-green to-[#007965]">
        <div className="xl:pl-[15%] pl-[5%]">
          <h2 className="xl:text-5xl text-4xl font-normal xl:leading-tight pb-8">
            Change powered by science
          </h2>
          <Link legacyBehavior href={Routes.Map()}>
            <a className="inline-block md:text-base text-xs font-bold tracking-widest shadow border-2 border-white text-white uppercase hover:bg-brand-green py-2.5 px-6">
              View the map
            </a>
          </Link>
        </div>
        <div className="text-left pt-8 xl:text-xl lg:text-lg md:text-base text-sm font-normal xl:leading-normal md:pl-0 pl-[5%]">
          Urban communities require trees as essential infrastructure to support public health and
          climate resilience. Anyone can use UK Tree Equity Score to see whether the critical
          benefits of urban tree canopy cover are reaching those who need them
          most&#8212;communities in tree-poor neighbourhoods who are disproportionately affected by
          environmental hazards like extreme heat and pollution.
        </div>
      </div>

      <section className="bg-gradient-to-b from-[#E9FBF5] via-white to-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
          <div className="lg:col-span-2 md:pb-16 pb-8 md:pt-20 pt-10 md:w-4/5 w-full m-auto">
            <iframe
              src="https://www.youtube.com/embed/6l7mrdl5c7U?si=GpcB7LpRwtpaZasM"
              width="100%"
              height="500"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="xl:w-2/3 w-4/5 lg:m-0 m-auto">
            <p className="xl:text-6xl text-4xl font-medium text-gray-800 lg:pt-40 pt-0">
              Watch the Documentary
            </p>
            <p className="lg:text-lg text-base leading-relaxed text-gray-800 font-medium lg:pt-10 pt-3">
              Over 2 years in the making, Tree Equity Score UK is now available to towns and cities
              across England, Scotland, Wales and Northern Ireland.
            </p>
            <p className="lg:text-lg text-base leading-relaxed text-gray-800 font-medium lg:pt-10 pt-3">
              See how Tree Equity Score UK took shape in our new 5-minute documentary.
            </p>
          </div>
        </div>
      </section>
      <div className="bg-white h-20"></div>

      <div className="lg:pb-40 pb-20 origin-top-left bg-gradient-to-b from-white to-brand-gradient-ltblue px-8">
        <div className="max-w-5xl mx-auto lg:px-0 text-gray-800">
          <h4 className="pb-4 text-center text-base font-bold tracking-wider uppercase">
            How it works
          </h4>
          <p className="text-center lg:text-lg md:text-base text-sm font-semibold pb-8">
            Tree Equity Score is available to most urban areas in the UK. The score sets a national
            standard in each UK country to help make the case for investment in areas with the
            greatest need.
          </p>
          <div className="p-4 md:p-0 grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            {HOW_IT_WORKS.map((item, i) => {
              return (
                <div
                  className="flex flex-col items-center pt-8 px-6 bg-white rounded-lg ring-1 ring-gray-200"
                  key={i}
                >
                  <p className="text-center text-sm pb-4 font-semibold">{item.description}</p>
                  <img alt="" src={getAssetUrl(item.image)} className="mb-0 pb-8 sm:px-6 px-8" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div id="methods">
        <Tabs />
      </div>
      <div className="origin-top-left bg-gradient-to-b from-white to-brand-gradient-ltblue pt-8 text-left">
        <div className=" m-auto xl:w-2/3 lg:w-4/5 w-11/12 text-gray-800">
          <div className="pb-2 text-2xl font-semibold">About Tree Equity Score UK</div>
          <div className="pb-4 md:text-base text-sm font-medium">
            Tree Equity Score UK was launched in winter 2023. The tool was co-developed by American
            Forests, the Woodland Trust and the Centre for Sustainable Healthcare.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ABOUT.map((item, i) => {
              return (
                <div className="flex flex-col items-center" key={i}>
                  <div className="relative w-full">
                    <img className="w-full" alt="" src={getAssetUrl(item.image)} />
                  </div>
                  <p className="pt-4 md:text-sm text-xs font-medium">{item.description}</p>
                  <div className="w-full md:pt-3 pt-1 text-[#4EA6B6] hover:text-[#5CC9DD] text-xs font-semibold tracking-wide">
                    <Link legacyBehavior href={`${item.link}`}>
                      <a target="blank" rel="noreferrer noopener">
                        LEARN MORE
                      </a>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-2xl font-semibold pt-10 pb-4">Contributors</div>
          <div className="grid sm:grid-cols-6 grid-cols-3 xl:gap-x-6 xl:gap-y-6 gap-x-2 gap-y-2">
            {CONTRIBUTORS.map((item, i) => {
              return (
                <div className="flex flex-col items-center justify-center" key={i}>
                  <img alt="" src={getAssetUrl(item.logo)} />
                </div>
              )
            })}
          </div>
          <div className="pt-6 text-sm font-medium pb-16">
            <span className="font-semibold">Additional contributions: </span>
            Bristol Tree Forum, Croydon Climate Action, Future Woodlands Scotland, National Forest
            Company and The Mersey Forest.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
