import Head from "next/head"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { useRouter } from "next/router"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons"
import { useEffect, useRef } from "react"
import {
  TES_NATIONAL_EXPLORER_CONTACT_LINK,
  PARTNER_WITH_AF_LINK,
  TAKE_ACTION_LINK,
  AF_CAREER_RESOURCES_LINK,
  TES_NATIONAL_EXPLORER_STORIES_LINK,
  TES_NATIONAL_EXPLORER_RESOURCES_LINK,
} from "app/constants"
import { clearMapPositionSessionStorage } from "hooks/use_map"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { useVideo } from "hooks/use_video"
import { useTranslation } from "react-i18next"
import { I18nReleaseBanner } from "app/features/dashboard/components/release-banner"
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })

function Benefit({ src, children }: { src: string; children: React.ReactNode }) {
  return (
    <div className="text-center m-auto">
      <img alt="" src={src} className="m-auto max-w-10 max-h-10" />
      <div className="pt-2 text-xs uppercase tracking-wider font-bold text-gray-700 leading-tight">
        {children}
      </div>
    </div>
  )
}

const featured = [
  {
    image: "/icons/ne-ln.png",
    name: "National Explorer",
    desc: "Explore our flagship national map. Find your score today and help create Tree Equity.",
    link: "/map",
  },
  {
    image: "/icons/tesa-ln.png",
    name: "Local Analyzers",
    desc: "Learn about the Tree Equity Score Analyzer, our local, deep-dive application.",
    link: "/analyzer",
  },
  {
    image: "/icons/resources-ln.png",
    name: "Starter Guide",
    desc: "Take the next steps. Explore our step-by-step guides, watch a demo, and browse resources.",
    link: TES_NATIONAL_EXPLORER_RESOURCES_LINK,
  },
  {
    image: "/icons/stories-ln.png",
    name: "Stories",
    desc: "Delve into Tree Equity storytelling, maps and data visualizations.",
    link: TES_NATIONAL_EXPLORER_STORIES_LINK,
  },
] as const

const action = [
  {
    image:
      "https://links.imagerelay.com/cdn/3910/ql/a8148930e3d440e3aff3ac218eb52660/woman-with-megaphone.jpg",
    name: "Take action today",
    link: TAKE_ACTION_LINK,
  },
  {
    image: "/detroit_cokko_swain_sm.jpg",
    name: "Partner with us",
    link: PARTNER_WITH_AF_LINK,
  },
  {
    image:
      "https://links.imagerelay.com/cdn/3910/ql/6d344b56862f47f9921f9c13d6462aa6/ForestryPhoto--30-of-99-.jpg",
    name: "Forestry careers",
    link: AF_CAREER_RESOURCES_LINK,
  },
  {
    image:
      "https://links.imagerelay.com/cdn/3910/ql/d57a1cfd8cc04bcd95d0fd2414d1a76c/Weyerhaeuser-Ruston-LA-planting-60.JPG.jpg.JPG",
    name: "Contact us",
    link: TES_NATIONAL_EXPLORER_CONTACT_LINK,
  },
] as const

/*
 * https://unsplash.com/photos/MTeZ5FmCGCU
 *
 * https://unsplash.com/photos/UTuWr_s0LrM
 */
