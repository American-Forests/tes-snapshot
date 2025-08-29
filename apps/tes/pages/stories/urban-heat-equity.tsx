import Head from "next/head"
import Link from "next/link"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import React from "react"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const UrbanHeatEquityStory: BlitzPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        {/* Open Graph Protocol metadata that specifies how stuff renders for social sharing,
            that we want to override, to see the default variables, go to /pages/_app.tsx */}
        <meta
          property="og:title"
          content="Who lives in urban heat islands in America? - An American Forests Data Short"
          key="title"
        />
        <meta
          property="og:description"
          content="Extreme heat is the new normal. We reviewed the data for every city in America and found consistent, disproportionate impacts to people of color and low-income communities across the nation. Explore our findings in our new interactive story."
          key="description"
        />
        <meta
          property="og:image"
          content="https://www.treeequityscore.org/heateq-cityfountain.jpg"
          key="image"
        />
        <meta
          property="og:url"
          content="https://www.treeequityscore.org/stories/urban-heat-equity/"
          key="url"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-white">
        <Header />

        {/* Cover Section */}
        <section
          style={{
            backgroundColor: "#e7dee1",
            color: "#3b3e4d",
          }}
        >
          <div className="text-center lg:w-2/4 w-11/12 m-auto">
            <div>
              <p
                id="mh-start"
                className="lg:text-7xl lg:leading-tight md:text-6xl md:leading-tight text-5xl leading-tight font-bold pt-20"
              >
                Urban Heat Equity
              </p>
            </div>
            <div className="font-mono text-2xl font-normal pt-10">
              Who lives in urban heat islands in America?
            </div>
            <div className="font-mono text-2xl font-normal pt-5">
              An American Forests Data Short
            </div>
            <div className="h-20"></div>
            <div className="flex px-4 animate-bounce items-center justify-center">
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/down-caret-3b3e4d.svg`}
                className="h-6"
              />
            </div>
            <div className="px-4 text-xl font-mono">3 minute read</div>
          </div>
        </section>

        {/* Intro Section */}
        <section
          style={{
            backgroundColor: "#e7dee1",
            color: "#3b3e4d",
          }}
        >
          <div className="xl:w-2/4 lg:w-3/5 w-11/12 m-auto">
            <div className="h-10"></div>
            <div className="h-20"></div>
            <div className="w-full">
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/heateq-baltimore.jpg`}
                alt="Aerial view of Baltimore"
              />
              <p className="text-sm font-light font-mono">
                Aerial view of Baltimore. Image: Jon Bilous / American Forests
              </p>
            </div>
            <div className="h-20"></div>
            <div className="h-10"></div>
            <div>
              <p className="font-bold md:text-4xl text-2xl text-center">
                Across America, extreme heat disproportionately impacts folks of color and folks in
                poverty.
              </p>
              <div className="h-10"></div>
              <p className="font-bold md:text-2xl text-xl text-center">
                American Forests analyzed surface temperature data from thousands of satellite
                images nationwide. We investigate how urban heat disparities play out in every{" "}
                <a
                  className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                  href="#methods"
                >
                  urbanized
                  <sup>1</sup>
                </a>{" "}
                neighborhood in America—looking city by city.{" "}
              </p>
              <div className="h-20"></div>
              <div className="m-auto w-5/6">
                <img src={`${STATIC_ASSETS_CLOUDFRONT_URL}/heateq-detroit-animation.gif`} />
              </div>
              <div className="h-20"></div>
              <div className="font-bold md:text-2xl text-xl text-center">
                In Detroit, more people of color and people in poverty live in the hottest
                neighborhoods of the city. The trend occurs in cities across America.
              </div>
              <div className="h-20"></div>
              <div className="h-10"></div>
              <div className="w-full">
                <img
                  src="https://links.imagerelay.com/cdn/3910/ql/b6843776afd543c996beb3c18c71eb31/shutterstock_1775856617.jpg"
                  alt="A hot day at the city fountain."
                />
                <p className="text-sm font-light font-mono">
                  A hot day at the city fountain. Image: Svetlana Lazarenka / American Forests
                </p>
              </div>
              <div className="h-20"></div>
              <div className="h-10"></div>
              <p className="font-bold md:text-4xl text-2xl text-center">
                In fact, very few cities in America are exempt from the issue of heat inequity.
              </p>
              <div className="h-10"></div>
              <p className="font-bold md:text-2xl text-xl text-center">
                An eye-popping{" "}
                <span style={{ fontSize: "1.5em" }}>
                  92% of U.S.{" "}
                  <a
                    className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                    href="#methods"
                  >
                    cities
                    <sup>1</sup>
                  </a>
                </span>{" "}
                have more residents of color and higher poverty rates in the hottest neighborhoods.
                The data reveal a pervasive pattern impacting nearly every city in America.
              </p>
              <div className="h-10"></div>
              <div className="h-20"></div>
            </div>
          </div>
        </section>

        {/* Datawrapper Section */}
        <section
          style={{
            backgroundColor: "#e7dee1",
            color: "#3b3e4d",
          }}
        >
          <div className="grid xl:grid-cols-2">
            <div className="m-auto pt-10">
              <div className="font-bold md:text-xl text-lg text-center">
                Extreme Heat and People of Color in U.S. Cities
              </div>
              <div className="h-2"></div>
              <iframe
                className="m-auto"
                src="https://datawrapper.dwcdn.net/Qd6H6/25/"
                style={{
                  width: "700px",
                  height: "511px",
                }}
              ></iframe>
            </div>
            <div className="m-auto pt-10">
              <div className="font-bold md:text-xl text-lg text-center">
                Extreme Heat and Poverty Rates in U.S. Cities
              </div>
              <div className="h-2"></div>
              <iframe
                src="https://datawrapper.dwcdn.net/FdFFX/37/"
                style={{
                  width: "700px",
                  height: "511px",
                }}
              ></iframe>
            </div>
          </div>
          <div className="h-40"></div>
        </section>

        {/* Discussion Section */}
        <section
          style={{
            backgroundColor: "#e7dee1",
            color: "#3b3e4d",
          }}
        >
          <div className="xl:w-2/4 lg:w-3/5 w-11/12 m-auto">
            <div>
              <p className="font-bold md:text-4xl text-2xl text-center">
                Trees can help moderate heat in your city.{" "}
              </p>
              <div className="h-10"></div>
              <p className="font-bold md:text-2xl text-xl text-center">
                People living in cities are experiencing extreme heat more and more regularly.{" "}
                <a
                  className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                  href="https://www.epa.gov/sites/default/files/2016-10/documents/extreme-heat-guidebook.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Climate change{" "}
                  <img
                    src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                    className="inline h-4 md:h-5"
                  />
                </a>{" "}
                is leading to higher temperatures and longer, more intense and more frequent heat
                waves. Establishing adequate tree cover on a city block can provide up to{" "}
                <a
                  className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                  href="https://www.pnas.org/doi/full/10.1073/pnas.1817561116"
                  target="_blank"
                  rel="noreferrer"
                >
                  10 degrees{" "}
                  <img
                    src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                    className="inline h-4 md:h-5"
                  />
                </a>{" "}
                of cooling. <br />
                <br />
                Check out{" "}
                <a
                  className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                  href="https://www.treeequityscore.org/stories/keeping-cool/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  this story on urban heat islands{" "}
                  <img
                    src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                    className="inline h-4 md:h-5"
                  />
                </a>{" "}
                to learn more.
              </p>
              <div className="h-40"></div>
              <p className="font-bold md:text-4xl text-2xl text-center">
                {" "}
                Ready to plant trees to alleviate heat and heat impacts in your city?
              </p>
              <div className="h-10"></div>
            </div>
          </div>
        </section>

        {/* Button */}
        <section
          style={{
            backgroundColor: "#e7dee1",
          }}
        >
          <div
            className="xl:w-2/4 lg:w-3/5 w-11/12 m-auto text-center"
            style={{
              color: "#D8E1E1",
            }}
          >
            <div className="h-20"></div>
            <Link legacyBehavior href={Routes.Home()}>
              <a className="bg-brand-green-dark font-bold text-white px-6 py-3 rounded-full hover:bg-brand-green">
                TreeEquityScore.org
              </a>
            </Link>
          </div>
          <div className="h-40"></div>
        </section>

        {/* Story Footer */}
        <section
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="lg:w-2/4 w-11/12 m-auto"
            style={{
              color: "#0B1A08",
            }}
          >
            <div className="h-20"></div>
            <div className="font-mono font-bold text-xl text-center m-auto">Learn More</div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              Tree Equity Score is a free, human-centered, decision-making tool for urban tree
              plantings used by urban foresters, land-use planners, government officials,
              neighborhood organizations and many others.
              <br />
              <br />
              Help make the case for investment in neighborhoods with the greatest need across
              America using a single, nationwide, neighborhood-level score. Learn more at{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.treeequityscore.org"
                target="_blank"
                rel="noreferrer"
              >
                TreeEquityScore.org{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>
              .
            </div>
            <div className="h-10"></div>
            <div id="methods" className="font-mono font-bold text-xl text-center m-auto">
              Methods
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              American Forests' Tree Equity Score is an analysis of urban neighborhoods, where
              neighborhoods are defined as Census Block Groups, and{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.census.gov/programs-surveys/geography/guidance/geo-areas/urban-rural/2010-urban-rural.html"
                target="_blank"
                rel="noreferrer"
              >
                urbanized areas{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>{" "}
              are defined by the Census Bureau as “densely developed territory… encompass[ing]
              residential, commercial, and other non-residential urban land uses.”
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              Surface temperature data were derived from{" "}
              <a
                className="text-link-blue font-normal"
                href="https://earthexplorer.usgs.gov/"
                target="_blank"
                rel="noreferrer"
              >
                USGS Earth Explorer{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>{" "}
              Landsat 8 imagery thermal bands. City
              <sup>1</sup> averages were calculated as the area-weighted mean of all block group
              mean summer high surface temperatures. Block groups were flagged as a heat anomaly if
              the mean summer high surface temperature was 1.25 degrees greater than the
              area-weighted mean for the city.
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              For each city, the people of color population and poverty rates were calculated
              city-wide (all block groups) and for just the block groups flagged as a heat anomaly.
              People in poverty is a Census measure defined as the percentage of the population with
              an income less than 200% of federal poverty level. People of color is defined as all
              people who identify as not white and non-Hispanic or Latinx. The difference between
              the citywide and heat anomaly values were labeled as "∆ in people of color" and "∆ in
              poverty rate."
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              <sup>1</sup>Cities were defined as Census{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www2.census.gov/geo/pdfs/reference/GARM/Ch12GARM.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Urbanized Area (UA)
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>{" "}
              units. The Census defines an UA as a continuously built-up area with a population of
              50,000 or more, comprising one or more places—central place(s)—and the adjacent
              densely settled surrounding area—urban fringe—consisting of other places and nonplace
              territory. The Census Bureau generally merges contiguous urbanized areas when major
              portions of the urbanized area territories are located in the same metropolitan area
              (defined by the Federal Office of Management and Budget (OMB) as a core area
              containing a large population nucleus, together with adjacent communities that have a
              high degree of economic and social integration with that core area).
            </div>
            <div className="h-10"></div>
            <div className="font-mono font-bold text-xl text-center m-auto">Data</div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono text-center m-auto">
              Tree Equity Score, 2022.
            </div>
            <div className="h-10"></div>
            <div className="font-mono font-bold text-xl text-center m-auto">Story Credits</div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono text-center m-auto">
              Article and visuals by{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.americanforests.org/personnel/julia-twichell/ "
                target="_blank"
                rel="noreferrer"
              >
                Julia Twichell
              </a>
              .<br />
              <br />
              This American Forests data short was made possible by funding from{" "}
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/Zendesk_horiz.png`}
                className="inline h-12"
              />{" "}
              <br />
              <br />
              All content © {new Date().getFullYear()} American Forests. Please acknowledge American
              Forests in the use and distribution of this product. Learn more about American Forests
              at{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.americanforests.org/"
                target="_blank"
                rel="noreferrer"
              >
                americanforests.org{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/iconss/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>
              .
            </div>
            <div className="h-20"></div>
          </div>

          <div className="m-auto text-center">
            <Link legacyBehavior href={Routes.UrbanHeatEquityStory()}>
              <a className="text-sm font-semibold text-brand-green uppercase rounded-full p-3 ring-1 ring-brand-green hover:bg-brand-green-dark hover:text-white transition duration-300 ease-out hover:ease-in">
                back to top
              </a>
            </Link>
          </div>

          <div className="h-20"></div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

UrbanHeatEquityStory.getLayout = (page) => (
  <Layout title={"Urban Heat Equity - An American Forests Data Short"}>{page}</Layout>
)
export default UrbanHeatEquityStory
