import Head from "next/head"
import Link from "next/link"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Step, Scrollama } from "react-scrollama"
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import { useState } from "react"
import { Carousel } from "react-responsive-carousel"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const HappierHealthierStory: BlitzPage = () => {
  const [currentStepImage, setCurrentStepImage] = useState("/mh-step1.png")

  const onStepEnter = ({ data }: { data: string }) => {
    setCurrentStepImage(data)
  }

  return (
    <div className="min-h-screen">
      <Head>
        {/* Open Graph Protocol metadata that specifies how stuff renders for social sharing,
            that we want to override, to see the default variables, go to /pages/_app.tsx */}
        <meta
          property="og:title"
          content="Happier and Healthier - An American Forests Data Short"
          key="title"
        />
        <meta
          property="og:description"
          content="One in 4 people suffer from mental illness. We assessed Tree Equity Score data and found that mental health complaints are fewer in neighborhoods with more trees."
          key="description"
        />
        <meta
          property="og:image"
          content="https://www.treeequityscore.org/mh-storyimg.png"
          key="image"
        />
        <meta
          property="og:url"
          content="https://www.treeequityscore.org/stories/happier-healthier/"
          key="url"
        />

        <link rel="icon" href="/favicon.png" />
        <link rel="preload" as="image" href="/mh-step1.png" />
        <link rel="preload" as="image" href="/mh-step2.png" />
        <link rel="preload" as="image" href="/mh-step3.png" />
        <link rel="preload" as="image" href="/mh-step4.png" />

        <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css" />
        <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
      </Head>
      <div className="bg-white">
        <Header />

        {/* Cover Section */}
        <section
          style={{
            backgroundColor: "#0B1A19",
            color: "#E2E2E3",
          }}
        >
          <div className="text-center lg:w-2/4 w-11/12 m-auto">
            <div>
              <p
                id="mh-start"
                className="lg:text-7xl lg:leading-tight md:text-6xl md:leading-tight text-5xl leading-tight font-bold pt-20"
              >
                Happier and Healthier
              </p>
            </div>
            <div className="font-mono text-2xl font-normal pt-10">
              Urban trees and mental health in America
            </div>
            <div className="font-mono text-2xl font-normal pt-5">
              An American Forests Data Short
            </div>
            <div className="h-20"></div>
            <div className="flex px-4 animate-bounce items-center justify-center">
              <img src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/down-caret.svg`} className="h-6" />
            </div>
            <div className="px-4 text-xl font-mono">5 minute read</div>
          </div>
        </section>

        {/* Intro Section */}
        <section
          style={{
            backgroundColor: "#0B1A19",
          }}
        >
          <div
            className="xl:w-2/4 lg:w-3/5 w-11/12 m-auto"
            style={{
              color: "#E2E2E3",
            }}
          >
            <div className="h-20"></div>
            <div className="w-full">
              {" "}
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ericashouse.jpg`}
                alt="Erica Mixon sits on her old front porch in Detroit"
              />
              <p className="text-sm font-light font-mono">
                Erica Mixon sits on her old front porch in Detroit. Image: Joel Clark / American
                Forests
              </p>
            </div>
            <div className="h-20"></div>
            <div className="h-10"></div>
            <div className="font-bold md:text-2xl text-xl text-center">
              As a teenager, Erica Mixon moved from her family's tree-lined neighborhood to a new
              house with extended family in Detroit. The new neighborhood was barren and neglected.
            </div>
            <div className="h-20"></div>
            <div className="font-bold md:text-2xl text-xl text-center">
              She felt the loss of trees deeply.
            </div>
            <div className="h-40"></div>
            <div className="grid md:grid-cols-2">
              <div className="md:w-full w-4/5 m-auto">
                {" "}
                <img src={`${STATIC_ASSETS_CLOUDFRONT_URL}/erica.jpg`} alt="Erica Mixon" />
                <p className="text-sm font-light font-mono">Image: Joel Clark / American Forests</p>
              </div>
              <div
                className="font-medium font-mono xl:text-lg lg:text-base text-base leading-snug md:pl-5 md:mt-0 mt-16"
                style={{
                  color: "#efeff1",
                }}
              >
                <br />
                “I went from tree canopies, lavish grass [and] birds to a place that… was different.
                Desolate. Dilapidated homes. It was hotter than where I came from. And the trees?
                Hiding from the sun? [You] couldn't do that. It felt lifeless. And that is not good
                for coping.”
              </div>
            </div>
            <div className="h-40"></div>
            <div className="font-bold md:text-2xl text-xl text-center">
              Mixon's experience of the loss of trees is reflected in the science.{" "}
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="https://www.science.org/doi/10.1126/sciadv.aax0903"
                target="_blank"
                rel="noreferrer"
              >
                Hundreds of studies{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-4 md:h-5"
                />
              </a>{" "}
              find associations between nature exposure and psychological and physiological
              well-being. Experiencing nature reduces anxiety and stress, improves energy, increases
              mental clarity and attention, improves immune function and confers many other{" "}
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="https://www.mdpi.com/1660-4601/17/12/4371"
                target="_blank"
                rel="noreferrer"
              >
                health benefits{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-4 md:h-5"
                />
              </a>
              .
            </div>
            <div className="h-20"></div>

            <div className="font-bold md:text-2xl text-xl text-center">
              This story is also felt by many across America. With more than 70% of Americans now
              living in{" "}
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="#methods"
              >
                urbanized areas
                <sup>1</sup>
              </a>
              ,{" "}
              <a
                className="hover:text-link-blue transition duration-300 ease-out hover:ease-in"
                href="https://www.science.org/doi/10.1126/sciadv.aax0903"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                our proximity to trees and nature has diminished{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-4 md:h-5"
                />
              </a>
              .
            </div>
            <div className="h-40"></div>
          </div>
        </section>

        {/* SCROLLAMA */}
        <main
          style={{
            backgroundColor: "#0B1A19",
          }}
        >
          {/* SCROLLY */}
          <section className="relative flex lg:w-3/5 w-11/12 m-auto" id="scrolly">
            {/* STICKY THING */}
            <div
              className="sticky flex-1 w-full m-0 z-0 top-0 h-screen flex items-center justify-center sticky-thing transition-all duration-300"
              style={{
                backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}${currentStepImage})`,
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            {/* "ARTICLE" - Set margin: 0 auto to center the steps. Set margin: % to control distance from left. Control step width with max-width. */}
            <article
              className="relative md:max-w-sm sm:max-w-xs max-w-xxs flex-1"
              id="scroll-article"
            >
              <Scrollama offset={0.66} onStepEnter={onStepEnter}>
                <Step data="/mh-step1.png">
                  <div className="mt-96 mx-auto mb-96 flex-1">
                    <p className="font-medium md:text-lg text-sm" style={{ color: "#E2E2E3" }}>
                      In American cities, disparities in tree cover are the norm. According to our
                      Tree Equity Score analysis, 77% of urbanized neighborhoods in cities across
                      America have inadequate tree cover.
                      <br />
                      <br />
                    </p>
                    <p className="font-medium md:text-lg text-sm" style={{ color: "#E2E2E3" }}>
                      Take a look at our eight most populated cities. These charts show the
                      proportion of urbanized neighborhoods with adequate tree cover. Neighborhoods
                      that are 100% meeting their tree canopy potential* are in green and all others
                      in white. <br />
                      <br />
                    </p>
                    <p
                      className="font-mono font-bold md:leading-tight leading-tight"
                      style={{ color: "#529271" }}
                    >
                      {" "}
                      <img
                        className="inline h-3"
                        src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-step1-legend.png`}
                      />
                      &nbsp;neighborhoods fully meeting tree canopy potential
                      <br />
                      <br />
                    </p>
                    <p className="font-medium md:text-sm text-xs" style={{ color: "#E2E2E3" }}>
                      *Tree canopy potential represents the maximum possible tree canopy in any
                      given neighborhood, adjusted for feasibiity and comparability across biomes
                      (forest, grassland and desert) and across population density levels based on
                      targets set by the U.S. Forest Service and The Nature Conservancy.
                    </p>
                    <div className="h-96"></div>
                  </div>
                </Step>
                <Step data="/mh-step2.png">
                  <div className="mt-96 mx-auto mb-96 flex-1">
                    <p
                      className="font-medium md:text-lg text-sm flex-1"
                      style={{ color: "#E2E2E3" }}
                    >
                      In each of these cities, mental health complaints are higher in neighborhoods
                      with fewer trees. <br />
                      <br /> Here's how to read these charts*: <br />
                      <br />{" "}
                      <img
                        className="inline w-11/12"
                        src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-step2-legend.png`}
                      />{" "}
                      <br />
                      <br />
                    </p>
                    <p className="font-medium md:text-sm text-xs" style={{ color: "#E2E2E3" }}>
                      *For each urbanized area, we created five neighborhood groups based on the
                      amount of tree cover, using quintiles. For each group, the height of blue bars
                      corresponds to the average percentage of residents who reported mental health
                      complaints.
                    </p>
                    <div className="h-96"></div>
                  </div>
                </Step>
                <Step data="/mh-step3.png">
                  <div className="mt-96 mx-auto mb-96 flex-1">
                    <p
                      className="font-medium md:text-lg text-sm flex-1"
                      style={{ color: "#E2E2E3" }}
                    >
                      Now, let's take a look at the percent difference* between areas with the most
                      trees compared to those with the fewest. In each city, mental health
                      complaints are highest in neighborhoods with fewer trees. <br />
                      <br />
                      Each city looks a bit different, likely due to variability in patterns of tree
                      cover and poor mental health.
                      <br />
                      <br />
                    </p>

                    <p className="font-medium md:text-sm text-xs" style={{ color: "#E2E2E3" }}>
                      *calaculated as percent change
                    </p>
                    <div className="h-96"></div>
                  </div>
                </Step>
                <Step data="/mh-step4.png">
                  <div className="mt-96 mx-auto mb-96 flex-1 step">
                    <p
                      className="font-medium md:text-lg text-sm flex-1"
                      style={{ color: "#E2E2E3" }}
                    >
                      Our eight largest cities are not unique. We ran the numbers on all 150,000+
                      urbanized neighborhoods in the contiguous United States and found the same
                      trend. All across America, mental health complaints tend to be higher in areas
                      with fewer trees.
                    </p>
                    <div className="h-96"></div>
                  </div>
                </Step>
              </Scrollama>
            </article>
          </section>
          <section className="h-20"></section>
        </main>

        {/* Discussion Section */}
        <section
          style={{
            backgroundColor: "#0B1A19",
          }}
        >
          <div
            className="lg:w-2/4 w-11/12 m-auto"
            style={{
              color: "#E2E2E3",
            }}
          >
            <div className="w-full">
              {" "}
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-detroit.jpg`}
                alt="Aerial view of Baltimore, Maryland"
              />
              <p className="text-sm font-light text-white font-mono">
                Where the treeline ends in Detroit. Image: Ann Millspaugh / Flickr
              </p>
            </div>
            <div className="h-20"></div>
            <div className="h-10"></div>
            <div className="font-bold md:text-2xl text-xl text-center">
              Mixon's story — like so many urban Americans' — is one where health and wellness,
              nature access, poverty and economic opportunity are deeply interconnected.
            </div>
            <div className="h-20"></div>

            {/* Slideshow Interaction */}

            <div className="w-4/6 relative m-auto">
              <Carousel
                showArrows={true}
                infiniteLoop={true}
                autoPlay={true}
                showThumbs={false}
                interval={4000}
                showStatus={false}
              >
                <div className="w-full">
                  {" "}
                  <img src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-slide-poc.png`} />
                </div>
                <div className="w-full">
                  {" "}
                  <img src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-slide-pov.png`} />
                </div>
                <div className="w-full">
                  {" "}
                  <img src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-slide-unempl.png`} />
                </div>
                <div className="w-full">
                  {" "}
                  <img src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-slide-phys.png`} />
                </div>
              </Carousel>
            </div>

            <div className="h-20"></div>
            <div className="h-10"></div>
            <div className="font-bold md:text-2xl text-xl text-center">
              Those hit hardest by mental health challenges are more likely to be people of color,
              low-income and grappling with physical health issues — and are <i>also</i> more likely
              to live where there are the fewest trees.
            </div>
            <div className="h-40"></div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section
          style={{
            backgroundColor: "#0B1A19",
          }}
        >
          <div
            className="lg:w-2/4 w-11/12 m-auto"
            style={{
              color: "#E2E2E3",
            }}
          >
            <div className="w-full">
              {" "}
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-urbanforest.jpg`}
                alt="Aerial view of Baltimore, Maryland"
              />
              <p className="text-sm font-light text-white font-mono">
                Aerial view of Baltimore. Image: Chuck Fazio / American Forests
              </p>
            </div>
            <div className="h-20"></div>
            <div className="h-10"></div>
            <div className="font-bold md:text-2xl text-xl text-center">
              Trees are more than scenery for our cities. They are critical, life-saving
              infrastructure that every person in every neighborhood deserves.
            </div>
            <div className="h-20"></div>
            <div className="w-4/5 relative m-auto">
              <p className="font-mono font-normal md:text-lg text-base text-center">
                “[People] need life. They need hope. Sometimes in our haste [of busy schedules], you
                don't understand how much that willow tree may bring you joy, or the bird that
                chirps and wakes you up lets you know that you're alive. When you are able to make
                those connections with your mental health, with your attitude, with your outlook on
                life, it makes a difference."
              </p>
            </div>
            <div className="h-20"></div>
            <div className="font-bold md:text-2xl text-xl text-center">
              "It can cause a shift," Mixon says.
            </div>
            <div className="h-40"></div>
            <div className="w-full">
              {" "}
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/mh-westphilly.jpg`}
                alt="Tree-lined neighborhood in West Philadelphia"
              />
              <p className="text-sm font-light text-white font-mono">
                Tree-lined neighborhood in West Philadelphia. Image: Koren Martin / American Forests
              </p>
            </div>
            <div className="h-20"></div>
            <div className="h-10"></div>
            <div className="font-bold md:text-2xl text-xl text-center">
              Tree Equity means trees in every part of every city. It means having enough trees so
              all people experience the health, economic and other benefits that trees provide.
            </div>
            <div className="h-20"></div>
            <div className="font-bold md:text-4xl text-2xl text-center">
              You can help create Tree Equity in cities across America. Get started today.
            </div>
          </div>
        </section>

        {/* Button */}
        <section
          style={{
            backgroundColor: "#0B1A19",
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
              <Link legacyBehavior href={Routes.Home()}>
                <a className="text-link-blue font-normal">
                  TreeEquityScore.org{" "}
                  <img
                    src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                    className="inline h-3"
                  />
                </a>
              </Link>
              .
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              Today, Mixon is a Community Advocate at Central Detroit Christian Community
              Development, a faith-based non-profit committed to empowering people and transforming
              the community. Watch Mixon's{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.americanforests.org/our-programs/tree-equity/"
                target="_blank"
                rel="noreferrer"
              >
                full interview{" "}
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
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>{" "}
              are defined by the Census Bureau as “densely developed territory… encompass[ing]
              residential, commercial, and other non-residential urban land uses.” Over 70% of the
              U.S. population resides in urbanized neighborhoods (Tree Equity Score, 2022).
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              Data for self-reported poor mental health were derived from the Center for Disease
              Control{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.cdc.gov/places/index.html"
                target="_blank"
                rel="noreferrer"
              >
                CDC PLACES{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>
              . One-meter resolution tree canopy cover for all urbanized areas in the United States
              was provided by{" "}
              <a
                className="text-link-blue font-normal"
                href="https://www.earthdefine.com/treemap/"
                target="_blank"
                rel="noreferrer"
              >
                EarthDefine{" "}
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>
              .
            </div>
            <div className="h-5"></div>
            <div className="font-light text-sm font-mono">
              American Forests examined Tree Equity Score Census-block-group-level data for patterns
              in urban tree canopy and mental health. Block groups were ranked in quintiles by tree
              canopy cover. The average percent of the population self-reporting poor mental health
              was calculated for each tree canopy cover rank for all Census block groups in
              urbanized areas across America and for the eight largest metro areas. Similarly, block
              groups were ranked in quintiles by percent people of color (all people who are
              non-white, non-Hispanic), by percent of the population in poverty (population with
              income less than 200% of federal poverty level), by unemployment rate and by percent
              of the population reporting poor physical health, asthma and coronary heart disease.
              For each ranking, the average percent of the population self-reporting poor mental
              health was calculated across all Census block groups in urbanized areas.
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
                href="https://www.americanforests.org/personnel/julia-twichell/"
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
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/open-url-bl.svg`}
                  className="inline h-3"
                />
              </a>
              .
            </div>
            <div className="h-20"></div>
          </div>

          <div className="m-auto text-center">
            <Link legacyBehavior href={Routes.HappierHealthierStory()}>
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

HappierHealthierStory.getLayout = (page) => (
  <Layout title={"Happier and Healthier - An American Forests Data Short"}>{page}</Layout>
)
export default HappierHealthierStory