function TesHome() {
  const pathname = typeof window !== "undefined" && window.location.pathname
  const video = useRef<HTMLVideoElement>(null)
  const { toggleVideoPlay, isPlaying } = useVideo(video)
  const router = useRouter()
  const { i18n } = useTranslation()
  useEffect(() => {
    if (pathname && pathname !== "/") {
      router.replace(pathname) // Redirect to the right page...
    }
  }, [pathname])

  if (pathname && pathname !== "/") return null

  useEffect(() => {
    if (i18n?.language !== "en") {
      i18n?.changeLanguage("en")
    }
  }, [i18n])

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Find your score and help create Tree Equity in cities and towns across America."
        />
        <meta
          property="og:image"
          content={`${STATIC_ASSETS_CLOUDFRONT_URL}/hero_video_still.jpg`}
          key="image"
        />
      </Head>
      <div className="bg-white">
        <Header />
      </div>
      <I18nReleaseBanner lng="en"/> 
      <section className="relative lg:h-[66rem] md:h-[60rem] h-[78rem]">
        <video
          id="hero-video"
          className="hidden md:block absolute top-100 left-0 w-full lg:h-5/6 md:h-3/5 object-cover z-[-1] aspect-[1280/720]"
          loop
          autoPlay
          playsInline
          muted
          ref={video}
          src="https://d17m5nraxo9zm6.cloudfront.net/hero-video.webm"
          poster="https://d17m5nraxo9zm6.cloudfront.net/hero_video_still.jpg"
        ></video>
        <button
          onClick={toggleVideoPlay}
          className="hidden md:flex border w-6 h-6 border-white text-white rounded-full absolute top-4 right-4 z-10 justify-center items-center"
        >
          {!isPlaying && <PlayIcon />}
          {isPlaying && <PauseIcon />}
        </button>
        <img
          src="https://d17m5nraxo9zm6.cloudfront.net/hero_video_still.jpg"
          className="md:hidden block absolute top-100 left-0 w-full h-5/6 object-cover z-[-1]"
        />
        <div className="lg:pt-[7%] md:pt-[5%] sm:pt-[6%] pt-[10%] xl:w-2/3 w-11/12 m-auto h-[100vh]">
          <h1 className="xl:w-3/5 lg:w-3/5 w-full text-[32px] md:text-[46px] lg:text-[52px] lg:leading-[58px] md:leading-[50px] leading-[38px] font-bold text-white [text-shadow:_0_1px_10px_rgb(0_0_0_/_80%)]">
            Help create Tree Equity in cities and towns across America.
          </h1>
          <div className="pt-6">
            <button
              onClick={() => {
                clearMapPositionSessionStorage()
                router.push(Routes.NationalExplorer())
              }}
            >
              <a
                target="blank"
                rel="noreferrer noopener"
                className="inline-block sm:text-base text-xs font-bold tracking-wider text-white uppercase rounded-full bg-brand-green-dark hover:bg-brand-green py-2.5 px-6"
              >
                Find your Tree Equity Score
              </a>
            </button>
          </div>
          <div
            style={{
              backgroundImage: "url(/Parcel_Tree_Outlines_noROW_lite_blue.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
            className="sm:pl-8 pl-4 mx-auto xl:mt-48 lg:mt-40 md:mt-36 mt-52"
          >
            <div className="w-11/12 m-auto text-gray-700 font-medium">
              <h2 className="pt-12 xl:text-[45px] lg:text-[40px] sm:text-4xl text-3xl lg:leading-tight pb-4 sm:pr-0 pr-20">
                Discover <span className="text-brand-green-dark">Tree Equity Score</span>
              </h2>
              <p className="md:text-lg text-sm md:font-semibold font-base sm:leading-normal sm:pr-8 pr-2 pb-12">
                Trees are critical urban infrastructure that are essential to public health and
                well-being. Tree Equity Score was created to help address damaging environmental
                inequities by prioritizing human-centered investment in areas with the greatest
                need.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 pb-16">
                {featured.map((item, i) => {
                  if (item.link === "/map")
                    return (
                      <a
                        className="border-b-[3px] hover:border-brand-green-dark border-transparent transition-all duration-200 pb-2 cursor-pointer"
                        key={i}
                        onClick={() => {
                          clearMapPositionSessionStorage()
                          router.push(Routes.NationalExplorer())
                        }}
                      >
                        <img alt="" src={item.image} className="h-14" />
                        <div>
                          <div className="lg:text-lg text-base font-bold pt-2">{item.name}</div>
                          <div className="lg:text-base text-sm pt-2">{item.desc}</div>
                        </div>
                      </a>
                    )
                  else
                    return (
                      <Link legacyBehavior key={i} href={`${item.link}`}>
                        <a className="border-b-[3px] hover:border-brand-green-dark border-transparent transition-all duration-200 pb-2">
                          <img alt="" src={item.image} className="h-14" />
                          <div>
                            <div className="lg:text-lg text-base font-bold pt-2">{item.name}</div>
                            <div className="lg:text-base text-sm pt-2">{item.desc}</div>
                          </div>
                        </a>
                      </Link>
                    )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="documentary" className="h-20"></div>
      <section className="bg-gradient-to-b from-[#222222] to-black">
        <img
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/campaign/stripe-left.svg`}
          className="h-32 md:block hidden"
        ></img>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
          <div className="lg:col-span-2 pb-16 md:pt-0 pt-10 md:-mt-12 mt-0 sm:w-4/5 w-11/12 m-auto">
            <iframe
              className=""
              height="560"
              width="315"
              src="https://www.youtube.com/embed/nOJtEMevtkQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-2/3 lg:m-0 m-auto">
            <img
              src={`${STATIC_ASSETS_CLOUDFRONT_URL}/campaign/mapping_path_logo_white_colorpop.png`}
              width="300px"
            />
            <p className="xl:text-lg text-base leading-relaxed text-white font-normal pt-6">
              In "Mapping the Path to Tree Equity," a short documentary by American Forests, follow
              Leandro's journey as he leads a community-driven movement in Providence, RI and uses
              Tree Equity Score to address unequal tree distribution.
            </p>
            <p className="h-16"></p>
          </div>
        </div>

        <img
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/campaign/stripe-right.svg`}
          className="float-right -mt-[114px] h-28 md:block hidden"
        ></img>
      </section>

      <div className="bg-gradient-to-b from-white to-[#ECF5F2] text-gray-700 font-medium">
        <div className="h-40"></div>
        <div className="w-3/5 m-auto">
          <h2 className="sm:text-4xl text-2xl text-center text-brand-green-dark">
            Change powered by science
          </h2>
          <p className="pt-4 sm:text-xl text-lg text-center">
            Anyone can use Tree Equity Score to chart a course of action. Join the movement to
            advance Tree Equity in urban communities nationwide and contribute to creating greener,
            safer and more resilient cities.
          </p>
        </div>
      </div>
      <div className="bg-[#ECF5F2] text-gray-700 font-medium">
        <div className="lg:h-10 h-32"></div>
        <div className="xl:w-5/6 lg:w-11/12 md:w-5/6 w-11/12 m-auto">
          <div className="grid lg:flex items-center">
            <img alt="" loading="lazy" src="/NE_Laptop.png" className="lg:w-3/5 m-auto" />
            <div>
              <p className="leading-normal text-base md:pr-[5%] md:pt-0 pt-5 lg:pl-0 pl-[5%]">
                Tree Equity Score measures how well the critical benefits of urban tree canopy are
                reaching those who need them most. The score establishes an equity-first standard to
                guide investment in communities living on low incomes, communities of color and all
                those disproportionately affected by extreme heat, pollution and other environmental
                hazards.
              </p>
              <h2 className="text-base font-bold py-4 md:pr-[5%] lg:pl-0 pl-[5%]">
                Tree Equity Score combines information from a variety of sources to create a single
                measure from 0 to 100. The lower the score, the greater the need for investment.
              </h2>
              <div className="xl:w-11/12 lg:w-full w-4/5 lg:m-0 m-auto py-4 px-4 grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-5">
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
          </div>
        </div>
        <div className="h-24"></div>
      </div>

      <section
        className="bg-[#ECF5F2]"
        style={{
          backgroundImage: "url(/Parcel_Tree_Outlines_noROW_lite_grey_thin.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          imageRendering: "crisp-edges",
        }}
      >
        <div className="h-32"></div>
        <div className="text-center">
          <p className="uppercase font-bold pb-2 tracking-wide text-brand-green-dark">
            Meet the apps
          </p>
          <p className="font-medium sm:text-4xl text-2xl text-gray-700">
            Our Tree Equity Score Products
          </p>
        </div>

        <div className="h-20"></div>
        <div className="2xl:w-2/3 xl:w-4/5 w-11/12 m-auto">
          <div className="grid md:grid-cols-2">
            <div className="content-center bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.1)] p-8 sm:mb-10">
              <h3 className="pb-4 md:text-lg text-gray-700 uppercase text-base font-medium text-center">
                Tree Equity Score
                <span className="text-brand-green-dark font-bold"> National Explorer</span>
              </h3>
              <img alt="" loading="lazy" src="/AppsComp_NE.png" />
              <div className="pt-4 text-left font-medium lg:text-base text-gray-700 text-sm">
                Our flagship tool makes Tree Equity Score available to all urban areas in the United
                States. Tree Equity Score sets a national standard to help make the case for
                investment in areas with the greatest need.
                <ul className="list-disc pl-10 pt-4">
                  <li>Find your score among all urban neighborhoods in the United States.</li>
                  <li>
                    Locate data to inform and support equity-first tree planting and investment.
                  </li>
                  <li>
                    Explore municipal and regional targets and communicate the benefit to the
                    community.
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  clearMapPositionSessionStorage()
                  router.push(Routes.NationalExplorer())
                }}
              >
                <a className="mt-6 inline-block mb-8 text-sm font-semibold text-white uppercase rounded-full bg-brand-green py-2.5 hover:bg-brand-green-dark transition px-5 tracking-wider">
                  Start Exploring
                </a>
              </button>
            </div>
            <div className="content-center bg-brand-green shadow-[0px_0px_20px_rgba(0,0,0,0.2)] pt-8 px-8 sm:mt-10">
              <h3 className="pb-4 md:text-lg text-white uppercase text-base text-center font-medium">
                Tree Equity Score <span className="font-bold">Analyzers</span>
              </h3>
              <img alt="" loading="lazy" src="/AppsComp_TESA.png" />
              <div className="pt-4 text-left font-medium lg:text-base text-white text-sm">
                Take a deep dive into Tree Equity in your community. Tree Equity Score Analyzers
                have single-city or region coverage and support customizable property-level planting
                plans.
                <ul className="list-disc pl-10 pt-4">
                  <li>
                    Make a data-driven plan to shift neighborhood Tree Equity Scores in your city or
                    region.
                  </li>
                  <li>
                    Customize Tree Equity Score targets, then create tree planting and tree
                    protection plans at the property level to achieve your goals.
                  </li>
                  <li>Track your progress and measure the positive impacts to your community.</li>
                </ul>
              </div>
              <Link legacyBehavior href="/analyzer">
                <a className="mt-6 inline-block sm:mb-8 mb-16 text-sm font-semibold text-brand-green-dark tracking-wider uppercase rounded-full bg-white py-2.5 hover:bg-brand-green-dark hover:text-white transition px-5">
                  Learn more
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-32"></div>
      </section>

      <div className="px-8 py-16 md:px-0 bg-[#005251] text-white">
        <div className="w-11/12 md:w-4/5 m-auto">
          <p className="sm:text-3xl text-2xl font-bold text-center pb-4 lg:mx-auto lg:px-16">
            Join the movement to protect and restore urban forests
          </p>
          <p className="text-center lg:mx-auto lg:px-40 lg:text-lg text-base">
            Urban communities require trees as essential infrastructure to support public health and
            climate resilience. According to our estimations, we need to plant and grow 500 million
            trees and protect existing urban tree infrastructure to achieve Tree Equity across
            America.
          </p>
        </div>
        <div className="pt-8 w-11/12 sm:w-2/3 md:w-4/5 lg:w-11/12 xl:w-4/5 m-auto text-brand-green-dark">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {action.map((item, i) => {
              return (
                <Link legacyBehavior key={i} href={`${item.link}`}>
                  <a target="_blank" rel="noreferrer noopener">
                    <div className="bg-white max-w-[350px] m-auto hover:shadow-[0px_0px_20px_rgba(0,0,0,0.25)] hover:scale-[1.01] transition duration-200">
                      <div className="">
                        <p className="inline font-bold text-lg leading-[50px] ml-3">{item.name}</p>
                        <img
                          alt=""
                          src="/icons/actions-right-arrow.png"
                          className="inline float-right w-6 py-3 mr-2"
                        />
                      </div>
                      <div className="">
                        <img alt="" src={item.image} className="h-[240px] object-cover" />
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const Home: BlitzPage = () => {
  return <TesHome />
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>
export default Home
