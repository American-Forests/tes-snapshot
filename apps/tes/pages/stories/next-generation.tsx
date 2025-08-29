import Head from "next/head";
import { BlitzPage } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout"
import React, { useState } from "react"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import * as Dialog from "@radix-ui/react-dialog"
import { XMarkIcon } from "@heroicons/react/24/solid"

const TES2UpdatesStory: BlitzPage = () => {
  type TES2UpdatesModalButton = {
    image: string
    name: string
    description: string
    border: string
    laptop: string
    modal: JSX.Element
  }

  const [selectedButton, setSelectedButton] = useState<TES2UpdatesModalButton | null>(null)
  const [hoveredButton, setHoveredButton] = useState<TES2UpdatesModalButton | null>(null)

  const buttonData: TES2UpdatesModalButton[] = [
    {
      image: "expanded-coverage.svg",
      name: "Expanded Coverage",
      description: "Tree Equity Score now covers all urban areas in America.",
      border: "urban_extension_motif.svg",
      laptop: "ua_ds_final_900w.mp4",
      modal: (
        <div>
          Tree Equity Score has extended coverage to all urban areas in America, including
          Hawai&#699;i and Alaska. Over 2000 smaller urban population hubs have been added to Tree
          Equity Score, comprising over 8000 additional towns, cities and villages. Urban areas are
          defined by the 2020 U.S. Census.
          <br />
          <br />
          That means over 260 million people&mdash;80% of the U.S. population&mdash;can now find a
          Tree Equity Score for their neighborhood and access rigorous data to help advocate for and
          achieve their Tree Equity goals.
        </div>
      ),
    },
    {
      image: "heat-disparity.svg",
      name: "Heat Disparity",
      description: "Introducing a new, nationwide dataset for urban heat severity.",
      border: "heat_motif.svg",
      laptop: "HEAT_ds_final_900w.mp4",
      modal: (
        <div>
          Trees provide crucial heat mitigation in our population centers. American Forests has
          developed a new, full-coverage urban heat disparity dataset to support efforts to mitigate
          extreme heat.
          <br />
          <br />
          Heat disparity is a measure of the variation in heat severity across an urban area.
          Derived from the Landsat satellite imaging, heat severity is calculated using surface
          temperatures, which are a good indicator of where excess heat is generated in urban areas.
          To create this dataset, the highest extremities of summer 2022 surface temperatures were
          extracted from every 30-meter pixel across urban America.
        </div>
      ),
    },
    {
      image: "refined-canopy-goals.svg",
      name: "Refined Canopy Goals",
      description:
        "Refined Tree Equity Score canopy goals estimate what's possible in a neighborhood.",
      border: "goals_motif.svg",
      laptop: "goals_ds_final_900w.mp4",
      modal: (
        <div>
          Neighborhood tree canopy goals can inform tree planting efforts by estimating a minimum
          standard of tree cover appropriate to local urban ecologies. Goals are now better refined
          for desert, grassland, Mediterranean (new) and forest ecologies. A city neighborhood in a
          desert biome, or example, can support fewer trees than a city neighborhood in the forest
          biome, due to water constraints.
          <br />
          <br />
          In addition, goals now better estimate how much tree cover is possible in a neighborhood,
          using building footprints to proxy the density of the built environment. Densely built-up
          areas, downtowns, commercial and industrial districts offer less physical space to
          accommodate new tree plantings, and goals are scaled down accordingly. Calibrating tree
          canopy goals helps better reflect local conditions and ensures goals are fair, attainable
          and feasible wherever you live.
        </div>
      ),
    },
    {
      image: "compare-prioritize-scores.svg",
      name: "Compare & prioritize scores",
      description:
        "Richer comparison of Tree Equity Scores now possible with fine-tuned scoring methods.",
      border: "comp_scores_motif.svg",
      laptop: "compare_ds_final_900w.mp4",
      modal: (
        <div>
          Tree Equity Score covers cities and towns all across America. To accommodate the large
          nationwide variation in population characteristics and climate, scores are scaled
          regionally. These methods have always been built into Tree Equity Score.
          <br />
          <br />
          With fine-tuning to these methods, more meaningful comparison across city boundaries is
          possible within the same metropolitan hub. This improvement to Tree Equity Score
          introduces greater continuity from urban to suburban areas, and, with this new release,
          suburban scores can be expected to increase in many cases relative to urban scores.
          <br />
          <br />
          Be mindful that a score of 80, however, is not the same everywhere. Tree Equity Scores
          incorporate canopy targets that are calibrated to what's possible in the built
          environment. This ensures goals are fair, attainable and feasible wherever you live. As a
          result, comparison of a score of 80 with a high canopy target in a suburban area to a
          score of 80 with a more feasible canopy target in a dense urban area might require a
          review of more information than just the Tree Equity Score.
          <br />
          <br />
          Remember, any score below 100 indicates a tree canopy need. New defined priority levels
          now make getting started with understanding your score easier:
          <br />
          <br />
          <div className="flex flex-row w-fit">
            <div className="md:h-[110px] h-[93px] w-[27px] bg-gradient-to-b from-orange-400 via-orange-300 to-green-400 rounded-sm"></div>
            <div className="flex flex-col ml-2">
              <p className="text-white">
                <span className="text-[#6CC296] uppercase">highest:</span> 0-69
              </p>
              <p className="text-white">
                <span className="text-[#6CC296] uppercase">high:</span> 70-79
              </p>
              <p className="text-white">
                <span className="text-[#6CC296] uppercase">moderate:</span> 80-89
              </p>
              <p className="text-white">
                <span className="text-[#6CC296] uppercase">low:</span> 90-99
              </p>
              <p className="text-white">
                <span className="text-[#6CC296] uppercase">none:</span> 100 (enough trees)
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      image: "new-tree-canopy.svg",
      name: "New tree canopy",
      description:
        "We've partnered with Google to bring you the latest high-resolution tree canopy data.",
      border: "tree_canopy_motif.svg",
      laptop: "TC_ds_final_900w.mp4",
      modal: (
        <div>
          American Forests joined forces with Google to ensure that the tree canopy data in Tree
          Equity Score reflects&mdash;as closely as the data allows&mdash;what you see in your
          community. Tree Equity Score now integrates high-resolution, nationwide tree canopy data
          sourced from the Google Environmental Insights Explorer.
          <br />
          <br />
          Measuring where tree cover falls below a standard acceptable to support public health and
          wellbeing requires the best available tree canopy data. Tree Equity Score delivers a
          human-centered, standardized approach to filling gaps in the urban tree
          canopy&mdash;starting first in areas where trees can have the greatest impact to each
          community.
        </div>
      ),
    },
    {
      image: "new-census-data.svg",
      name: "New census data",
      description:
        "Tree Equity Score brings in the latest Census data to help get trees to those who need them most.",
      border: "census_motif.svg",
      laptop: "census_ds_final_900w.mp4",
      modal: (
        <div>
          Tree Equity is a movement supported by data. Each release of Tree Equity Score is informed
          by the best available science, incorporating the latest American Community Survey data and
          decennial U.S. Census updates.
          <br />
          <br />
          Tree Equity Score is a combined measure of tree canopy need and priority. Measures of
          priority help identify communities affected first and worst by climate change and
          environmental hazards, such as extreme heat and air pollution. The priority index built
          into Tree Equity Score comprises a range of data from Census, including income, race,
          health, unemployment, age, and with this new release, language barrier.
          <br />
          <br />
          In addition, Tree Equity Score's neighborhood boundaries now match the latest 2020 Census
          block group boundaries and urban area delineations.
        </div>
      ),
    },
    {
      image: "locate-your-address.svg",
      name: "Locate your address",
      description: "Use the new search bar to drop a pin on an address or place of interest.",
      border: "geocoder_motif.svg",
      laptop: "search_ds_final_900w.mp4",
      modal: (
        <div>
          Need help finding your Tree Equity Score? Our updated map interface makes that easier.
          <br />
          <br />
          Use the new search bar to get around the map. Now, you can enter an address or place of
          interest (e.g., a local school) to drop a pin on the map. You can also use the search bar
          to navigate quickly to a neighborhood (e.g., 'South Side, Chicago') or zip code.
        </div>
      ),
    },
    {
      image: "access-dynamic-reports.svg",
      name: "Access dynamic reports",
      description: "Find insights and scenario planning tools available in dynamic reports.",
      border: "reports_motif.svg",
      laptop: "reports_ds_final_900w.mp4",
      modal: (
        <div>
          What will it take to raise Tree Equity Scores? From valuable metrics, to interactive
          visualizations, to scenario assessment, dynamic reports provide insights for your region
          of interest and forecast the numerous health, climate and environmental benefits that can
          be gained by raising Tree Equity Scores within your community.
          <br />
          <br />
          Dynamic reports are available at four administrative scales: Locality (e.g., a town, city
          or village), County (new!), Congressional District and State. Find reports for any block
          group simply by clicking on the map. Or use the new Report Finder feature to search for
          reports anywhere in the U.S.
        </div>
      ),
    },
    {
      image: "new-help-widget.svg",
      name: "New help widget",
      description:
        "Need help getting the most out of Tree Equity Score? The new help widget offers guidance.",
      border: "help_motif.svg",
      laptop: "help_ds_final_900w.mp4",
      modal: (
        <div>
          The new help widget can help you make the most of the Tree Equity Score National Explorer.
          Step-by-step instructions in the Quick Start tab take you through each feature to help you
          get the best results and information to support your Tree Equity efforts.
          <br />
          <br />
          Find explanations and data sources in the Data Glossary for terms like, 'block group' and
          'health burden' to help you interpret and communicate the science behind your work to
          advance Tree Equity.
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen">
      <Head>
        <meta
          property="og:title"
          content="Tree Equity Score - The Next Generation - An American Forests Data Short"
          key="title"
        />
        <meta
          property="og:description"
          content="The next generation of Tree Equity Score is here. And it's better than ever... Take a tour and find out what's new."
          key="description"
        />
        <meta property="og:image" content="/tes2.0-social.jpg" key="image" />
        <meta
          property="og:url"
          content="https://datastories.americanforests.org/next-generation"
          key="url"
        />

        <link rel="icon" href="" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="min-h-[100vh] bg-gradient-to-b from-[#171717] to-[#343434] flex place-items-center">
        <div
          style={{
            fontFamily: "Open Sans",
          }}
          className="w-full m-auto text-center"
        >
          <p className="text-white md:text-[36px] text-2xl md:leading-snug md:pt-0 pt-3 font-black w-11/12 m-auto">
            The next generation of Tree Equity Score is here.
          </p>
          <p className="text-white md:text-sm text-xs font-semibold tracking-wider md:block hidden md:pt-2 md:pb-6">
            And it's better than ever...
          </p>
          <p className="text-[#26D780] font-semibold tracking-wider md:pb-6 pb-2 md:text-base text-xs md:pt-0 pt-1">
            Take a tour and find out what's new.
          </p>
          <div className="md:w-full w-11/12 m-auto flex justify-center items-center">
            <img alt="" src="/laptop-main-new.png" className="w-[550px]" />
          </div>
          <div className="title mx-auto md:mt-4 mt-1 w-11/12">
            <span className="text-neutral-400 text-xs leading-loose block lg:hidden">
              <i>Click or tap the buttons to explore.</i>
            </span>
            {hoveredButton && (
              <span className="text-white md:text-xl text-base font-semibold lg:block hidden">
                {hoveredButton.description}
              </span>
            )}
            {!hoveredButton && (
              <span className="text-neutral-400 text-sm leading-loose lg:block hidden">
                <i>Click or tap the buttons to explore.</i>
              </span>
            )}
          </div>
          <Dialog.Root>
            <div className="xl:w-4/5 lg:w-full sm:w-11/12 w-full md:pt-8 pt-0 m-auto grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 pb-6 md:pb-0 place-items-center text-center text-white text-xs font-bold tracking-wide">
              {buttonData.map((button, i) => {
                return (
                  <Dialog.Trigger asChild key={i}>
                    <button
                      className="w-[108px] md:h-[94px] h-[82px] flex flex-col justify-center items-center text-[10px] rounded-xl text-[#26D780] md:leading-snug leading-tight uppercase px-5 hover:bg-[#242424] bg-[#2B2B2B] shadow-[0px_0px_15px_rgba(0,0,0,0.5)] hover:shadow-none"
                      onClick={() => setSelectedButton(button)}
                      onMouseEnter={() => setHoveredButton(button)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <img
                        src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/${button.image}`}
                        className="mb-1"
                      />
                      {button.name}
                    </button>
                  </Dialog.Trigger>
                )
              })}
            </div>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-[#2D2D2D] opacity-80 z-40" />
              <Dialog.Content
                className="bg-[#151515] py-5 px-5 rounded-xl shadow max-h-[96vh] overflow-y-auto fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 xl:w-[40%] w-[94%]"
                style={{
                  fontFamily: "Open Sans",
                }}
              >
                {selectedButton && (
                  <div className="flex flex-col items-center p-4">
                    <Dialog.Close asChild>
                      <button
                        className="absolute top-2 right-2 opacity-50 hover:opacity-100"
                        aria-label="Close"
                      >
                        <XMarkIcon className="fill-white h-6 w-6" />
                      </button>
                    </Dialog.Close>{" "}
                    <img
                      className="md:w-[300px] w-[200px]"
                      src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/${selectedButton.border}`}
                    />
                    <p className="text-[#26D780] uppercase md:text-sm text-xs font-semibold tracking-wide pt-1">
                      {selectedButton.name}
                    </p>
                    <p className="text-white md:text-lg text-base text-center font-medium pt-3 pb-6">
                      {selectedButton.description}
                    </p>
                    <div className="md:h-[480px] h-[240px] md:mt-0 -mt-4">
                      <video
                        controls
                        loop
                        muted
                        autoPlay
                        className="mx-auto mb-8 md:h-[480px] h-[240px]"
                        src={`${STATIC_ASSETS_CLOUDFRONT_URL}/${selectedButton.laptop}`}
                      />
                    </div>
                    <div className="text-white md:text-base text-sm md:pt-6 pt-2 w-11/12">
                      {selectedButton.modal}
                    </div>
                  </div>
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* Footer */}

      <section className="text-center m-auto text-neutral-400 text-xs bg-[#343434]">
        <img className="h-16 text-center m-auto" src="/AF-Logo-Knockout-LtGreen-Horiz.png" />
        <p className="-mt-2">
          Story Credits: Article and design by&nbsp;
          <a
            href="https://www.americanforests.org/personnel/julia-twichell/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Julia Twichell
          </a>
          . Built by&nbsp;
          <a
            href="https://www.americanforests.org/personnel/geri-rosenberg/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Geri Rosenberg
          </a>
          &nbsp;and&nbsp;
          <a
            href="https://www.americanforests.org/personnel/chase-dawson/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Chase Dawson
          </a>
          . <br />
          Copyright <i className="fa-regular fa-copyright text-xs"></i> 2023 American Forests. All
          Rights Reserved.
          <br />
          <br />
        </p>
      </section>
    </div>
  )
}

TES2UpdatesStory.getLayout = (page) => (
  <Layout title={"Tree Equity Score - The Next Generation - An American Forests Data Short"}>
    {page}
  </Layout>
)
export default TES2UpdatesStory
