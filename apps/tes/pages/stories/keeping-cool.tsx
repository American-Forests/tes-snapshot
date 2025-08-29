import Head from "next/head"
import Link from "next/link"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import React, { useState } from "react"

const KeepingCoolStory: BlitzPage = () => {
  function HoverImage({ url, hoverUrl }: { url: string; hoverUrl: string }) {
    const [hovering, setHovering] = useState(false)
    return (
      <div
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="w-full m-auto text-center font-mono font-bold text-xl bg-cover bg-no-repeat square-img"
      >
        {!hovering && <img src={url} />}
        {hovering && <img src={hoverUrl} />}
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      <Head>
        {/* Open Graph Protocol metadata that specifies how stuff renders for social sharing,
          that we want to override, to see the default variables, go to /pages/_app.tsx */}
        <meta
          property="og:title"
          content="Keeping Cool: How can Trees Moderate Urban Heat in your City? - An American Forests Data Short"
          key="title"
        />
        <meta property="og:description" content="" key="description" />
        <meta
          property="og:image"
          content="https://www.treeequityscore.org/uheat-atlanta-trees.jpg"
          key="image"
        />
        <meta
          property="og:url"
          content="https://www.treeequityscore.org/stories/keeping-cool/"
          key="url"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-white">
        <Header />

        {/* Cover Section */}
        <section
          style={{
            backgroundColor: "#131720",
            color: "#E9FBF2",
          }}
        >
          <div className="text-center lg:w-2/4 w-11/12 m-auto">
            <div>
              <p
                id="mh-start"
                className="lg:text-7xl lg:leading-tight md:text-6xl md:leading-tight text-5xl leading-tight font-bold pt-20"
              >
                Keeping Cool
              </p>
            </div>
            <div className="font-mono text-2xl font-normal pt-10">
              How can trees moderate urban heat in your city?
            </div>
            <div className="font-mono text-2xl font-normal pt-5">
              An American Forests Data Short
            </div>
            <div className="h-20"></div>
            <div className="flex px-4 animate-bounce items-center justify-center">
              <img
                src="https://d17m5nraxo9zm6.cloudfront.net/icons/down-caret.svg"
                className="h-6"
              />
            </div>
            <div className="px-4 text-xl font-mono">3 minute read</div>
          </div>
        </section>

        {/* Intro Section */}
        <section
          style={{
            backgroundColor: "#131720",
          }}
        >
          <div
            className="xl:w-2/4 lg:w-3/5 w-11/12 m-auto"
            style={{
              color: "#E9FBF2",
            }}
          >
            <div className="h-20"></div>
            <p className="font-bold md:text-4xl text-2xl leading-tight text-center">
              Why is one neighborhood hotter than another? Chances are it is because it has fewer
              trees...
            </p>
            <div className="h-10"></div>
          </div>
        </section>

        {/* Map Grid Section */}
        <section
          style={{
            backgroundColor: "#131720",
          }}
        >
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-10">
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-detroit-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-detroit-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-nyc-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-nyc-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-la-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-la-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-dallas-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-dallas-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-philly-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-philly-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-atlanta-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-atlanta-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-seattle-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-seattle-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-vegas-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-vegas-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-minne-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-minne-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-denver-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-denver-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-dc-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-dc-heat.jpg"
            />
            <HoverImage
              url="https://d17m5nraxo9zm6.cloudfront.net/uheat-nashville-trees.jpg"
              hoverUrl="https://d17m5nraxo9zm6.cloudfront.net/uheat-nashville-heat.jpg"
            />
          </div>
          <div className="h-40"></div>
        </section>

        {/* Bridge Section */}
        <section
          style={{
            backgroundColor: "#131720",
          }}
        >
          <div
            className="xl:w-2/4 lg:w-3/5 w-11/12 m-auto"
            style={{
              color: "#E9FBF2",
            }}
          >
            <div className="font-bold md:text-4xl text-2xl text-center">
              Heat islands are urbanized areas that experience higher temperatures than outlying
              areas.
            </div>
            <div className="font-bold md:text-2xl text-xl leading-tight text-center">
              <br />
              According to the U.S. EPA,{" "}
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="https://www.epa.gov/heatislands/learn-about-heat-islands"
                target="_blank"
                rel="noreferrer"
              >
                a review of research and data for the United States{" "}
                <img
                  src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
                  className="inline h-4 md:h-5"
                />
              </a>{" "}
              found that urban heat islands are, on average, 1 to 7°F warmer than outlying areas
              during the day, and about 2 to 5°F warmer at night. Increased population density, city
              size and humidity can heighten the warming effect.
            </div>
          </div>
        </section>

        {/* About Urban Heat Section */}
        <section
          style={{
            backgroundColor: "#131720",
          }}
        >
          <div
            className="xl:w-2/4 lg:w-4/5 w-11/12 m-auto"
            style={{
              color: "#E9FBF2",
            }}
          >
            <div className="h-20"></div>
            <div className="h-10"></div>
            <div className="grid md:grid-cols-2">
              <div className="md:w-full w-4/5 m-auto">
                <img src="/uheat-ig.png" alt="Urban heat graphic" />
              </div>
              <div className="md:pl-5 pl-none w-full md:text-left text-center md:pt-5 pt-5 font-medium md:text-xl text-base leading-tight">
                In urbanized areas, built surfaces like roads, asphalt, sidewalks and rooftops
                absorb and trap heat from the sun. As heat is slowly released back into the air,
                dangerous islands of heat can form. <br />
                <br />
                Trees can cool our cities by providing shade and by releasing water vapor from their
                leaves, which cools the air when it evaporates.
              </div>
            </div>
            <div className="h-60"></div>
          </div>
        </section>

        {/* Bridge Section */}
        <section
          style={{
            backgroundColor: "#131720",
            color: "#E9FBF2",
          }}
        >
          <div className="font-bold md:text-4xl text-2xl leading-tight text-center xl:w-2/4 lg:w-3/5 w-11/12 m-auto">
            Establishing adequate tree cover on a city block can provide up to{" "}
            <a
              className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
              href="https://www.pnas.org/doi/full/10.1073/pnas.1817561116"
              target="_blank"
              rel="noreferrer"
            >
              10 degrees{" "}
              <img
                src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
                className="inline h-4 md:h-5"
              />
            </a>{" "}
            of cooling.
          </div>
          <div>
            <div className="font-bold md:text-2xl text-xl leading-tight text-center xl:w-2/4 lg:w-3/5 w-11/12 m-auto">
              <br />
              We compiled data for every{" "}
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="#methods"
              >
                urbanized area
                <sup>1</sup>
              </a>{" "}
              in America in this interactive table. How many people are impacted by severe urban
              heat in your area? How many trees does your area need to achieve adequate and
              equitable tree cover?
            </div>
            <div className="h-10"></div>
          </div>
        </section>

        {/* Datawrapper Section */}
        <section
          style={{
            backgroundColor: "#131720",
          }}
        >
          <div
            className="xl:w-7/12 lg:w-9/12 w-full m-auto"
            style={{
              color: "#E9FBF2",
            }}
          >
            <div className="h-10"></div>
            <div>
              <iframe
                className="m-auto w-full lg:rounded-3xl rounded-none"
                src="https://datawrapper.dwcdn.net/ahv7L/19/"
                style={{
                  height: "1380px",
                  backgroundColor: "#DCE6E6",
                  padding: "40px",
                }}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section
          style={{
            backgroundColor: "#131720",
          }}
        >
          <div
            className="xl:w-2/4 lg:w-3/5 w-11/12 m-auto"
            style={{
              color: "#E9FBF2",
            }}
          >
            <div className="h-40"></div>
            <div className="font-bold md:text-2xl text-xl leading-tight text-center">
              Cities are experiencing extreme heat more and more regularly. Climate change is
              leading to higher temperatures and longer, more intense and more frequent heat waves.
              Urban heat poses a serious threat to public health, particularly for children, the
              elderly, people with respiratory illnesses and those who work outdoors.
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="https://www.epa.gov/sites/default/files/2016-10/documents/extreme-heat-guidebook.pdf"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img
                  src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
                  className="inline h-4 md:h-5"
                />
              </a>{" "}
              <br />
              <br />
              People with lower incomes and people of color reside disproportionately in the hottest
              areas of the majority of U.S. cities. With higher incidences of pre-existing health
              conditions, they are also more vulnerable to heat impacts.
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="https://www.nature.com/articles/s41467-021-22799-5"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img
                  src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
                  className="inline h-4 md:h-5"
                />
              </a>{" "}
            </div>
            <div className="h-40"></div>
            <div className="font-bold md:text-4xl text-2xl leading-tight text-center">
              Want to know <i>where</i> to plant trees to alleviate the impacts of urban heat?
            </div>
          </div>
        </section>

        {/* Button */}
        <section
          style={{
            backgroundColor: "#131720",
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

        {/* Conclusion */}
        <section
          style={{
            backgroundColor: "#131720",
          }}
        >
          <div
            className="xl:w-2/4 lg:w-3/5 w-11/12 m-auto"
            style={{
              color: "#D8E1E1",
            }}
          >
            <div className="font-bold md:text-2xl text-xl leading-tight text-center">
              Interested in more stories? We looked at urban heat equity for every city in America.
              Explore our
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="https://www.treeequityscore.org/stories/urban-heat-equity/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                U.S.-wide analysis{" "}
                <img
                  src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
                  className="inline h-4 md:h-5"
                />
              </a>
              .
            </div>
            <div className="h-40"></div>
          </div>
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
                  src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
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
              American Forests' Tree Equity Score is an analysis of urbanized neighborhoods, where
              neighborhoods are defined as Census block groups, and{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.census.gov/programs-surveys/geography/guidance/geo-areas/urban-rural/2010-urban-rural.html"
                target="_blank"
                rel="noreferrer"
              >
                urbanized areas{" "}
                <img
                  src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
                  className="inline h-3"
                />
              </a>{" "}
              are defined by the Census Bureau as “densely developed territory… encompass[ing]
              residential, commercial, and other non-residential urban land uses.”
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              Surface temperature data were derived from USGS Earth Explorer Landsat 8 imagery
              thermal bands. One-meter resolution tree canopy cover for all urbanized areas in the
              United States was provided by{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.earthdefine.com/treemap/"
                target="_blank"
                rel="noreferrer"
              >
                EarthDefine{" "}
                <img
                  src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
                  className="inline h-3"
                />
              </a>
              . Temperature and tree canopy maps were created for a cross-section of larger
              urbanized areas representative of different ecoregions of the United States.
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              For each urbanized area unit
              <sup>1</sup>, the percent of the population living in a heat anomaly was calculated.
              Urbanized area averages were calculated as the area-weighted mean of all block group
              mean summer high surface temperatures. A heat anomaly was defined as Census block
              groups that were 1.25 degrees above average temperatures for the urbanized area and
              the population tabulated for those block groups.
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              Tree Equity Score establishes tree canopy targets (percent cover) that are scaled to
              ecoregions (forest, grassland and desert) and population density, determined in
              conjunction with the U.S. Forest Service and The Nature Conservancy. The neighborhood
              canopy gap, GAP, is calculated by subtracting the existing neighborhood canopy from
              the target. Census block groups were flagged for "adequate tree cover" where GAP = 0,
              that is, the percent existing tree canopy was greater than or equal to its tree canopy
              target. Where GAP {">"} 0, the canopy gap % was multiplied by the block group area,
              then converted to number of trees using a basic multiplier of 600 sq-ft (55.74 sq-m)
              of canopy area per urban tree assuming a medium-sized, deciduous urban tree crown
              width of 25-30 ft.
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              <sup>1</sup>Census Urbanized Area (UA) units are defined as a continuously built-up
              area with a population of 50,000 or more, comprising one or more places (e.g.,
              municipalities, cities, towns, villages, or boroughs) and the adjacent densely settled
              surrounding area (urban fringe) consisting of other places and nonplace territory. The
              Census Bureau generally merges contiguous urbanized areas when major portions are
              located in the same metropolitan area (defined by the Federal Office of Management and
              Budget as a core area containing a large population nucleus, together with adjacent
              communities that have a high degree of economic and social integration with that core
              area).
            </div>
            <div className="h-10"></div>
            <div className="font-mono font-bold text-xl text-center m-auto">Data</div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono text-center m-auto">
              Tree Equity Score, 2022.
            </div>
            <div className="h-10"></div>
            <div className="font-mono font-bold text-xl text-center m-auto">Credits</div>
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
              <img src="/Zendesk_horiz.png" className="inline h-12" />
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
                  src="https://d17m5nraxo9zm6.cloudfront.net/icons/open-url-bl.svg"
                  className="inline h-3"
                />
              </a>
              .
            </div>
            <div className="h-20"></div>
          </div>

          <div className="m-auto text-center">
            <Link legacyBehavior href={Routes.KeepingCoolStory()}>
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

KeepingCoolStory.getLayout = (page) => (
  <Layout title={"Keeping Cool - An American Forests Data Short"}>{page}</Layout>
)
export default KeepingCoolStory
