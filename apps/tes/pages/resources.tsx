import { useRouter } from "next/router";
import { BlitzPage } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import { ReactNode, useCallback, useState, useEffect } from "react"
import { AccordionItem, AccordionWithChildren } from "ui"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const tabs = [
  { label: "watch a demo", slug: "demo" },
  { label: "starter guide", slug: "starter-guide" },
  { label: "resources", slug: "resources" },
]

const EXPLORE = "Explore & Evaluate"
const BUILD = "Build Your Case"
const PLAN = "Plan a Project"
const FUND = "Get Funding"
const STRATEGY = "Strategic Planning"
const starterGuideTabs = [EXPLORE, BUILD, PLAN, FUND, STRATEGY]

const styles = {
  calloutBox: "p-4 bg-brand-blue-pale rounded-xl font-semibold mb-2",
  accordionItemPrimary:
    "text-gray-800 font-semibold md:text-title text-xl md:py-5 py-3 border-t-brand-blue-dark border-t-2 text-left md:leading-tight leading-tight",
  accordionItemSecondary:
    "text-brand-blue-dark font-semibold md:text-subtitle text-base md:py-3 py-2 border-t-gray-200 border-t pl-4 text-left",
  listNumber:
    "before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:left-4 before:text-white before:w-6 before:bg-brand-blue-dark before:rounded-full before:text-center before:font-semibold",
  smallListNumber:
    "before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:text-white before:bg-brand-blue-dark before:rounded-full before:text-center before:font-semibold before:text-sm before:w-5 before:h-5 before:text-annotation before:left-4",
}

const Tab = ({
  label,
  handleClick,
  isSelected,
  type = "triangle",
}: {
  label: string
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  isSelected: boolean
  type?: "triangle" | "box"
  shade?: string
}) => {
  const theme = {
    triangle:
      "font-semibold uppercase tracking-wider h-12 md:px-4 px-2 text-white lg:text-base sm:text-sm text-xs focus:outline-none ",
    box: "h-12 sm:p-8 p-2 lg:text-base sm:text-sm text-xs focus:outline-none flex items-center",
    isSelected: {
      triangle: "bg-brand-blue-dark",
      box: "text-brand-blue-dark bg-white",
    },
  }
  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`relative
      ${theme[type]}
      ${isSelected && theme.isSelected[type]}`}
      >
        {label}
      </button>
      {isSelected && type === "triangle" && (
        <div className="absolute bg-brand-blue-dark h-12 w-full bottom-triangle -bottom-[3rem]" />
      )}
    </div>
  )
}

const TopBox = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <section className="relative border-2 border-brand-blue-dark w-full md:px-12 px-4 md:py-8 py-4">
      <p className="absolute md:-top-7 -top-6 md:left-10 left-3 text-brand-blue-dark bg-white tracking-wider p-3 md:text-xl text-sm">
        {title}
      </p>
      <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-20 md:gap-10 gap-5 xl:px-10 px-2 py-2 font-medium md:text-base text-sm text-gray-800">
        {children}
      </div>
    </section>
  )
}

const DemoPanel = () => (
  <div>
    <div className="h-20"></div>
    <div className="m-auto lg:w-1/2 sm:w-11/12 w-full">
      <p className="uppercase font-bold text-brand-green-dark">DEMO</p>
      <p className="text-2xl pb-5">How to Use Tree Equity Score: A Step-by-Step Guide</p>
      <iframe
        width="100%"
        height="560vh"
        src="https://www.youtube.com/embed/njoZgKPuRQY?si=TxuHe1Kquy4xd5mk"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="h-10"></div>
      <p className="uppercase font-bold text-brand-green-dark">DEMO</p>
      <p className="text-2xl pb-5">
        Three Ways to Use Tree Equity Score Locations Insights: Part 1 - Planning
      </p>
      <iframe
        width="100%"
        height="560vh"
        src="https://www.youtube.com/embed/Nmn91XdIR0A?si=_RE9gWQvzVXpEqyW"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="h-10"></div>
      <p className="uppercase font-bold text-brand-green-dark">DEMO</p>
      <p className="text-2xl pb-5">
        Three Ways to Use Tree Equity Score Locations Insights: Part 2 - Advocacy
      </p>
      <iframe
        width="100%"
        height="560vh"
        src="https://www.youtube.com/embed/gLlXk1OYP_M?si=Ji0sYWDIBT_zZmw7"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)

const ResourcesPanel = () => (
  <section className="bg-gradient-to-t from-[#ECF5F2] to-white text-gray-700">
    <div className="h-20"></div>
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 m-auto">
      <p className="text-2xl font-bold uppercase pb-5 pl-5">Guides, tools and case studies</p>

      <a
        href={`${STATIC_ASSETS_CLOUDFRONT_URL}/TreeEquityScoreLocationInsights_GetStartedGuide.pdf`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Guide</p>
          <p className="lg:text-2xl text-xl pt-2">
            Get Started in Eight Steps: Tree Equity Score Location Insights
          </p>
          <p className="lg:text-lg text-base pt-2">
            A step-by-step guide to get the most out of your supercharged toolkit for every location
            in Tree Equity Score.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/guides/climate-health-action-guide/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Guide</p>
          <p className="lg:text-2xl text-xl pt-2">Climate and Health Action Guide</p>
          <p className="lg:text-lg text-base pt-2">
            Maximize the benefits of trees to address climate change and improve human health.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/how-the-newport-tree-conservancy-pivoted-to-tree-equity-and-built-new-funder-relationships/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Case Study</p>
          <p className="lg:text-2xl text-xl pt-2">
            How the Newport Tree Conservancy pivoted to Tree Equity and built new funder
            relationships
          </p>
          <p className="lg:text-lg text-base pt-2">
            Learn how the Newport Tree Conservancy in Newport, RI is using the Tree Equity Score
            Analyzer.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/how-the-providence-neighborhood-planting-program-fostered-community-leadership-in-low-canopy-communities/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Case Study</p>
          <p className="lg:text-2xl text-xl pt-2">
            How the Providence Neighborhood Planting Program fostered community leadership in low
            canopy communities
          </p>
          <p className="lg:text-lg text-base pt-2">
            Learn how the Providence Neighborhood Planting Program in Providence, RI is using the
            Tree Equity Score Analyzer.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/providence-ri-climate-health-adaptation-on-a-neighborhood-scale/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Case Study</p>
          <p className="lg:text-2xl text-xl pt-2">
            Climate and Health Adaptation on a Neighborhood Scale
          </p>
          <p className="lg:text-lg text-base pt-2">
            A case study in Providence, RI demonstrating application of the Climate and Health
            Action Guide framework and tree species selection guide.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/wordpress/wp-content/uploads/2020/09/RI_UrbanTreeSpecies_Handout_09302020.pdf"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Guide</p>
          <p className="lg:text-2xl text-xl pt-2">
            Climate and Health urban tree species guides (for select regions): Rhode Island
          </p>
          <p className="lg:text-lg text-base pt-2">
            A list of commonly planted trees in Rhode Island's urban areas that aid in seleting
            trees to reduce climate change vulnerability, reduce carbon dioxide in the atmosphere,
            and provide benefits to human health.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/assessment-tool/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Tool</p>
          <p className="lg:text-2xl text-xl pt-2">Community Assessment and Goal-Setting Tool</p>
          <p className="lg:text-lg text-base pt-2">
            The Community Assessment and Goal-Setting Tool will be most useful for people who are
            already somewhat familiar with their community's urban forest programs.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/guides/career-pathways-action-guide/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Guide</p>
          <p className="lg:text-2xl text-xl pt-2">Career Pathways Action Guide</p>
          <p className="lg:text-lg text-base pt-2">
            Achieve Tree Equity through urban forestry jobs training.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/guides/urban-wood-use-action-guide/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Guide</p>
          <p className="lg:text-2xl text-xl pt-2">Urban Wood Reuse Action Guide</p>
          <p className="lg:text-lg text-base pt-2">
            Using recovered and fresh-cut urban wood to build and sustain vibrant communities.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/rhode-island-tree-equity-funding-financing-and-policy-guide/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark lg:py-5 py-2 lg:px-10 px-4 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Guide</p>
          <p className="lg:text-2xl text-xl pt-2">
            RI Tree Equity Funding, Financing and Policy Guide
          </p>
          <p className="lg:text-lg text-base pt-2">
            This guide provides information on making the case for trees, nationally utilized urban
            forestry funding and policy mechanisms, as well as state and federal resources; it has
            national relevancy and application.
          </p>
        </div>
      </a>
    </div>
    <div className="h-20"></div>
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 m-auto">
      <p className="text-2xl font-bold uppercase pb-5 pl-5">Ordinances and policies</p>
      <a
        href="https://www.vibrantcitieslab.com/resources/making-your-community-forest-friendly-a-worksheet-for-review-of-municipal-codes-and-ordinances-august-2018/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Worksheet</p>
          <p className="lg:text-2xl text-xl pt-2">
            Making your community forest-friendly: A worksheet for review of municipal codes and
            ordinances August 2018
          </p>
          <p className="lg:text-lg text-base pt-2">
            This worksheet was designed to help communities review and revise their development
            regulations, so that future projects conserve and protect valuable trees and woodlands
            and encourage new plantings.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/gold-level-ordinance-template-chicago-region/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Ordinance</p>
          <p className="lg:text-2xl text-xl pt-2">Gold Level Ordinance Template - Chicago Region</p>
          <p className="lg:text-lg text-base pt-2">
            The Gold ordinance includes the same criteria of the Silver ordinance but also provides
            for regulation of the urban forest on private property.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/sample-urban-forest-management-ordinances-and-plans-for-the-chicago-region/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Ordinance</p>
          <p className="lg:text-2xl text-xl pt-2">
            Sample Urban Forest Management Ordinances and Plans for the Chicago Region
          </p>
          <p className="lg:text-lg text-base pt-2">
            Ordinances are the framework for community cooperation and expectation.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/charlotte-tree-ordinances/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Ordinance</p>
          <p className="lg:text-2xl text-xl pt-2">Charlotte Tree Ordinances</p>
          <p className="lg:text-lg text-base pt-2">
            Comprehensive and detailed, these ordinances not only preserve existing trees, but lay
            out specific rules for development, construction and maintenance of trees on both public
            and private trees.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/fairfax-county-tree-planting-and-preservation-ordinance/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Ordinance</p>
          <p className="lg:text-2xl text-xl pt-2">
            Fairfax County Tree Planting and Preservation Ordinance
          </p>
          <p className="lg:text-lg text-base pt-2">
            Highly-developed, early 20th-century suburb looks to restore its canopy.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/san-antonio-tree-preservation-ordinance/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Ordinance</p>
          <p className="lg:text-2xl text-xl pt-2">San Antonio Tree Preservation Ordinance</p>
          <p className="lg:text-lg text-base pt-2">
            Multi-purpose plan aims at multiple objectives, including stormwater management.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/athens-clarke-county-tree-ordinance/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Ordinance</p>
          <p className="lg:text-2xl text-xl pt-2">Athens-Clarke County Tree Ordinance</p>
          <p className="lg:text-lg text-base pt-2">
            The ordinance strives to maintain at least 45% canopy cover in Athens-Clarke County. It
            works towards this goal by requiring the conservation and replanting of the tree canopy
            and street and parking lot trees during development.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/from-policy-to-reality-model-ordinances-for-sustainable-development/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Guide</p>
          <p className="lg:text-2xl text-xl pt-2">
            From Policy to Reality: Model Ordinances for Sustainable Development
          </p>
          <p className="lg:text-lg text-base pt-2">
            Addresses how ordinances can be used to introduce Low Impact Development concepts into
            subdivision design.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/resources/worksheet-for-review-of-municipal-codes-and-ordinances/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Worksheet</p>
          <p className="lg:text-2xl text-xl pt-2">
            Worksheet for Review of Municipal Codes and Ordinances
          </p>
          <p className="lg:text-lg text-base pt-2">
            This worksheet was designed to help communities review and revise their development
            regulations, so that future projects conserve and protect valuable trees and woodlands
            and encourage new plantings.
          </p>
        </div>
      </a>
      <a
        href="https://www.vibrantcitieslab.com/wordpress/wp-content/uploads/2020/09/RI_UrbanTreeSpecies_Handout_09302020.pdf"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border-2 border-brand-blue-dark py-5 px-10 hover:shadow-lg mb-5">
          <p className="font-bold text-brand-blue-dark uppercase">Guide</p>
          <p className="lg:text-2xl text-xl pt-2">
            Urban Forestry Best Management Practicies for Public Works Managers: Ordinances,
            Regulations and Public Policies
          </p>
          <p className="lg:text-lg text-base pt-2">
            This guide is intended to introduce communities to the myriad of regulatory tools
            available to assist in the proactive management of the urban forest.
          </p>
        </div>
      </a>
    </div>
    <div className="h-10"></div>
  </section>
)

const StarterGuidePanel = () => {
  const [activeTab, setActiveTab] = useState(BUILD)
  const handleTabSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement
    setActiveTab(target.innerText)
  }
  return (
    <>
      <div className="w-full m-auto flex flex-row justify-center items-center bg-brand-blue-dark text-white">
        {starterGuideTabs.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            handleClick={handleTabSelection}
            isSelected={activeTab === tab}
            type="box"
          />
        ))}
      </div>
      <div className="xl:w-1/2 lg:w-4/5 w-11/12 mx-auto">
        {activeTab === EXPLORE && <ExploreAndEvaluateSubpanel />}
        {activeTab === BUILD && <BuildYourCaseSubpanel />}
        {activeTab === PLAN && <PlanAProjectSubpanel />}
        {activeTab === FUND && <GetFundingSubpanel />}
        {activeTab === STRATEGY && <StrategicPlanningSubpanel />}
      </div>
    </>
  )
}

const ExploreAndEvaluateSubpanel = () => (
  <>
    <section className="lg:pt-24 pt-10 lg:pb-16 pb-10">
      <p className="uppercase text-brand-blue-dark font-bold md:text-caption text-xs">
        TREE EQUITY SCORE USE CASE
      </p>
      <p className="md:text-headline text-2xl md:leading-tight font-medium text-gray-800">
        Explore Tree Equity Score in your location{" "}
      </p>
    </section>
    <section className="mb-16">
      <TopBox title="Get the most out of Tree Equity Score">
        <div>
          <p
            className="text-caption
                text-brand-blue-dark font-medium uppercase"
          >
            objectives
          </p>
          <ul className="list-disc">
            <li className="pt-2 ml-5">Uncover the story of Tree Equity in your community.</li>
            <li className="pt-2 ml-5">
              Identify the areas in your community that are most in need of trees.
            </li>
          </ul>
        </div>
        <div>
          <p
            className="text-caption
                text-brand-blue-dark font-medium uppercase"
          >
            How can I use the information?
          </p>
          <p className="pt-2">
            Assist your community to ask and answer questions. Find information to persuasively tell
            your community's story.
          </p>
        </div>
      </TopBox>
    </section>
    <section className="md:text-base text-sm font-medium text-gray-800">
      <AccordionWithChildren className="border-b-2 border-b-brand-blue-dark">
        <AccordionItem
          title="Overview"
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Find out where trees are needed most. You can use Tree Equity Score data to complement
              your own knowledge, stories and experiences, making it easier for others to understand
              and connect with your narratives.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Your familiarity with your community can enrich the information in Tree Equity
                Score, providing essential context and deeper understanding.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Tree Equity Score provides a robust national standard to support the observations
                made by you and other community members. It offers credibility and provides a
                foundation for discussions about the state of the urban forest.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                When taking the next steps to plan tree planting and tree care activities, it is
                recommended to conduct in-person site assessment and seek input from local experts
                and community members. This helps ensure that actions are tailored to the specific
                needs and characteristics of each neighborhood.
              </li>
            </ol>
          </div>
        </AccordionItem>
        <AccordionItem
          title="Step 1. Get started."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="pl-4 pb-4 pt-2 pr-4">
            To begin, find your score in the Tree Equity Score National Explorer. Simply enter a
            location in the search bar or zoom and pan the map until you locate your area of
            interest. Many people start by exploring the map in the area where they live or work.
          </p>
          <AccordionWithChildren>
            <AccordionItem
              title="Navigate the map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  To navigate to a location, simply type a location into the search bar such as an
                  address, place name, town or state, and select an option that matches from the
                  list. Or simply zoom and pan the map.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Continue to navigate the map by zooming and dragging it to center your location of
                  interest.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over shaded areas on the map to view scores for different
                  locations.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Each locality (for example, a town, city or village) is assigned a Composite
                  Score. This score provides a simplified assessment of overall tree distribution
                  fairness within a community.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  As you zoom in, localities will subdivide into Census block groups&#8212;each with
                  a unique Tree Equity Score indicating the geographic pattern of tree canopy need
                  within your community. Lower Tree Equity Scores indicate greater tree canopy need.
                  Scores of 100 indicate areas with enough trees.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  To learn more details about an area within your locality, simply click on a block
                  group to highlight it. Additional information about your highlighted block group
                  will appear in the sidebar, including the measures of tree canopy, demographics,
                  health, and environment that determine its Tree Equity Score.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="What is a Tree Equity Score?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every Census block group within urban areas of
                  the U.S. The score is a measure ranging from 0 to 100 to highlight inequitable
                  access to trees.
                </li>
                <li className="pt-2 ml-8">
                  A score of 100 (green) means a neighborhood (Census block group) already has
                  enough trees.
                </li>
                <li className="pt-2 ml-8">
                  A lower score (orange) indicates a greater priority for tree planting, based on a
                  combination of factors including tree canopy coverage and social, climate and
                  health priorities.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="What is a block group?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every block group within U.S. urban areas.
                </li>
                <li className="pt-2 ml-8">
                  A Census block group, sometimes colloquially referred to as a "neighborhood," is a
                  small geographic area used in the United States Census. A block group typically
                  contains between 600 and 3,000 people, but the actual population can vary.
                </li>
                <li className="pt-2 ml-8">
                  Block groups provide a way of organizing and grouping people who live relatively
                  close to one other and have relatively similar population characteristics for the
                  purpose of collecting and analyzing demographic information.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 2. Compare neighborhoods. "
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Once you have centered the map on your area, click over the shaded areas to view Tree
              Equity Scores.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                How does your score relate to others nearby? Observe your neighborhood's level of
                tree cover. How does it compare to areas nearby?
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Scan the map for neighborhoods with low scores. Are you familiar with these areas?
                Do you notice a lack of trees in those areas?
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Consider the potential reasons for the lack of trees, such as urban development
                practices, zoning policies or access to community resources. What observations can
                you make about the environmental, health and social impacts?
              </li>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Decode the block group rank "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Every locality (e.g., a town, city or village) has a unique landscape of Tree
                  Equity Scores. The block group rank helps you quickly identify areas in your
                  community with the lowest rank and greatest priority.
                </li>
                <li className="pt-2 ml-8">
                  For each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block groups ranked "1st" have the highest Tree Equity Scores (usually
                  100), meaning those locations have enough trees.
                </li>
                <li className="pt-2 ml-8">
                  The bigger the rank, the lower the Tree Equity Score. A block group ranked 270th
                  out of 271 block groups, for example, can be considered among the highest priority
                  within a locality based on Tree Equity Score.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Understand the tree canopy goal "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  The red status bar at the bottom of the sidebar represents the canopy cover goal
                  for the highlighted block group. It shows the current canopy cover level as a
                  measure of progress, with a gap indicating the amount of additional tree canopy
                  needed to reach the goal.
                </li>
                <li className="pt-2 ml-8">
                  The canopy cover goal represents a minimum percentage of tree canopy required to
                  deliver the requisite benefits of trees to a block group, adjusted based on
                  natural biome and building density.
                </li>
                <li className="pt-2 ml-8">
                  Block groups with canopy cover that meets or surpasses their tree canopy goal are
                  assigned a Tree Equity Score of 100.
                </li>
                <li className="pt-2 ml-8">
                  Tree canopy goals represent a minimum standard of tree cover for all neighborhoods
                  that is considered appropriate to local urban ecologies and are not based on goals
                  set by cities.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 3. Challenge your assumptions with data."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="pl-4 pb-4 pt-2">
            Click on a neighborhood on the map for more information. As you explore, consider how
            the information compares to what you already know or didn't know about your area.
          </p>
          <ol className="[counter-reset:list-number] relative">
            <li className={`pb-3 pl-12 ${styles.listNumber}`}>
              Which neighborhoods need trees the most?
            </li>
            <li className={`pb-3 pl-12 ${styles.listNumber}`}>
              As you explore different areas, note how the tree canopy and community characteristics
              change. What does this tell you about why one neighborhood scores differently than
              another?
            </li>
            <li className={`pb-3 pl-12 ${styles.listNumber}`}>
              Which community characteristics have the strongest influence your neighborhood Tree
              Equity Score?
            </li>
          </ol>
          <p className="pl-4 pb-4">
            These details can help you effectively communicate the story of where trees are your
            community, using data to support your observations.
          </p>
          <AccordionWithChildren>
            <AccordionItem
              title="Determine a block group's priority level"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Each locality is subdivided into Census block groups&#8212;each with a unique Tree
                  Equity Score indicating the geographic pattern of tree canopy need within your
                  community. Scores of 100 indicate areas with enough trees. The lower the Tree
                  Equity Score, the greater tree canopy need and thus the greater the priority.
                </li>
                <li className="pt-2 ml-8">
                  Tree Equity Score priority levels are defined to provide a broad decision aid to
                  help you interpret your Tree Equity Score. Priority levels are mapped directly
                  from Tree Equity Scores: Highest (0-69), High (70-79), Moderate (80-89), Low
                  (90-99), None (100). You may choose to adjust the prioritization in your community
                  based on your unique range of Tree Equity Scores and other relevant local
                  information.
                </li>
                <li className="pt-2 ml-8">
                  Within each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block group ranks help you make comparisons only among block groups in the
                  same community. The block group rank serves as an additional tool to easily
                  identify areas of higher priority within a community.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Decipher the spider chart "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  Tree Equity Score is a combined measure of tree canopy need and an index comprised
                  of seven priority indicators. The spider chart, also known as a radar chart,
                  provides a visual breakdown of the indicators that influence the score for each
                  block group.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Axes: The spider chart consists of multiple axes radiating from a central point,
                  like spokes on a wheel. Each axis represents a different priority indicator. Each
                  axis is a scale that represents the range of each indicator value for the locality
                  overall (all indicators are standardized for visual comparison).
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Data points: Priority indicator values for your highlighted block group are mapped
                  as red points along each axis. The position of the dot reveals where the data
                  points fall within the overall range of values within the locality. The further
                  the point is from the center of the chart, the more that indicator contributes to
                  lowering the Tree Equity Score for the block group.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Shape: All data points are connected with lines, forming a shaded web shape within
                  the spider chart. In general, the larger the shaded area, the lower the Tree
                  Equity Score and higher the priority. Comparing the shape of the spider web across
                  different block groups can help you relatively quickly assess the drivers of Tree
                  Equity Score.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Once you learn how to read it, the spider chart is a valuable tool to gain
                  insights. Quickly assess patterns for different variables in your locality. Tease
                  out the variables that have the most influence on Tree Equity Score for each
                  priority block group.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 4. Consider regional patterns."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="pl-4 pb-3 pt-2">
            All across America, it is common to find trees distributed unequally in our cities and
            towns. Use Tree Equity Score to shift the narrative away from isolated “problem”
            neighborhoods and highlight the systemic disparities in tree cover that exist at a large
            scale.
          </p>
          <p className="pl-4 pb-3">
            Drawing attention to the broader patterns can help connect your community's unique story
            to the bigger narrative. Maps can serve as evidence of these patterns. Open the Layers
            menu and toggle between thematic map layers, such as heat disparity or people in
            poverty. You may need to zoom out to see larger patterns.
          </p>
          <ol className="[counter-reset:list-number] relative">
            <li className={`pb-3 pl-12 ${styles.listNumber}`}>
              How does each thematic map relate to what you already know or didn't know about your
              area?
            </li>
            <li className={`pb-3 pl-12 ${styles.listNumber}`}>
              Which patterns align most with patterns in tree canopy?
            </li>
            <li className={`pb-3 pl-12 ${styles.listNumber}`}>
              Which community characteristics are noteworthy as reasons to focus on certain areas?
            </li>
            <li className={`pb-3 pl-12 ${styles.listNumber}`}>
              Which community characteristics emerge as as the strongest drivers of low Tree Equity
              Scores in your area?
            </li>
          </ol>
          <AccordionWithChildren>
            <AccordionItem
              title="Explore map layers "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Think of a map layer as a sheet of paper in a stack. Each layer represents
                different information, stacked one above the other. By toggling different layers on
                or off, you can choose what information, or "sheet," you want to see on the map. Map
                layers can help you gain a deeper understanding of the patterns and trends unique to
                your area.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Layers,” then click on one of the layers in the list to change the layer
                  view.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over the shaded areas on the map to view data for the selected
                  layer in a pop-up.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Exploring the map layers can help you gain insights into geographic patterns and
                  the hidden story behind tree canopy distribution in your area. Toggle through
                  layers for each specific variable to see how it relates to the tree canopy
                  distribution.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Export a map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Maps are highly versatile and can be used to convey the need for Tree Equity and
                highlight the benefits to members of the community. They can be useful in a number
                of ways, including in grant applications, presentations to the town board, fliers
                for a tree planting event, conversations local stakeholders and community members.
              </p>
              <p className="pl-4 font-medium text-sm">Print a PDF of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  On the top-left corner of the map, click on camera button.
                </li>
                <li className="pt-2 ml-8">
                  This will capture a screenshot of the map, and prompt you to save a PDF on your
                  computer.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Copy/save an image of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Right click on the map, and select "Copy Image" (available on most browsers).
                </li>
                <li className="pt-2 ml-8">Paste the image into your document or slide deck.</li>
                <li className="pt-2 ml-8">
                  Or select "Save Image As" and import the image into your document or slide deck.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Take a screenshot on your device</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">On Windows, press Alt + PrtScn to capture the screen.</li>
                <li className="pt-2 ml-8">
                  For Mac, press Command-Shift-3 to capture the entire screen.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
      </AccordionWithChildren>
    </section>
    {/* <section className="text-brand-blue-dark py-12">
      <p className="text-title ">Take it beyond Tree Equity Score</p>
      <div className="flex justify-between pt-8">
        <Link legacyBehavior href={""}>
          <div className="flex gap-6 items-center cursor-pointer">
            <img src="/icons/resources.svg" className="w-10 h-10" />
            <span className="uppercase font-semibold tracking-wide">
              TREE EQUITy <br />
              CurricULUM
            </span>
          </div>
        </Link>
        <Link legacyBehavior href={""}>
          <div className="flex gap-6 items-center cursor-pointer">
            <img src="/icons/resources.svg" className="w-10 h-10" />
            <span className="uppercase font-semibold tracking-wide">
              TREE EQUITy <br />
              CurricULUM
            </span>
          </div>
        </Link>
        <Link legacyBehavior href={""}>
          <div className="flex gap-6 items-center cursor-pointer">
            <img src="/icons/resources.svg" className="w-10 h-10" />
            <span className="uppercase font-semibold tracking-wide">
              TREE EQUITy <br />
              CurricULUM
            </span>
          </div>
        </Link>
      </div>
    </section> */}
  </>
)

const BuildYourCaseSubpanel = () => (
  <>
    <section className="lg:pt-24 pt-10 lg:pb-16 pb-10">
      <p className="uppercase text-brand-blue-dark font-bold md:text-caption text-xs">
        TREE EQUITY SCORE USE CASE
      </p>
      <p className="md:text-headline text-2xl md:leading-tight font-medium">
        Build your case for greater investment in Tree Equity
      </p>
    </section>
    <section className="mb-16">
      <TopBox title="Get the most out of Tree Equity Score">
        <div>
          <p
            className="text-caption
                text-brand-blue-dark font-medium uppercase"
          >
            objectives
          </p>
          <ul className="list-disc">
            <li className="pt-2 ml-5">
              Locate priority areas, that is, neighborhoods affected first and worst by climate and
              environmental hazards.
            </li>
            <li className="pt-2 ml-5">Find impactful data to underline your cause.</li>
            <li className="pt-2 ml-5">
              Build a strong case for investment, policy change and other actions.
            </li>
          </ul>
        </div>
        <div>
          <p
            className="text-caption
                text-brand-blue-dark font-medium uppercase"
          >
            How can I use the information?
          </p>
          <p className="pt-2">
            Write an op-ed, drum up press coverage, create a petition, contact your local elected
            official, present to a local council, testify at a public hearing, build support for a
            tree ordinance, create outreach/educational materials and more.
          </p>
        </div>
      </TopBox>
    </section>
    <section className="md:text-base text-sm font-medium text-gray-800">
      <AccordionWithChildren className="border-b-2 border-b-brand-blue-dark">
        <AccordionItem
          title="Overview"
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Tree Equity Score data can be a powerful tool whether you're interacting with the
              media, elected officials or your neighbors. Tree Equity Score offers a national
              standard for identifying areas in need of investment, and robust information to build
              your case. By combining data with storytelling, you can convey the importance of Tree
              Equity issues and advocate for investment and policy changes in your community.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Weave data into stories about people. For example, tell stories about a tree
                planting project, share experiences of residents, or highlight how a town government
                is prioritizing urban forestry. Use Tree Equity Score to support your story. By
                incorporating data, you can add credibility and evidence to your message.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Keep it simple and focus on a few compelling data points that reinforce your story.
                Concise and impactful data can underline the importance of your cause.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Use visual aids can make the information more accessible and engaging.
              </li>
            </ol>
          </div>
        </AccordionItem>
        <AccordionItem
          title="Step 1. Get started."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="pl-4 pb-4 pt-2 pr-4">
            To begin, find your score in the Tree Equity Score National Explorer. Simply enter a
            location in the search bar or zoom and pan the map until you locate your area of
            interest. Many people start by exploring the map in the area where they live or work.
          </p>
          <AccordionWithChildren>
            <AccordionItem
              title="Navigate the map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  To navigate to a location, simply type a location into the search bar such as an
                  address, place name, town or state, and select an option that matches from the
                  list. Or simply zoom and pan the map.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Continue to navigate the map by zooming and dragging it to center your location of
                  interest.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over shaded areas on the map to view scores for different
                  locations.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Each locality (for example, a town, city or village) is assigned a Composite
                  Score. This score provides a simplified assessment of overall tree distribution
                  fairness within a community.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  As you zoom in, localities will subdivide into Census block groups&#8212;each with
                  a unique Tree Equity Score indicating the geographic pattern of tree canopy need
                  within your community. Lower Tree Equity Scores indicate greater tree canopy need.
                  Scores of 100 indicate areas with enough trees.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  To learn more details about an area within your locality, simply click on a block
                  group to highlight it. Additional information about your highlighted block group
                  will appear in the sidebar, including the measures of tree canopy, demographics,
                  health, and environment that determine its Tree Equity Score.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="What is a Tree Equity Score?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every Census block group within urban areas of
                  the U.S. The score is a measure ranging from 0 to 100 to highlight inequitable
                  access to trees.
                </li>
                <li className="pt-2 ml-8">
                  A score of 100 (green) means a neighborhood (Census block group) already has
                  enough trees.
                </li>
                <li className="pt-2 ml-8">
                  A lower score (orange) indicates a greater priority for tree planting, based on a
                  combination of factors including tree canopy coverage and social, climate and
                  health priorities.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="What is a block group?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every block group within U.S. urban areas.
                </li>
                <li className="pt-2 ml-8">
                  A Census block group, sometimes colloquially referred to as a "neighborhood," is a
                  small geographic area used in the United States Census. A block group typically
                  contains between 600 and 3,000 people, but the actual population can vary.
                </li>
                <li className="pt-2 ml-8">
                  Block groups provide a way of organizing and grouping people who live relatively
                  close to one other and have relatively similar population characteristics for the
                  purpose of collecting and analyzing demographic information.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 2. Locate priority areas. "
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Tree Equity Score simplifies the process of locating areas affected first and worst by
              climate and environmental hazards. Examine the map for the lowest scores. Then,
              explore additional information to locate areas most in need of trees.
            </p>
            <p className="pl-4 pb-4 pt-2">
              Here's how to use the information in Tree Equity Score to locate priority areas:
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">Priority level and rank:</span> These measures can
                help you interpret your score.
              </li>
              <ul className="list-disc pl-12 pr-4">
                <li className="ml-8">
                  <span className="font-semibold">Priority level: </span>Is a neighborhood
                  classified as highest, high, moderate or low priority?
                </li>
                <li className="pt-2 ml-8">
                  <span className="font-semibold">Block group rank: </span>How does your score rank
                  against the scores in your locality? An area labeled as moderate priority could
                  have the lowest score in its town or city. This makes it a high priority in that
                  locality.
                </li>
              </ul>
              <img src="/Priority-Rank.png" className="h-28 ml-12" />
              <li className={`pb-2 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">Custom prioritization:</span> As context for your
                score, consider measures like heat severity, poverty rates or health burden.
                Activate different map layers, then, use map filters to isolate patterns.
              </li>
              <ul className="list-disc pb-4 pl-12 pr-4">
                <li className="ml-8">
                  Which block groups have above-average heat, for example? Activate the heat
                  disparity layer, then slide the corresponding filter to exclude areas with
                  below-average temperatures.
                </li>
                <li className="pt-2 ml-8">
                  Once you set a filter cutoff (e.g., heat disparity greater than +5 degrees),
                  document that number to show why you prioritized select areas.
                </li>
                <li className="pt-2 ml-8">
                  Tree Equity Score provides a wealth of information beyond the score itself.
                  Sometimes, other map layers can help you visualize local priorities and contexts.
                  Consider all the data available to inform your decisions.
                </li>
              </ul>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Determine a block group's priority level"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Each locality is subdivided into Census block groups&#8212;each with a unique Tree
                  Equity Score indicating the geographic pattern of tree canopy need within your
                  community. Scores of 100 indicate areas with enough trees. The lower the Tree
                  Equity Score, the greater tree canopy need and thus the greater the priority.
                </li>
                <li className="pt-2 ml-8">
                  Tree Equity Score priority levels are defined to provide a broad decision aid to
                  help you interpret your Tree Equity Score. Priority levels are mapped directly
                  from Tree Equity Scores: Highest (0-69), High (70-79), Moderate (80-89), Low
                  (90-99), None (100). You may choose to adjust the prioritization in your community
                  based on your unique range of Tree Equity Scores and other relevant local
                  information.
                </li>
                <li className="pt-2 ml-8">
                  Within each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block group ranks help you make comparisons only among block groups in the
                  same community. The block group rank serves as an additional tool to easily
                  identify areas of higher priority within a community.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Decode the block group rank "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Every locality (e.g., a town, city or village) has a unique landscape of Tree
                  Equity Scores. The block group rank helps you quickly identify areas in your
                  community with the lowest rank and greatest priority.
                </li>
                <li className="pt-2 ml-8">
                  For each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block groups ranked "1st" have the highest Tree Equity Scores (usually
                  100), meaning those locations have enough trees.
                </li>
                <li className="pt-2 ml-8">
                  The bigger the rank, the lower the Tree Equity Score. A block group ranked 270th
                  out of 271 block groups, for example, can be considered among the highest priority
                  within a locality based on Tree Equity Score.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Explore map layers"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Think of a map layer as a sheet of paper in a stack. Each layer represents
                different information, stacked one above the other. By toggling different layers on
                or off, you can choose what information, or "sheet," you want to see on the map. Map
                layers can help you gain a deeper understanding of the patterns and trends unique to
                your area.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Layers,” then click on one of the layers in the list to change the layer
                  view.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over the shaded areas on the map to view data for the selected
                  layer in a pop-up.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Exploring the map layers can help you gain insights into geographic patterns and
                  the hidden story behind tree canopy distribution in your area. Toggle through
                  layers for each specific variable to see how it relates to the tree canopy
                  distribution.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Filter map layers"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                A map filter is a tool that allows you to narrow down or prioritize the information
                displayed on the map based on specific criteria. Map filters help you focus on the
                geographic areas that are most relevant to your needs or interests.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Filters” to open the filter menu.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Adjust the sliders from either end or enter cutoff values. The filter will modify
                  the map display accordingly, "filtering out" the areas that do not meet your
                  criteria, and leaving only the areas that match visible on the map. You can set
                  one or more filters.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Filters will remain applied even if you close the filters menu change the map
                  layers. Tap “Reset” to set the sliders back to their original positions.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Map filters are a deceptively simple tool with a myriad of uses! Use filters to
                  minimize the amount of information your brain has to process. Use filters to look
                  for patterns and isolate areas of interest. Filters are a helpful tool to make
                  informed decisions. Test prioritization criteria against your local knowledge of
                  an area. You can also filter Tree Equity Score based on issues that are important
                  locally, for example by setting the heat disparity filter to identify
                  neighborhoods endangered by extreme heat.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 3. Gather supporting information."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4 pt-2">
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-4 pl-12 ${styles.listNumber}`}>
                <p>
                  On the map, click on each neighborhood to load more information in the side panel.
                  Take note of the Tree Equity Score, community characteristics and tree canopy
                  values. Each data point helps explain why and how scores differ:
                </p>
                <div className="pl-4">
                  <ul className="list-disc pb-4 pl-4">
                    <li className="pt-2 ml-2">
                      <span className="font-semibold">Tree canopy:</span> Compare the current canopy
                      cover (how much tree cover an area has) and canopy gap (how much more tree
                      cover an area needs).
                    </li>
                    <li className="pt-2 ml-2">
                      <span className="font-semibold">Community measures:</span> Understand the
                      characteristics of communities impacted by low tree cover.
                    </li>
                    <li className="pt-2 ml-2">
                      <span className="font-semibold">Health burden index:</span> The higher the
                      value, the more residents reporting mental and physical health issues, asthma,
                      and heart disease.
                    </li>
                    <li className="pt-2 ml-2">
                      <span className="font-semibold">Heat disparity:</span> Show the variance from
                      the average heat severity for the urban area.
                    </li>
                  </ul>
                </div>
                <p className="md:ml-0 -ml-4 pb-2">For example:</p>

                <table className="md:ml-0 -ml-4 text-left md:w-72 w-full border-b-2 border-brand-blue-dark">
                  <thead className="border-b-2 border-t-2 font-medium text-xs border-brand-blue-dark">
                    <tr>
                      <th scope="col" className="px-2 py-2">
                        Metric
                      </th>
                      <th scope="col" className="px-2 py-2 text-center">
                        Neighborhood A
                      </th>
                    </tr>
                  </thead>
                  <tbody className="md:text-sm text-xs font-semibold">
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Tree Equity Score
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">51</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Tree canopy cover
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">2%</td>
                    </tr>
                    <tr className="">
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        People of color
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">72%</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        People in poverty
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">17%</td>
                    </tr>
                    <tr className="">
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Heat disparity
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">+12 degrees</td>
                    </tr>
                  </tbody>
                </table>
                <p className="md:ml-0 -ml-4 pt-2 md:text-sm text-xs font-normal">
                  *To summarize metrics for a group of neighborhoods, record information from the
                  sidebar for each neighborhood, then take the average or the range of values for
                  the group.
                </p>
              </li>
              <li className={`pb-4 pl-12 ${styles.listNumber}`}>
                <p>
                  Make a comparison between a low-scoring neighborhood and a high-scoring
                  neighborhood. How does the community character and tree canopy differ?
                </p>

                <p className="md:ml-0 -ml-4 pb-2 pt-4">For example:</p>
                <table className="md:ml-0 -ml-4 text-left md:w-96 w-full border-b-2 border-brand-blue-dark">
                  <thead className="border-b-2 border-t-2 font-medium text-xs border-brand-blue-dark">
                    <tr>
                      <th scope="col" className="px-2 py-2">
                        Metric
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-center md:hyphen-none hyphen-manual"
                      >
                        Neighbor&shy;hood A
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-center md:hyphen-none hyphen-manual"
                      >
                        Neighbor&shy;hood B
                      </th>
                    </tr>
                  </thead>
                  <tbody className="md:text-sm text-xs font-semibold">
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Tree Equity Score
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">51</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">100</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Tree canopy cover
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">2%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">58%</td>
                    </tr>
                    <tr className="">
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        People of color
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">72%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">28%</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        People in poverty
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">17%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">1%</td>
                    </tr>
                    <tr className="">
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Heat disparity
                      </td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        +12 degrees
                      </td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        -4 degrees
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="md:ml-0 -ml-4 pt-2 md:text-sm text-xs font-normal">
                  *To summarize metrics for a group of neighborhoods, record information from the
                  sidebar for each neighborhood, then compare the average or the range of values for
                  the group.
                </p>
              </li>
              <li className={`pb-4 pl-12 ${styles.listNumber}`}>
                <p className="pb-4">
                  To effectively make your case, tell stories about people and weave in data as
                  evidence. This will help your audience connect to your story and deliver your
                  message impactfully.
                </p>
                <p className={styles.calloutBox}>
                  Meet Juanita and her four children, who call Neighborhood A their home. Their
                  community has a Tree Equity Score of 51, and a meager 2% tree cover. It's a
                  striking contrast to the affluent Neighborhood B across town. With a score of 100
                  and 58% tree cover, lush trees line the sidewalks.
                  <span className="pt-4 block">
                    The differences between these two neighborhoods go beyond tree cover. In
                    Juanita's neighborhood, 72% of the residents are people of color, with 17%
                    facing the challenges of poverty. The summers here can be brutal, with
                    temperatures soaring 12 degrees above the area's average. In Neighborhood B, 72%
                    of the residents are white, and only 1% endure poverty. Their summers are
                    comparatively milder, with temperatures averaging 4 degrees cooler.
                  </span>
                  <span className="pt-4 block">
                    These stark disparities in tree cover and living conditions highlight the urgent
                    need to address Tree Equity. Juanita's neighborhood, with its lower Tree Equity
                    Score and lack of green canopy, faces environmental injustices that affect the
                    well-being and quality of life of its residents. As we tell Juanita's story,
                    it's important to remember that these numbers are not just statistics but
                    crucial indicators of the systemic challenges faced by communities like hers.
                    It's time to take action and ensure equitable access to trees, clean air, shade
                    and a healthy environment.
                  </span>
                </p>
              </li>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Understand the tree canopy goal"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  The red status bar at the bottom of the sidebar represents the canopy cover goal
                  for the highlighted block group. It shows the current canopy cover level as a
                  measure of progress, with a gap indicating the amount of additional tree canopy
                  needed to reach the goal.
                </li>
                <li className="pt-2 ml-8">
                  The canopy cover goal represents a minimum percentage of tree canopy required to
                  deliver the requisite benefits of trees to a block group, adjusted based on
                  natural biome and building density.
                </li>
                <li className="pt-2 ml-8">
                  Block groups with canopy cover that meets or surpasses their tree canopy goal are
                  assigned a Tree Equity Score of 100.
                </li>
                <li className="pt-2 ml-8">
                  Tree canopy goals represent a minimum standard of tree cover for all neighborhoods
                  that is considered appropriate to local urban ecologies and are not based on goals
                  set by cities.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Decipher the spider chart"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  Tree Equity Score is a combined measure of tree canopy need and an index comprised
                  of seven priority indicators. The spider chart, also known as a radar chart,
                  provides a visual breakdown of the indicators that influence the score for each
                  block group.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Axes: The spider chart consists of multiple axes radiating from a central point,
                  like spokes on a wheel. Each axis represents a different priority indicator. Each
                  axis is a scale that represents the range of each indicator value for the locality
                  overall (all indicators are standardized for visual comparison).
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Data points: Priority indicator values for your highlighted block group are mapped
                  as red points along each axis. The position of the dot reveals where the data
                  points fall within the overall range of values within the locality. The further
                  the point is from the center of the chart, the more that indicator contributes to
                  lowering the Tree Equity Score for the block group.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Shape: All data points are connected with lines, forming a shaded web shape within
                  the spider chart. In general, the larger the shaded area, the lower the Tree
                  Equity Score and higher the priority. Comparing the shape of the spider web across
                  different block groups can help you relatively quickly assess the drivers of Tree
                  Equity Score.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Once you learn how to read it, the spider chart is a valuable tool to gain
                  insights. Quickly assess patterns for different variables in your locality. Tease
                  out the variables that have the most influence on Tree Equity Score for each
                  priority block group.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 4. Discuss the larger context."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              What is the larger narrative of Tree Equity in your town, city, county, congressional
              district or state? Use Tree Equity Score to highlight systemic disparities in tree
              cover on a broader scale and demonstrate how your local cause relates to these broader
              patterns.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-4 pl-12 ${styles.listNumber}`}>
                <p className="pb-4">
                  Click on a block group to generate a list of the reports for your area, then
                  choose a report, for example your county report. From the top sections of the
                  report, gather the summary information.
                </p>
                <p className="md:ml-0 -ml-4">For example:</p>
                <table className="md:ml-0 -ml-4 text-left md:w-[500px] w-full border-b-2 border-brand-blue-dark mt-2">
                  <thead className="border-b-2 border-t-2 font-medium text-xs border-brand-blue-dark">
                    <tr>
                      <th scope="col" className="px-2 py-2">
                        Metric
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-center sm:hyphens-none hyphens-manual"
                      >
                        Neighbor&shy;hood A
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-center sm:hyphens-none hyphens-manual"
                      >
                        Smith&shy;field <br /> (Average; Range)
                      </th>
                      <th scope="col" className="px-2 py-2 text-center">
                        York County <br /> (Average; Range)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="md:text-sm text-xs font-semibold">
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Tree Equity Score
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">51</td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        90; 51-100
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">51-100</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Tree canopy cover{" "}
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">2%</td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        14%; 2-68%
                      </td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        34%; 2-72%
                      </td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        People of color
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">72%</td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        66%; 28-92%
                      </td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        54%; 0-96%
                      </td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        People in poverty{" "}
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">17%</td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        21%; 0-65%
                      </td>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1 text-center">
                        17%; 0-65%
                      </td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Health burden index
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">44</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">12-68</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">6-72</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Total population
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">1,752</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">16,863</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">61,265</td>
                    </tr>
                  </tbody>
                </table>
                <p className="md:ml-0 -ml-4 md:text-sm text-xs font-normal pb-1">
                  *Please note that summaries are for urban areas only, and rural areas are not
                  included.
                </p>
                <p className="md:ml-0 -ml-4 md:text-sm text-xs font-normal pb-6">
                  *Certain metrics are not available in the report. Return to the map to find
                  ranges. Activate specific map layers and and view data points in hover popups. Or
                  apply map filters to isolate the highest and lowest values in an area.
                </p>
                <p className={styles.calloutBox}>
                  Juanita's neighborhood not only has the lowest Tree Equity Score in Smithfield,
                  but the fewest trees in the county, with just 2% tree cover.
                </p>
              </li>
              <li className={`pb-4 pl-12 ${styles.listNumber}`}>
                <p className="pb-3">
                  Maps can serve as evidence of regional patterns. Compare different thematic
                  patterns side-by-side. How do the different patterns interconnect? As you toggle
                  between different thematic map layers, you might need to zoom out on the map to
                  observe broader geographic patterns.
                </p>
              </li>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Access dynamic reports"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-3 pr-4">
                Dynamic reports can help you communicate what it takes to raise Tree Equity Scores
                at a regional level. Dynamic reports are available at four administrative scales:
                Locality (e.g., a town, city or village), County, Congressional District and State.
                Each report provides valuable summary metrics, interactive visualizations to help
                you gain insights for your area of interest, and computational tools to help you
                assess scenarios and highlight the numerous benefits that can be gained by raising
                Tree Equity Scores within your community.
              </p>
              <p className="pl-4 font-medium text-sm">From the map</p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                  Click on a shaded block group on the map. The "Dynamic Reports" menu will open in
                  the upper right corner, showing all available reports for the highlighted block
                  group.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  Choose a scale: Dynamic reports are available at up to four administrative scales
                  from every block group: Locality (e.g., a town, city or village), County,
                  Congressional District and State (always listed in that order).
                </li>
                <li className={`pb-5 pl-10 ${styles.smallListNumber}`}>
                  Click on a link to open a dynamic report.
                </li>
              </ol>
              <p className="pl-4 font-medium text-sm pb-2">
                Alternatively, you can search for reports anywhere in the United States. Click
                "Search all reports."
              </p>
              <p className="pl-4 font-normal text-sm">
                <i>To search for dynamic reports by the name of a locality, county or state:</i>
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                  Open the "Locality, county or state reports" tab.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  Start typing the name of a locality, county or state into the search bar.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Select the best match from the list to open the dynamic report.
                </li>
              </ol>
              <p className="pl-4 font-normal text-sm">
                <i>To search for congressional district reports:</i>
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                  Open the "Congressional district reports" tab.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  Select your state from the dropdown menu.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  Optionally, select a city to narrow the results.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Choose a district from the list to open the dynamic report.
                </li>
              </ol>
              <p className="pl-4 font-normal text-sm pb-2">
                If you don't know your district, return to the map. Use the search bar located in
                the upper left of the map to search for your address. Click on your block group. Now
                your district report will display in the "Reports" menu.
              </p>
            </AccordionItem>
            <AccordionItem
              title="Interpret the demographic summary"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  When you open a dynamic report, the first section provides an overview of
                  population characteristics to help you understand the demographic context of the
                  urban areas in your selected geography.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  The summary is specific to the coverage of Tree Equity Score, which includes only
                  the urban areas within each locality, county, congressional district and state, as
                  defined by Census.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Explore map layers "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Think of a map layer as a sheet of paper in a stack. Each layer represents
                different information, stacked one above the other. By toggling different layers on
                or off, you can choose what information, or "sheet," you want to see on the map. Map
                layers can help you gain a deeper understanding of the patterns and trends unique to
                your area.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Layers,” then click on one of the layers in the list to change the layer
                  view.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over the shaded areas on the map to view data for the selected
                  layer in a pop-up.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Exploring the map layers can help you gain insights into geographic patterns and
                  the hidden story behind tree canopy distribution in your area. Toggle through
                  layers for each specific variable to see how it relates to the tree canopy
                  distribution.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Export a map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Maps are highly versatile and can be used to convey the need for Tree Equity and
                highlight the benefits to members of the community. They can be useful in a number
                of ways, including in grant applications, presentations to the town board, fliers
                for a tree planting event, conversations local stakeholders and community members.
              </p>
              <p className="pl-4 font-medium text-sm">Print a PDF of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  On the top-left corner of the map, click on camera button.
                </li>
                <li className="pt-2 ml-8">
                  This will capture a screenshot of the map, and prompt you to save a PDF on your
                  computer.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Copy/save an image of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Right click on the map, and select "Copy Image" (available on most browsers).
                </li>
                <li className="pt-2 ml-8">Paste the image into your document or slide deck.</li>
                <li className="pt-2 ml-8">
                  Or select "Save Image As" and import the image into your document or slide deck.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Take a screenshot on your device</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">On Windows, press Alt + PrtScn to capture the screen.</li>
                <li className="pt-2 ml-8">
                  For Mac, press Command-Shift-3 to capture the entire screen.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 5. Gather visuals. "
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="py-4 pl-4">
              Visual aids can make your storytelling easier to understand and help connect with your
              audience.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <p>
                  <span className="font-semibold">Comparison photos:</span> Create side-by-side
                  photos of a neighborhood with abundant tree cover and one with inadequate tree
                  cover. If you can't visit the neighborhoods, use Google Street View photos
                  instead.
                </p>
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <p>
                  <span className="font-semibold">
                    Before-and-after photos or artist renderings:
                  </span>{" "}
                  Show before-and-after photos of greening projects or artist renderings to show how
                  these projects can transform neighborhoods.
                </p>
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <p>
                  <span className="font-semibold">Maps:</span> Create a series of maps to show how
                  different thematic patterns interconnect. Maps can help shift the narrative away
                  from isolated “problem” neighborhoods and highlight the systemic disparities in
                  tree cover that exist at a large scale.
                </p>
              </li>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Export a map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Maps are highly versatile and can be used to convey the need for Tree Equity and
                highlight the benefits to members of the community. They can be useful in a number
                of ways, including in grant applications, presentations to the town board, fliers
                for a tree planting event, conversations local stakeholders and community members.
              </p>
              <p className="pl-4 font-medium text-sm pr-4">Print a PDF of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  On the top-left corner of the map, click on camera button.
                </li>
                <li className="pt-2 ml-8">
                  This will capture a screenshot of the map, and prompt you to save a PDF on your
                  computer.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm pr-4">Copy/save an image of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Right click on the map, and select "Copy Image" (available on most browsers).
                </li>
                <li className="pt-2 ml-8">Paste the image into your document or slide deck.</li>
                <li className="pt-2 ml-8">
                  Or select "Save Image As" and import the image into your document or slide deck.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm pr-4">Take a screenshot on your device</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">On Windows, press Alt + PrtScn to capture the screen.</li>
                <li className="pt-2 ml-8">
                  For Mac, press Command-Shift-3 to capture the entire screen.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 6. Define key terms. "
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="py-4 pl-4 pr-4">
            Go to our{" "}
            <a
              href="/methodology"
              className="text-brand-green"
              target="_blank"
              rel="noreferrer noopener"
            >
              Methods & Data
            </a>{" "}
            page for definitions and guidance to help you communicate the science that powers Tree
            Equity Score.
          </p>
        </AccordionItem>
      </AccordionWithChildren>
    </section>
  </>
)
const PlanAProjectSubpanel = () => (
  <div>
    <section className="lg:pt-24 pt-10 lg:pb-16 pb-10">
      <p className="uppercase text-brand-blue-dark font-bold md:text-caption text-xs">
        TREE EQUITY SCORE USE CASE
      </p>
      <p className="md:text-headline text-2xl md:leading-tight font-medium">
        Plan and implement a project
      </p>
    </section>
    <section className="mb-16">
      <TopBox title="Get the most out of Tree Equity Score">
        <div>
          <p
            className="text-caption
          text-brand-blue-dark font-medium uppercase"
          >
            objectives
          </p>
          <ul className="list-disc">
            <li className="pt-2 ml-5">Design a data-driven project plan.</li>
            <li className="pt-2 ml-5">
              Make informed decisions about where to plant new urban trees and/or maintain and care
              for existing urban trees.
            </li>
            <li className="pt-2 ml-5">Gather data to support a project proposal. </li>
          </ul>
        </div>
        <div>
          <p
            className="text-caption
          text-brand-blue-dark font-medium uppercase"
          >
            How can I use the information?
          </p>
          <p className="pt-2">
            Locate priority areas for tree planting, tree giveaways, public works & greening
            projects, tree watering, pruning, mulching and other maintenance. Organize locations for
            volunteer program activities. Identify neighborhoods for targeted outreach and community
            engagement.
          </p>
        </div>
      </TopBox>
    </section>
    <section className="md:text-base text-sm font-medium text-gray-800">
      <AccordionWithChildren className="border-b-2 border-b-brand-blue-dark">
        <AccordionItem
          title="Overview"
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Plan your projects with the help of Tree Equity Score. Use data to find project
              locations that maximize your impact to the community.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Tree Equity Score provides a robust national standard to complement and reinforce
                your existing knowledge about an area. It can fill gaps in your understanding and
                add credibility to your project plan.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Establish and document prioritization criteria for your project by leveraging Tree
                Equity Score. The National Explorer offers user-friendly tools to evaluate and
                select these criteria.
              </li>

              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                When taking the next steps to plan tree planting and tree care activities, it is
                recommended to conduct in-person site assessment and seek input from local experts
                and community members. This helps ensure that actions are tailored to the specific
                needs and characteristics of each neighborhood.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Remember, equity means meeting a community with the resources that they identify as
                essential for their well-being and ability to thrive. Building meaningful
                relationships, conducting outreach and forming community partnerships are essential
                aspects of any successful Tree Equity project. By combining data-driven planning
                with deep community engagement, you can develop projects that make a positive impact
                for your neighborhood and beyond.
              </li>
            </ol>
          </div>
        </AccordionItem>
        <AccordionItem
          title="Step 1. Get oriented."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="pl-4 pb-4 pt-2 pr-4">
            Tree Equity Score offers rigorous data to support identification of areas with the
            greatest need for investment in the urban forest. Start by scanning the map for
            neighborhoods with the lowest scores. You can also identify neighborhoods based on other
            factors like extreme heat, poverty rates or vulnerable populations. Open the Layers menu
            to examine other patterns on the map.
          </p>
          <AccordionWithChildren>
            <AccordionItem
              title="Navigate the map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  To navigate to a location, simply type a location into the search bar such as an
                  address, place name, town or state, and select an option that matches from the
                  list. Or simply zoom and pan the map.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Continue to navigate the map by zooming and dragging it to center your location of
                  interest.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over shaded areas on the map to view scores for different
                  locations.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Each locality (for example, a town, city or village) is assigned a Composite
                  Score. This score provides a simplified assessment of overall tree distribution
                  fairness within a community.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  As you zoom in, localities will subdivide into Census block groups&#8212;each with
                  a unique Tree Equity Score indicating the geographic pattern of tree canopy need
                  within your community. Lower Tree Equity Scores indicate greater tree canopy need.
                  Scores of 100 indicate areas with enough trees.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  To learn more details about an area within your locality, simply click on a block
                  group to highlight it. Additional information about your highlighted block group
                  will appear in the sidebar, including the measures of tree canopy, demographics,
                  health, and environment that determine its Tree Equity Score.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="What is a Tree Equity Score?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every Census block group within urban areas of
                  the U.S. The score is a measure ranging from 0 to 100 to highlight inequitable
                  access to trees.
                </li>
                <li className="pt-2 ml-8">
                  A score of 100 (green) means a neighborhood (Census block group) already has
                  enough trees.
                </li>
                <li className="pt-2 ml-8">
                  A lower score (orange) indicates a greater priority for tree planting, based on a
                  combination of factors including tree canopy coverage and social, climate and
                  health priorities.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="What is a block group?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every block group within U.S. urban areas.
                </li>
                <li className="pt-2 ml-8">
                  A Census block group, sometimes colloquially referred to as a "neighborhood," is a
                  small geographic area used in the United States Census. A block group typically
                  contains between 600 and 3,000 people, but the actual population can vary.
                </li>
                <li className="pt-2 ml-8">
                  Block groups provide a way of organizing and grouping people who live relatively
                  close to one other and have relatively similar population characteristics for the
                  purpose of collecting and analyzing demographic information.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Explore map layers "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Think of a map layer as a sheet of paper in a stack. Each layer represents
                different information, stacked one above the other. By toggling different layers on
                or off, you can choose what information, or "sheet," you want to see on the map. Map
                layers can help you gain a deeper understanding of the patterns and trends unique to
                your area.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Layers,” then click on one of the layers in the list to change the layer
                  view.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over the shaded areas on the map to view data for the selected
                  layer in a pop-up.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Exploring the map layers can help you gain insights into geographic patterns and
                  the hidden story behind tree canopy distribution in your area. Toggle through
                  layers for each specific variable to see how it relates to the tree canopy
                  distribution.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 2. Develop prioritization criteria."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              With Tree Equity Score, you can leverage several tools to select prioritization
              criteria. Setting numerical criteria can demonstrate to funders, boards, donors and
              other stakeholders why specific project locations were chosen. Backing your approach
              with data can communicate your objectives more clearly and gain buy-in for the work.
            </p>
            <p className="pl-4 pb-4">
              Here's how to utilize data in Tree Equity Score to establish prioritization criteria:
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">Tree Equity Score prioritization:</span> Use Tree
                Equity Score as your prioritization system, with the help of these tips:
              </li>
              <ul className="list-disc pl-12 pr-4">
                <li className="ml-8">
                  <span className="font-semibold">Priority level and block group rank:</span> Start
                  by identifying the lowest priority level(s) in your focus area (whether highest,
                  high, moderate, or low). Next, look at how each neighborhood ranks in your
                  municipality. A block group listed as a "moderate" priority, for example, could be
                  ranked as one of the lowest in its locality. This might make it a high priority in
                  the context of your locality.
                </li>
                <img src="/Priority-Rank.png" className="h-28 ml-2 -mt-2" />
                <li className="ml-8 pb-5 -mt-2">
                  <span className="font-semibold">Tree Equity Score filter:</span> Test cutoffs
                  using the Tree Equity Score map filter. Note down the maximum filter value (e.g.,
                  a score of 85) to explain which neighborhoods were selected. The choice of cutoff
                  depends on your capacity, budget and local context. For instance, if you aim to
                  narrow down to one neighborhood, you may set a lower score cutoff than if you were
                  selecting five neighborhoods.
                </li>
              </ul>

              <li className={`pb-2 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">Custom prioritization:</span> Tailor your criteria
                by considering specific factors like heat severity, poverty rates or health burden.
                Open the Layers menu to visualize geographic patterns. Then, use map filters
                individually or in combination to narrow your focus based on numerical criteria.
              </li>
              <ul className="list-disc pb-4 pl-12 pr-4">
                <li className="ml-8">
                  Suppose you aim to maximize the impact of your tree distribution events to get
                  trees to residents of color in neighborhoods hit hard by extreme summer heat. To
                  achieve this, use two map filters simultaneously: "heat disparity" and "people of
                  color." Record your custom criteria, which will serve as guide in selecting target
                  areas for your events.
                </li>
                <li className="pt-2 ml-8">
                  Tree Equity Score provides a wealth of information beyond the score itself. Tailor
                  your strategies to reflect local priorities and contexts, utilizing the rigorous
                  data available to support your decisions.
                </li>
              </ul>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Determine a block group's priority level"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Each locality is subdivided into Census block groups&#8212;each with a unique Tree
                  Equity Score indicating the geographic pattern of tree canopy need within your
                  community. Scores of 100 indicate areas with enough trees. The lower the Tree
                  Equity Score, the greater tree canopy need and thus the greater the priority.
                </li>
                <li className="pt-2 ml-8">
                  Tree Equity Score priority levels are defined to provide a broad decision aid to
                  help you interpret your Tree Equity Score. Priority levels are mapped directly
                  from Tree Equity Scores: Highest (0-69), High (70-79), Moderate (80-89), Low
                  (90-99), None (100). You may choose to adjust the prioritization in your community
                  based on your unique range of Tree Equity Scores and other relevant local
                  information.
                </li>
                <li className="pt-2 ml-8">
                  Within each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block group ranks help you make comparisons only among block groups in the
                  same community. The block group rank serves as an additional tool to easily
                  identify areas of higher priority within a community.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Decode the block group rank "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Every locality (e.g., a town, city or village) has a unique landscape of Tree
                  Equity Scores. The block group rank helps you quickly identify areas in your
                  community with the lowest rank and greatest priority.
                </li>
                <li className="pt-2 ml-8">
                  For each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block groups ranked "1st" have the highest Tree Equity Scores (usually
                  100), meaning those locations have enough trees.
                </li>
                <li className="pt-2 ml-8">
                  The bigger the rank, the lower the Tree Equity Score. A block group ranked 270th
                  out of 271 block groups, for example, can be considered among the highest priority
                  within a locality based on Tree Equity Score.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Filter map layers"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                A map filter is a tool that allows you to narrow down or prioritize the information
                displayed on the map based on specific criteria. Map filters help you focus on the
                geographic areas that are most relevant to your needs or interests.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Filters” to open the filter menu.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Adjust the sliders from either end or enter cutoff values. The filter will modify
                  the map display accordingly, "filtering out" the areas that do not meet your
                  criteria, and leaving only the areas that match visible on the map. You can set
                  one or more filters.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Filters will remain applied even if you close the filters menu change the map
                  layers. Tap “Reset” to set the sliders back to their original positions.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Map filters are a deceptively simple tool with a myriad of uses! Use filters to
                  minimize the amount of information your brain has to process. Use filters to look
                  for patterns and isolate areas of interest. Filters are a helpful tool to make
                  informed decisions. Test prioritization criteria against your local knowledge of
                  an area. You can also filter Tree Equity Score based on issues that are important
                  locally, for example by setting the heat disparity filter to identify
                  neighborhoods endangered by extreme heat.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 3. Screen project locations."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Ensure that the sites you target align with your priority areas&#8212;whether
              identifying tree planting sites; screening addresses for a tree giveaway, door-to-door
              outreach or a direct mail campaign; siting public works & greening projects; screening
              individual trees for watering, pruning, mulching and other maintenance activities; or
              something else.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Enter a street address or place of interest (e.g., “Kapalama Elementary School”)
                into the search bar.
              </li>
              <li className={`pb-2 pl-12 ${styles.listNumber}`}>
                Does the project location (indicated by a pin) fall within a neighborhood that meets
                the Tree Equity Score criteria established in Step 2?
              </li>
              <li className={`pb-2 pl-12 ${styles.listNumber}`}>If yes, the location qualifies.</li>
              <li className={`pb-2 pl-12 ${styles.listNumber}`}>
                If no, the location does not qualify.
              </li>
            </ol>
            <p className="pl-4 pb-4 pt-2">Be sure to document your screening approach.</p>
          </div>
        </AccordionItem>
        <AccordionItem
          title="Step 4. Estimate impact."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Many of our users have asked for help estimating the ecosystem services of planting or
              protecting a specific number of trees. We're working on a block group scenario planner
              to do just this, coming next year. Until then, here's how to hack the scenario planner
              to get a rough estimate!
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Click on the block group where you propose to plant or protect trees. Open the first
                available report, usually the town/city report, or the county report if the location
                is unincorporated.
              </li>
              <li className={`pb-2 pl-12 ${styles.listNumber}`}>
                Locate the slider feature within the report and slide it until the "trees needed"
                value (found below the slider to the left) is as close as possible to the number of
                trees you want to estimate, let's say 50 trees.
              </li>
              <li className={`pb-2 pl-12 ${styles.listNumber}`}>
                When your tree count roughly matches 50, the panel below will display the estimated
                benefits directly for that tree count. In some cases, the slider may only go as low
                as 113 trees, for instance. In such cases, you can divide the panel estimates below
                in half for a rough estimate, or scale proportionally as desired.
              </li>

              <li className={`pb-2 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">Please note:</span> All benefits listed in the panel
                are directly generated from the tree count, allowing for creative repurposing for
                tree count estimations. The tree count is estimated from the total canopy area, and
                assumes a 600 sq-ft (medium-sized) tree. Keep in mind that ecosystem service
                calculations are based on localized estimates from iTree, so it is crucial to make
                your estimations based on the report that corresponds to the specific block group
                for your planting or tree care location.
              </li>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Explore scenarios (slider)"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The green Tree Equity Score slider is a computational tool designed to help you
                explore what it takes to raise Tree Equity Scores in your selected geography.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  <span className="font-medium">Set the minimum score:</span> Move the slider to set
                  a minimum Tree Equity Score for all block groups in your chosen area. The default
                  target score is 75, but you can adjust it to your preference.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">Watch the data update below:</span> As you adjust
                  the slider, the following information will automatically change:
                </li>
                <ul className="list-disc pb-4 font-normal text-sm pr-4 ml-8">
                  <li className="pt-2 ml-8">
                    <span className="font-medium">
                      Number of block groups currently below the target score:
                    </span>{" "}
                    How many areas currently have scores lower than your chosen minimum.
                  </li>
                  <li className="pt-2 ml-8">
                    <span className="font-medium">Planting need:</span> The estimated number of new
                    trees required to raise all neighborhoods to your target score. The calculation
                    assumes an average urban tree with a canopy area of 600 square feet (55.74
                    square meters) and a crown width of 25-30 feet.
                  </li>
                  <li className="pt-2 ml-8">
                    <span className="font-medium">Benefits of adding new trees:</span> The economic,
                    health, and environmental advantages associated with planting the identified
                    number of new trees.
                  </li>
                </ul>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Understand the tree canopy benefits"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The benefits panel is a computational tool designed to help you communicate the
                critical health, economic and environmental benefits of raising Tree Equity Scores.
              </p>
              <ol className="[counter-reset:list-number] relative font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  <span className="font-medium">Set the minimum score:</span> Adjust the slider to
                  set a minimum Tree Equity Score for all block groups in your selected geography.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">View the benefits:</span> As you move the slider,
                  the benefits of adding new trees will automatically update in the benefits panel
                  below. These are annual benefits and include the economic, health and
                  environmental advantages associated with planting the estimated number of new
                  trees.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">Learn more:</span> Each benefit measure is explained
                  in detail in the information tooltip. You can access this tooltip in the lower
                  right of each benefit bubble.
                </li>
              </ol>
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The benefit measures in the calculator are designed to help you effectively
                communicate the value of planting and protecting urban trees. They can be valuable
                in presentations, grant applications, community engagement materials and
                conversations with stakeholders and community members.
              </p>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 5. Gather visuals."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Create a visual record of your target neighborhoods by taking a screenshot of your
              map. Use maps in your presentations, reports and outreach materials to visually
              communicate your selected priority areas to community members, funders, board members
              and other stakeholders.
            </p>
            <p className="pl-4 pb-4 pt-2">
              Tip: Use a basic image-editing program to label project locations, geographic
              landmarks and main roads. This simple addition can make the map more user-friendly and
              help people interpret the information.
            </p>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Export a map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Maps are highly versatile and can help communicate patterns in tree inequity. They
                can be useful in a number of ways, including in grant applications, presentations to
                the town board, fliers for a tree planting event, conversations local stakeholders
                and community members.
              </p>
              <p className="pl-4 font-medium text-sm">Print a PDF of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  On the top-left corner of the map, click on camera button.
                </li>
                <li className="pt-2 ml-8">
                  This will capture a screenshot of the map, and prompt you to save a PDF on your
                  computer.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Copy/save an image of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Right click on the map, and select "Copy Image" (available on most browsers).
                </li>
                <li className="pt-2 ml-8">Paste the image into your document or slide deck.</li>
                <li className="pt-2 ml-8">
                  Or select "Save Image As" and import the image into your document or slide deck.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Take a screenshot on your device</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">On Windows, press Alt + PrtScn to capture the screen.</li>
                <li className="pt-2 ml-8">
                  For Mac, press Command-Shift-3 to capture the entire screen.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
      </AccordionWithChildren>
    </section>
  </div>
)
const GetFundingSubpanel = () => (
  <div>
    <section className="lg:pt-24 pt-10 lg:pb-16 pb-10">
      <p className="uppercase text-brand-blue-dark font-bold md:text-caption text-xs">
        TREE EQUITY SCORE USE CASE
      </p>
      <p className="md:text-headline text-2xl md:leading-tight font-medium text-gray-800">
        Write a competitive funding proposal
      </p>
    </section>
    <section className="mb-16">
      <TopBox title="Get the most out of Tree Equity Score">
        <div>
          <p
            className="text-caption
          text-brand-blue-dark font-medium uppercase"
          >
            objectives
          </p>
          <ul className="list-disc">
            <li className="pt-2 ml-5">
              Leverage data to showcase the rationale behind the selection of project locations.
            </li>
            <li className="pt-2 ml-5">
              Compute metrics to communicate the benefits of tree planting.
            </li>
            <li className="pt-2 ml-5">
              Compile supporting data to present a well-informed and persuasive case.
            </li>
          </ul>
        </div>
        <div>
          <p
            className="text-caption
          text-brand-blue-dark font-medium uppercase"
          >
            How can I use the information?
          </p>
          <p className="pt-2">
            Gather data to reinforce a competitive Tree Equity funding proposal for tree planting,
            tree maintenance activities, tree protection, tree giveaways, staffing, targeted
            community outreach, comprehensive planning, scientific research and more.
          </p>
        </div>
      </TopBox>
    </section>
    <section className="md:text-base text-sm font-medium text-gray-800">
      <AccordionWithChildren className="border-b-2 border-b-brand-blue-dark">
        <AccordionItem
          title="Overview"
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Leverage Tree Equity Score data to bolster your case to funders and convey the
              importance and urgency of addressing Tree Equity issues. Tree Equity Score offers a
              robust national standard for identifying areas in need of investment, adding
              credibility and impact to your funding proposal.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Ensure that your plan is objective, not subjective. Utilize National Explorer tools
                to document a data-driven approach to your planning process.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Provide context. Illustrate the larger scale patterns that your project is
                addressing. Your familiarity with your community also enriches the information in
                Tree Equity Score, providing essential context and deeper understanding.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Communicate measurable impacts to provide strong reasons for funding your project.
                Every project, no matter how small, can contribute to achieving longer term Tree
                Equity goals. Leverage data to demonstrate who will benefit, and how.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Building meaningful relationships, conducting outreach and forming community
                partnerships are essential aspects of any successful Tree Equity project. A strong
                proposal will combine a data-driven approach with a concrete plan for partnering and
                engaging with your community.
              </li>
            </ol>
          </div>
        </AccordionItem>
        <AccordionItem
          title="Step 1. Get oriented."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="pl-4 pb-4 pt-2 pr-4">
            Tree Equity Score offers rigorous data to support identification of areas with the
            greatest need for investment in the urban forest. Start by scanning the map for
            neighborhoods with the lowest scores. You can also identify neighborhoods based on other
            factors like extreme heat, poverty rates or vulnerable populations. Open the Layers menu
            to examine other patterns on the map.
          </p>
          <AccordionWithChildren>
            <AccordionItem
              title="Navigate the map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  To navigate to a location, simply type a location into the search bar such as an
                  address, place name, town or state, and select an option that matches from the
                  list. Or simply zoom and pan the map.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Continue to navigate the map by zooming and dragging it to center your location of
                  interest.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over shaded areas on the map to view scores for different
                  locations.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Each locality (for example, a town, city or village) is assigned a Composite
                  Score. This score provides a simplified assessment of overall tree distribution
                  fairness within a community.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  As you zoom in, localities will subdivide into Census block groups&#8212;each with
                  a unique Tree Equity Score indicating the geographic pattern of tree canopy need
                  within your community. Lower Tree Equity Scores indicate greater tree canopy need.
                  Scores of 100 indicate areas with enough trees.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  To learn more details about an area within your locality, simply click on a block
                  group to highlight it. Additional information about your highlighted block group
                  will appear in the sidebar, including the measures of tree canopy, demographics,
                  health, and environment that determine its Tree Equity Score.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="What is a Tree Equity Score?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every Census block group within urban areas of
                  the U.S. The score is a measure ranging from 0 to 100 to highlight inequitable
                  access to trees.
                </li>
                <li className="pt-2 ml-8">
                  A score of 100 (green) means a neighborhood (Census block group) already has
                  enough trees.
                </li>
                <li className="pt-2 ml-8">
                  A lower score (orange) indicates a greater priority for tree planting, based on a
                  combination of factors including tree canopy coverage and social, climate and
                  health priorities.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="What is a block group?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every block group within U.S. urban areas.
                </li>
                <li className="pt-2 ml-8">
                  A Census block group, sometimes colloquially referred to as a "neighborhood," is a
                  small geographic area used in the United States Census. A block group typically
                  contains between 600 and 3,000 people, but the actual population can vary.
                </li>
                <li className="pt-2 ml-8">
                  Block groups provide a way of organizing and grouping people who live relatively
                  close to one other and have relatively similar population characteristics for the
                  purpose of collecting and analyzing demographic information.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Explore map layers "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Think of a map layer as a sheet of paper in a stack. Each layer represents
                different information, stacked one above the other. By toggling different layers on
                or off, you can choose what information, or "sheet," you want to see on the map. Map
                layers can help you gain a deeper understanding of the patterns and trends unique to
                your area.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Layers,” then click on one of the layers in the list to change the layer
                  view.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over the shaded areas on the map to view data for the selected
                  layer in a pop-up.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Exploring the map layers can help you gain insights into geographic patterns and
                  the hidden story behind tree canopy distribution in your area. Toggle through
                  layers for each specific variable to see how it relates to the tree canopy
                  distribution.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 2. Demonstrate prioritization criteria."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              With Tree Equity Score, you can leverage several tools that simplify the selection of
              prioritization criteria. Setting numerical criteria can demonstrate to funders how
              specific project locations were or will be chosen. Backing your approach with data can
              help you to communicate your objectives and make a persuasive case.
            </p>
            <p className="pl-4 pb-4">
              Here's how to utilize data in Tree Equity Score to establish prioritization criteria:
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">Tree Equity Score prioritization:</span> Use Tree
                Equity Score as your prioritization system, with the help of these tips:
              </li>
              <ul className="list-disc pb-4 pl-12 pr-4">
                <li className="ml-8">
                  <span className="font-semibold">Priority level and block group rank:</span> Start
                  by identifying the lowest priority level(s) in your focus area (whether highest,
                  high, moderate, or low). Next, look at how each neighborhood ranks in your
                  municipality. A block group listed as a "moderate" priority, for example, could be
                  ranked as one of the lowest in its locality. This might make it a high priority in
                  the context of your locality.
                </li>
                <img src="/Priority-Rank.png" className="h-28 ml-2 -mt-2" />
                <li className="ml-8 pb-2 -mt-2">
                  <span className="font-semibold">Tree Equity Score filter:</span> Test cutoffs
                  using the Tree Equity Score map filter. Note down the maximum filter value (e.g.,
                  a score of 85) to explain the rationale for proposing to do work in these
                  neighborhoods. The choice of cutoff depends on your capacity, budget and local
                  context. For instance, if you aim to narrow down to one neighborhood, you may set
                  a lower score cutoff than if you were selecting five neighborhoods.
                </li>
              </ul>
              <li className={`pb-2 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">Custom prioritization:</span> Tailor your criteria
                by considering specific factors like heat severity, poverty rates or health burden.
                Open the Layers menu to visualize geographic patterns. Then, use map filters
                individually or in combination to narrow your focus based on numerical criteria.
              </li>
              <ul className="list-disc pb-4 pl-12 pr-4">
                <li className="ml-8">
                  Suppose you are seeking funding for a tree care plan, and aim to maximize the
                  impact of your tree care activities to ensure the trees reach maturity in areas
                  hit hardest by extreme summer heat and that have a high health burden. To achieve
                  this, use two map filters simultaneously: "heat disparity" and "health burden
                  index." Record your custom criteria to demonstrate your approach selecting target
                  areas for your tree care plan.
                </li>
                <li className="pt-2 ml-8">
                  Tree Equity Score provides a wealth of information beyond the score itself. Tailor
                  your strategies to reflect local priorities and contexts, utilizing the rigorous
                  data available to support your proposal.
                </li>
              </ul>
            </ol>
            <p className="pl-4 pb-4">
              In addition to reporting on your prioritization criteria in your funding request, use
              maps to visually communicate your selected priority areas to funders. Include
              screenshots maps with prioritization filters applied.
            </p>
            <p className="pl-4 pb-4">
              Tip: Use a basic image-editing program to label project locations, geographic
              landmarks and main roads. This simple addition can make your maps more user-friendly
              and help grant reviewers interpret the information.
            </p>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Determine a block group's priority level"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Each locality is subdivided into Census block groups&#8212;each with a unique Tree
                  Equity Score indicating the geographic pattern of tree canopy need within your
                  community. Scores of 100 indicate areas with enough trees. The lower the Tree
                  Equity Score, the greater tree canopy need and thus the greater the priority.
                </li>
                <li className="pt-2 ml-8">
                  Tree Equity Score priority levels are defined to provide a broad decision aid to
                  help you interpret your Tree Equity Score. Priority levels are mapped directly
                  from Tree Equity Scores: Highest (0-69), High (70-79), Moderate (80-89), Low
                  (90-99), None (100). You may choose to adjust the prioritization in your community
                  based on your unique range of Tree Equity Scores and other relevant local
                  information.
                </li>
                <li className="pt-2 ml-8">
                  Within each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block group ranks help you make comparisons only among block groups in the
                  same community. The block group rank serves as an additional tool to easily
                  identify areas of higher priority within a community.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Decode the block group rank "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Every locality (e.g., a town, city or village) has a unique landscape of Tree
                  Equity Scores. The block group rank helps you quickly identify areas in your
                  community with the lowest rank and greatest priority.
                </li>
                <li className="pt-2 ml-8">
                  For each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block groups ranked "1st" have the highest Tree Equity Scores (usually
                  100), meaning those locations have enough trees.
                </li>
                <li className="pt-2 ml-8">
                  The bigger the rank, the lower the Tree Equity Score. A block group ranked 270th
                  out of 271 block groups, for example, can be considered among the highest priority
                  within a locality based on Tree Equity Score.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Filter map layers"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                A map filter is a tool that allows you to narrow down or prioritize the information
                displayed on the map based on specific criteria. Map filters help you focus on the
                geographic areas that are most relevant to your needs or interests.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Filters” to open the filter menu.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Adjust the sliders from either end or enter cutoff values. The filter will modify
                  the map display accordingly, "filtering out" the areas that do not meet your
                  criteria, and leaving only the areas that match visible on the map. You can set
                  one or more filters.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Filters will remain applied even if you close the filters menu change the map
                  layers. Tap “Reset” to set the sliders back to their original positions.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Map filters are a deceptively simple tool with a myriad of uses! Use filters to
                  minimize the amount of information your brain has to process. Use filters to look
                  for patterns and isolate areas of interest. Filters are a helpful tool to make
                  informed decisions. Test prioritization criteria against your local knowledge of
                  an area. You can also filter Tree Equity Score based on issues that are important
                  locally, for example by setting the heat disparity filter to identify
                  neighborhoods endangered by extreme heat.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Export a map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Maps are highly versatile and can help communicate patterns in tree inequity. They
                can be useful in a number of ways, including in grant applications, presentations to
                the town board, fliers for a tree planting event, conversations local stakeholders
                and community members.
              </p>
              <p className="pl-4 font-medium text-sm">Print a PDF of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  On the top-left corner of the map, click on camera button.
                </li>
                <li className="pt-2 ml-8">
                  This will capture a screenshot of the map, and prompt you to save a PDF on your
                  computer.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Copy/save an image of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Right click on the map, and select "Copy Image" (available on most browsers).
                </li>
                <li className="pt-2 ml-8">Paste the image into your document or slide deck.</li>
                <li className="pt-2 ml-8">
                  Or select "Save Image As" and import the image into your document or slide deck.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Take a screenshot on your device</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">On Windows, press Alt + PrtScn to capture the screen.</li>
                <li className="pt-2 ml-8">
                  For Mac, press Command-Shift-3 to capture the entire screen.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 3. Gather supporting data."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pt-2">
              Pull together data to illustrate the characteristics of the areas you propose to work
              in. To access information about individual neighborhoods, simply click on them to load
              more information in the side panel. Take note of the Tree Equity Score, along with the
              supporting priority indicators and tree canopy values for each neighborhood of
              interest. These data will be instrumental in explaining the context for each
              neighborhood:
            </p>
            <div className="pl-8">
              <ul className="list-disc pb-4 pl-4">
                <li className="pt-2 ml-2">
                  <span className="font-semibold">Tree canopy:</span> Compare the current canopy
                  cover (how much tree cover an area has) and canopy gap (how much more tree cover
                  an area needs).
                </li>
                <li className="pt-2 ml-2">
                  <span className="font-semibold">Demographic factors:</span> Illustrate the
                  characteristics of communities impacted by low tree cover.
                </li>
                <li className="pt-2 ml-2">
                  <span className="font-semibold">Health burden index:</span> Illustrate the public
                  health impact&#8212;includes measures of mental and physical health, asthma, and
                  heart disease.
                </li>
                <li className="pt-2 ml-2">
                  <span className="font-semibold">Heat disparity:</span> Show the variance from the
                  average heat severity for the urban area.
                </li>
              </ul>
            </div>
            <p className="pb-2 md:ml-10 ml-2">For example:</p>

            <table className="md:ml-10 ml-2 text-left md:w-72 w-full border-b-2 border-brand-blue-dark">
              <thead className="border-b-2 border-t-2 font-medium text-xs border-brand-blue-dark">
                <tr>
                  <th scope="col" className="px-2 py-2">
                    Metric
                  </th>
                  <th scope="col" className="px-2 py-2 text-center sm:hyphens-none hyphens-manual">
                    Neighbor&shy;hood A
                  </th>
                  <th scope="col" className="px-2 py-2 text-center sm:hyphens-none hyphens-manual">
                    Neighbor&shy;hood B
                  </th>
                </tr>
              </thead>
              <tbody className="md:text-sm text-xs font-semibold">
                <tr>
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    Tree Equity Score
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">82</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">88</td>
                </tr>
                <tr>
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    Tree canopy cover
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">5%</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">3%</td>
                </tr>
                <tr className="">
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    People of color
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">93%</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">81%</td>
                </tr>
                <tr>
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    People in poverty
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">78%</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">63%</td>
                </tr>
                <tr className="">
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    Heat disparity
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">+7 degrees</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">+9 degrees</td>
                </tr>
              </tbody>
            </table>
            <p className="pb-4 pt-2 md:ml-10 ml-2 md:text-sm text-xs font-normal">
              *To summarize metrics for a group of neighborhoods, record information from the
              sidebar for each neighborhood, then present the average or the range of values for the
              group.
            </p>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Understand the tree canopy goal"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  The red status bar at the bottom of the sidebar represents the canopy cover goal
                  for the highlighted block group. It shows the current canopy cover level as a
                  measure of progress, with a gap indicating the amount of additional tree canopy
                  needed to reach the goal.
                </li>
                <li className="pt-2 ml-8">
                  The canopy cover goal represents a minimum percentage of tree canopy required to
                  deliver the requisite benefits of trees to a block group, adjusted based on
                  natural biome and building density.
                </li>
                <li className="pt-2 ml-8">
                  Block groups with canopy cover that meets or surpasses their tree canopy goal are
                  assigned a Tree Equity Score of 100.
                </li>
                <li className="pt-2 ml-8">
                  Tree canopy goals represent a minimum standard of tree cover for all neighborhoods
                  that is considered appropriate to local urban ecologies and are not based on goals
                  set by cities.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Decipher the spider chart"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  Tree Equity Score is a combined measure of tree canopy need and an index comprised
                  of seven priority indicators. The spider chart, also known as a radar chart,
                  provides a visual breakdown of the indicators that influence the score for each
                  block group.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Axes: The spider chart consists of multiple axes radiating from a central point,
                  like spokes on a wheel. Each axis represents a different priority indicator. Each
                  axis is a scale that represents the range of each indicator value for the locality
                  overall (all indicators are standardized for visual comparison).
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Data points: Priority indicator values for your highlighted block group are mapped
                  as red points along each axis. The position of the dot reveals where the data
                  points fall within the overall range of values within the locality. The further
                  the point is from the center of the chart, the more that indicator contributes to
                  lowering the Tree Equity Score for the block group.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Shape: All data points are connected with lines, forming a shaded web shape within
                  the spider chart. In general, the larger the shaded area, the lower the Tree
                  Equity Score and higher the priority. Comparing the shape of the spider web across
                  different block groups can help you relatively quickly assess the drivers of Tree
                  Equity Score.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Once you learn how to read it, the spider chart is a valuable tool to gain
                  insights. Quickly assess patterns for different variables in your locality. Tease
                  out the variables that have the most influence on Tree Equity Score for each
                  priority block group.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 4. Provide regional context."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Show how your proposed project areas fit into the larger context of Tree Equity in
              your town, city, county, congressional district or state. Tree Equity Score can help
              you highlight systemic disparities in tree cover on a broader scale and demonstrate
              how focusing on priority areas can contribute to addressing those inequalities.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-4 pl-12 ${styles.listNumber}`}>
                <p className="pb-4">
                  Evaluate your proposed areas in the context of your locality, county, district or
                  state as a whole. You can access dynamic reports for each specific area simply by
                  clicking on a block group to generate a list of the corresponding reports. At the
                  top of each report, you'll find key indicators summarized (please note that
                  summaries are for urban areas only, and rural areas are not included). If certain
                  metrics are not available in the report, you can explore the map to find ranges.
                  Activate specific map layers and and view data points in hover popups. Or apply
                  map filters to isolate the highest and lowest values in an area.
                </p>
                <p className="md:ml-0 -ml-14">For example:</p>
                <table className="md:ml-0 -ml-14 text-left md:w-[500px] w-full border-b-2 border-brand-blue-dark mt-2 mb-6">
                  <thead className="border-b-2 border-t-2 font-medium text-xs border-brand-blue-dark">
                    <tr>
                      <th scope="col" className="px-2 py-2">
                        Metric
                      </th>
                      <th scope="col" className="px-2 py-2 text-center">
                        Neighborhood A
                      </th>
                      <th scope="col" className="px-2 py-2 text-center">
                        Smithfield <br /> (Average; Range)
                      </th>
                      <th scope="col" className="px-2 py-2 text-center">
                        York County <br /> (Average; Range)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="md:text-sm text-xs font-semibold">
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Tree Equity Score
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">82</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">92; 78-100</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">73-100</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Tree canopy cover{" "}
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">5%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">14%; 2-68%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">34%; 2-72%</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        People of color
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">93%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">66%; 28-100%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">54%; 0-100%</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        People in poverty{" "}
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">78%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">21%; 0-78%</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">17%; 0-78%</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Health burden index
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">64</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">12-68</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">6-72</td>
                    </tr>
                    <tr>
                      <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                        Total population
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">1,752</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">16,863</td>
                      <td className="whitespace-nowrap px-2 py-1 text-center">61,265</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li className={`pb-4 pl-12 ${styles.listNumber}`}>
                <p>
                  Take screenshots of the interactive charts in the reports to include in your
                  funding proposal. Displaying regional trends can help illustrate relevant broad
                  trends in Tree Equity Scores and tree canopy for your proposal. Hover over the
                  charts to find explanatory language in tooltips.
                </p>
              </li>
              <li className={`pb-4 pl-12 ${styles.listNumber}`}>
                <p>
                  Maps can serve as evidence of regional patterns and disparities. Open the Layers
                  menu and toggle between different thematic map layers, such as Tree Equity Score,
                  heat disparity or people in poverty. You might need to zoom out on the map to
                  observe broader geographic patterns. Comparing different map layers side-by-side
                  can offer insights into how these factors interconnect across different areas.
                </p>
              </li>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Access dynamic reports"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <div className="pr-4">
                <p className="pl-4 font-normal text-sm pb-3">
                  Dynamic reports can help you communicate what it takes to raise Tree Equity Scores
                  at a regional level. Dynamic reports are available at four administrative scales:
                  Locality (e.g., a town, city or village), County, Congressional District and
                  State. Each report provides valuable summary metrics, interactive visualizations
                  to help you gain insights for your area of interest, and computational tools to
                  help you assess scenarios and highlight the numerous benefits that can be gained
                  by raising Tree Equity Scores within your community.
                </p>
                <p className="pl-4 font-medium text-sm">From the map</p>
                <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                  <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                    Click on a shaded block group on the map. The "Dynamic Reports" menu will open
                    in the upper right corner, showing all available reports for the highlighted
                    block group.
                  </li>
                  <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                    Choose a scale: Dynamic reports are available at up to four administrative
                    scales from every block group: Locality (e.g., a town, city or village), County,
                    Congressional District and State (always listed in that order).
                  </li>
                  <li className={`pb-5 pl-10 ${styles.smallListNumber}`}>
                    Click on a link to open a dynamic report.
                  </li>
                </ol>
                <p className="pl-4 font-medium text-sm pb-2">
                  Alternatively, you can search for reports anywhere in the United States. Click
                  "Search all reports."
                </p>
                <p className="pl-4 font-normal text-sm">
                  <i>To search for dynamic reports by the name of a locality, county or state:</i>
                </p>
                <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                  <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                    Open the "Locality, county or state reports" tab.
                  </li>
                  <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                    Start typing the name of a locality, county or state into the search bar.
                  </li>
                  <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                    Select the best match from the list to open the dynamic report.
                  </li>
                </ol>
                <p className="pl-4 font-normal text-sm">
                  <i>To search for congressional district reports:</i>
                </p>
                <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                  <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                    Open the "Congressional district reports" tab.
                  </li>
                  <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                    Select your state from the dropdown menu.
                  </li>
                  <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                    Optionally, select a city to narrow the results.
                  </li>
                  <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                    Choose a district from the list to open the dynamic report.
                  </li>
                </ol>
                <p className="pl-4 font-normal text-sm pb-2">
                  If you don't know your district, return to the map. Use the search bar located in
                  the upper left of the map to search for your address. Click on your block group.
                  Now your district report will display in the "Reports" menu.
                </p>
              </div>
            </AccordionItem>
            <AccordionItem
              title="Interpret the demographic summary"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  When you open a dynamic report, the first section provides an overview of
                  population characteristics to help you understand the demographic context of the
                  urban areas in your selected geography.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  The summary is specific to the coverage of Tree Equity Score, which includes only
                  the urban areas within each locality, county, congressional district and state, as
                  defined by Census.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Interact with the charts"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-medium text-sm pt-2 pr-4">Left chart</p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Tree Equity Scores: This chart shows the distribution of Tree Equity Scores in
                  your selected geography. The scores are divided into different priority levels:
                  Highest (0-69), High (70-79), Moderate (80-89), Low (90-99), and None (100).
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  The summary is specific to the coverage of Tree Equity Score, which includes only
                  the urban areas within each locality, county, congressional district and state, as
                  defined by Census.
                </li>
              </ol>
              <p className="pl-4 font-medium text-sm pr-4">Right chart</p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Canopy Cover Distribution: This chart evaluates tree canopy cover against selected
                  demographic parameters in your chosen area.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Default View: The default view clusters block groups based on the percentage of
                  people of color and displays the average tree canopy cover for each cluster.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Tooltips: Hover or tap to view tooltips that display the number of block groups in
                  each cluster.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Change Chart Parameters: To explore different demographic parameters, use the
                  dropdown menu to select a different clustering parameter for the X-axis of the
                  chart.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Export a map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Maps are highly versatile and can help communicate patterns in tree inequity. They
                can be useful in a number of ways, including in grant applications, presentations to
                the town board, fliers for a tree planting event, conversations local stakeholders
                and community members.
              </p>
              <p className="pl-4 font-medium text-sm">Print a PDF of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  On the top-left corner of the map, click on camera button.
                </li>
                <li className="pt-2 ml-8">
                  This will capture a screenshot of the map, and prompt you to save a PDF on your
                  computer.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Copy/save an image of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Right click on the map, and select "Copy Image" (available on most browsers).
                </li>
                <li className="pt-2 ml-8">Paste the image into your document or slide deck.</li>
                <li className="pt-2 ml-8">
                  Or select "Save Image As" and import the image into your document or slide deck.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Take a screenshot on your device</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">On Windows, press Alt + PrtScn to capture the screen.</li>
                <li className="pt-2 ml-8">
                  For Mac, press Command-Shift-3 to capture the entire screen.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 5. Forecast impacts."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              In each report, you'll find an interactive slider tool that calculates the benefits of
              achieving Tree Equity Score benchmarks at various geographic scales (locality, county,
              district and state). This powerful decision support tool supports longer-term
              forecasting of what it takes to improve Tree Equity Score throughout all neighborhoods
              in a given region.
            </p>
            <p className="pl-4 pb-4">
              Here's how to leverage the scenario planner to report out measurable impacts:
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">Forecast scenarios:</span> Report your goals for
                achieving longer-term Tree Equity Score benchmarks. This can be used highlight the
                positive influence of your work and how each project fits into your vision for
                advancing Tree Equity.
              </li>
              <ul className="list-disc pb-4 pr-4 ml-12">
                <li className="ml-8">
                  Within the report, locate the slider feature and set it to the target score you
                  established in Step 2.{" "}
                </li>
                <li className="pt-2 ml-8">
                  The panels below will update with information such as the number of trees
                  required, the Annual Ecosystem Service Value ($), and other impact measures
                  associated with reaching the target score for all block groups.
                </li>
                <li className="pt-2 ml-8">
                  While your proposed project may not get all neighborhoods to your target score
                  immediately, you can make a persuasive case that your efforts contribute towards
                  getting closer to these broader outcomes.
                </li>
              </ul>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <span className="font-semibold">
                  Calculate tree planting and tree protection impact:
                </span>{" "}
                Many of our users want to estimate the ecosystem services of planting or protecting
                a specific number of trees. We're working on a block group scenario planner to do
                just this, coming next year. Until then, here's how to hack the scenario planner to
                get a rough estimate!
              </li>
              <ul className="list-disc pb-4 pr-4 ml-12">
                <li className="ml-8">
                  Click on the block group where you propose to plant or protect trees. Open the
                  first available report, usually the town/city report, or the county report if the
                  location is unincorporated.
                </li>

                <li className="pt-2 ml-8">
                  Locate the slider feature within the report and slide it until the "trees needed"
                  value (found below the slider to the left) is as close as possible to the number
                  of trees you want to estimate, let's say 50 trees.
                </li>
                <li className="pt-2 ml-8">
                  When your tree count roughly matches 50, the panel below will display the
                  estimated benefits directly for that tree count. In some cases, the slider may
                  only go as low as 113 trees, for instance. In such cases, you can divide the panel
                  estimates below in half for a rough estimate, or scale proportionally as desired.
                </li>
                <li className="pt-2 ml-8">
                  <span className="font-semibold">Please note:</span> All benefits listed in the
                  panel are directly generated from the tree count, allowing for creative
                  repurposing for tree count estimations. The tree count is estimated from the total
                  canopy area, and assumes a 600 sq-ft (medium-sized) tree. Keep in mind that
                  ecosystem service calculations are based on localized estimates from iTree, so it
                  is crucial to make your estimations based on the report that corresponds to the
                  specific block group for your planting or tree care location.
                </li>
              </ul>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Explore scenarios (slider)"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The green Tree Equity Score slider is a computational tool designed to help you
                explore what it takes to raise Tree Equity Scores in your selected geography.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  <span className="font-medium">Set the minimum score:</span> Move the slider to set
                  a minimum Tree Equity Score for all block groups in your chosen area. The default
                  target score is 75, but you can adjust it to your preference.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">Watch the data update below:</span> As you adjust
                  the slider, the following information will automatically change:
                </li>
                <ul className="list-disc pb-4 font-normal text-sm pr-4 ml-8">
                  <li className="pt-2 ml-8">
                    <span className="font-medium">
                      Number of block groups currently below the target score:
                    </span>{" "}
                    How many areas currently have scores lower than your chosen minimum.
                  </li>
                  <li className="pt-2 ml-8">
                    <span className="font-medium">Planting need:</span> The estimated number of new
                    trees required to raise all neighborhoods to your target score. The calculation
                    assumes an average urban tree with a canopy area of 600 square feet (55.74
                    square meters) and a crown width of 25-30 feet.
                  </li>
                  <li className="pt-2 ml-8">
                    <span className="font-medium">Benefits of adding new trees:</span> The economic,
                    health, and environmental advantages associated with planting the identified
                    number of new trees.
                  </li>
                </ul>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Understand the tree canopy benefits"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The benefits panel is a computational tool designed to help you communicate the
                critical health, economic and environmental benefits of raising Tree Equity Scores.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  <span className="font-medium">Set the minimum score:</span> Adjust the slider to
                  set a minimum Tree Equity Score for all block groups in your selected geography.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">View the benefits:</span> As you move the slider,
                  the benefits of adding new trees will automatically update in the benefits panel
                  below. These are annual benefits and include the economic, health and
                  environmental advantages associated with planting the estimated number of new
                  trees.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">Learn more:</span> Each benefit measure is explained
                  in detail in the information tooltip. You can access this tooltip in the lower
                  right of each benefit bubble.
                </li>
              </ol>
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The benefit measures in the calculator are designed to help you effectively
                communicate the value of planting and protecting urban trees. They can be valuable
                in presentations, grant applications, community engagement materials and
                conversations with stakeholders and community members.
              </p>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 6. Gather visuals. "
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pb-4 pt-2 pl-4">
              Strengthen your proposal with impactful data visualizations.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <p>
                  <span className="font-semibold">Spatial patterns:</span> Utilize maps to display
                  different datasets like tree canopy cover and heat disparity, illustrating key
                  spatial patterns in your proposal.
                </p>
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <p>
                  <span className="font-semibold">Target neighborhoods:</span> Create a map
                  highlighting your target neighborhoods. You can apply map filters to showcase
                  priority areas or use image-editing software to mark the target block groups
                  directly on a screenshot.
                </p>
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <p>
                  <span className="font-semibold">Report maps:</span> Access any report and scroll
                  to the bottom to find a copy of the report map, which shows just the block groups
                  for the specific geographic area covered. Right-click to copy or save the image or
                  take a screenshot.
                </p>
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                <p>
                  <span className="font-semibold">Report charts:</span> Capture screenshots of
                  interactive charts from the reports to incorporate in your funding proposal,
                  offering a snapshot of regional trends.
                </p>
              </li>
            </ol>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Export a map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Maps are highly versatile and can help communicate patterns in tree inequity. They
                can be useful in a number of ways, including in grant applications, presentations to
                the town board, fliers for a tree planting event, conversations local stakeholders
                and community members.
              </p>
              <p className="pl-4 font-medium text-sm pr-4">Print a PDF of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  On the top-left corner of the map, click on camera button.
                </li>
                <li className="pt-2 ml-8">
                  This will capture a screenshot of the map, and prompt you to save a PDF on your
                  computer.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm pr-4">Copy/save an image of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Right click on the map, and select "Copy Image" (available on most browsers).
                </li>
                <li className="pt-2 ml-8">Paste the image into your document or slide deck.</li>
                <li className="pt-2 ml-8">
                  Or select "Save Image As" and import the image into your document or slide deck.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm pr-4">Take a screenshot on your device</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">On Windows, press Alt + PrtScn to capture the screen.</li>
                <li className="pt-2 ml-8">
                  For Mac, press Command-Shift-3 to capture the entire screen.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Interact with the charts"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-medium text-sm pt-2 pr-4">Left chart</p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Tree Equity Scores: This chart shows the distribution of Tree Equity Scores in
                  your selected geography. The scores are divided into different priority levels:
                  Highest (0-69), High (70-79), Moderate (80-89), Low (90-99), and None (100).
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  The summary is specific to the coverage of Tree Equity Score, which includes only
                  the urban areas within each locality, county, congressional district and state, as
                  defined by Census.
                </li>
              </ol>
              <p className="pl-4 font-medium text-sm pr-4">Right chart</p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Canopy Cover Distribution: This chart evaluates tree canopy cover against selected
                  demographic parameters in your chosen area.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Default View: The default view clusters block groups based on the percentage of
                  people of color and displays the average tree canopy cover for each cluster.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Tooltips: Hover or tap to view tooltips that display the number of block groups in
                  each cluster.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Change Chart Parameters: To explore different demographic parameters, use the
                  dropdown menu to select a different clustering parameter for the X-axis of the
                  chart.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 7. Define key terms. "
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="py-4 pl-4 pr-4">
            Go to our{" "}
            <a
              href="/methodology"
              className="text-brand-green"
              target="_blank"
              rel="noreferrer noopener"
            >
              Methods & Data
            </a>{" "}
            page for definitions and guidance to help you communicate the science that powers Tree
            Equity Score.
          </p>
        </AccordionItem>
      </AccordionWithChildren>
    </section>
  </div>
)
const StrategicPlanningSubpanel = () => (
  <div>
    <section className="lg:pt-24 pt-10 lg:pb-16 pb-10">
      <p className="uppercase text-brand-blue-dark font-bold md:text-caption text-xs">
        TREE EQUITY SCORE USE CASE
      </p>
      <p className="md:text-headline text-2xl md:leading-tight font-medium">
        Build Tree Equity into strategic planning and budgeting
      </p>
    </section>
    <section className="mb-16">
      <TopBox title="Get the most out of Tree Equity Score">
        <div>
          <p
            className="text-caption
    text-brand-blue-dark font-medium uppercase"
          >
            objectives
          </p>
          <ul className="list-disc">
            <li className="pt-2 ml-5">
              Create a data-driven, long-term strategy informed by budgetary needs.
            </li>
            <li className="pt-2 ml-5">
              Support collaborative decision making to identify a tailored, local course of action.
            </li>
            <li className="pt-2 ml-5">Leverage data to communicate priorities.</li>
          </ul>
        </div>
        <div>
          <p
            className="text-caption
    text-brand-blue-dark font-medium uppercase"
          >
            How can I use the information?
          </p>
          <p className="pt-2">
            Tree Equity is a long-term and collaborative effort. Develop a comprehensive Tree Equity
            Plan to guide your initiatives over multiple years. Inform strategic planning,
            comprehensive planning and budgeting for the future. Create an implementation plan to
            advance policy objectives or to achieve long-term goals.
          </p>
        </div>
      </TopBox>
    </section>
    <section className="md:text-base text-sm font-medium text-gray-800">
      <AccordionWithChildren className="border-b-2 border-b-brand-blue-dark">
        <AccordionItem
          title="Overview"
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              In the Tree Equity Score National Explorer, you'll find a range of decision support
              tools to aid in longer-term planning. Utilize the map tools to establish
              prioritization systems that direct your focus towards areas requiring the most
              significant investment. Employ scenario planning tools to assess different planting
              scenarios, evaluate costs and benefits and choose a tailored local strategy that
              aligns with your budget.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Engage key stakeholders effectively. Scenario planning tools can serve as
                communication aids, facilitating decision-making discussions with stakeholders.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Increase transparency in your collaborative processes by setting agreed-upon targets
                and criteria. This ensures that all participants are aligned and working towards
                common goals.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Strengthen your local knowledge with data-driven evidence. Many users leverage this
                nationally recognized data source to support and enhance local knowledge, filling
                gaps and adding credibility to their proposals and initiatives.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Building meaningful relationships, conducting outreach and forming community
                partnerships are essential aspects of any successful Tree Equity Plan. Combine a
                data-driven approach with a concrete plan for partnering and engaging with your
                community.
              </li>
            </ol>
          </div>
        </AccordionItem>
        <AccordionItem
          title="Step 1. Get oriented."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="pl-4 pb-4 pt-2 pr-4">
            Tree Equity Score offers rigorous data to support identification of areas requiring the
            most significant investment in the urban forest. Start by scanning the map for
            neighborhoods with the lowest scores. You can also identify neighborhoods based on other
            factors like extreme heat, poverty rates, or vulnerable populations. Open the Layers
            menu to examine other patterns on the map.
          </p>
          <AccordionWithChildren>
            <AccordionItem
              title="Navigate the map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  To navigate to a location, simply type a location into the search bar such as an
                  address, place name, town or state, and select an option that matches from the
                  list. Or simply zoom and pan the map.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Continue to navigate the map by zooming and dragging it to center your location of
                  interest.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over shaded areas on the map to view scores for different
                  locations.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Each locality (for example, a town, city or village) is assigned a Composite
                  Score. This score provides a simplified assessment of overall tree distribution
                  fairness within a community.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  As you zoom in, localities will subdivide into Census block groups&#8212;each with
                  a unique Tree Equity Score indicating the geographic pattern of tree canopy need
                  within your community. Lower Tree Equity Scores indicate greater tree canopy need.
                  Scores of 100 indicate areas with enough trees.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  To learn more details about an area within your locality, simply click on a block
                  group to highlight it. Additional information about your highlighted block group
                  will appear in the sidebar, including the measures of tree canopy, demographics,
                  health, and environment that determine its Tree Equity Score.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="What is a Tree Equity Score?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every Census block group within urban areas of
                  the U.S. The score is a measure ranging from 0 to 100 to highlight inequitable
                  access to trees.
                </li>
                <li className="pt-2 ml-8">
                  A score of 100 (green) means a neighborhood (Census block group) already has
                  enough trees.
                </li>
                <li className="pt-2 ml-8">
                  A lower score (orange) indicates a greater priority for tree planting, based on a
                  combination of factors including tree canopy coverage and social, climate and
                  health priorities.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="What is a block group?"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Tree Equity Score is calculated for every block group within U.S. urban areas.
                </li>
                <li className="pt-2 ml-8">
                  A Census block group, sometimes colloquially referred to as a "neighborhood," is a
                  small geographic area used in the United States Census. A block group typically
                  contains between 600 and 3,000 people, but the actual population can vary.
                </li>
                <li className="pt-2 ml-8">
                  Block groups provide a way of organizing and grouping people who live relatively
                  close to one other and have relatively similar population characteristics for the
                  purpose of collecting and analyzing demographic information.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Explore map layers "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Think of a map layer as a sheet of paper in a stack. Each layer represents
                different information, stacked one above the other. By toggling different layers on
                or off, you can choose what information, or "sheet," you want to see on the map. Map
                layers can help you gain a deeper understanding of the patterns and trends unique to
                your area.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Layers,” then click on one of the layers in the list to change the layer
                  view.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Hover or click over the shaded areas on the map to view data for the selected
                  layer in a pop-up.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Exploring the map layers can help you gain insights into geographic patterns and
                  the hidden story behind tree canopy distribution in your area. Toggle through
                  layers for each specific variable to see how it relates to the tree canopy
                  distribution.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 2. Evaluate regional planting scenarios."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              In the National Explorer, you have access to scenario planning tools for every
              locality, county, congressional district and state. Use these tools to forecast the
              level of investment needed to increase Tree Equity Scores for each geographic area.
              Additionally, you can estimate the partial return on investment related to air,
              carbon, and water to help weigh the potential benefits and impact of different
              scenarios.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Select a geographic scale (locality, county, congressional district, or state) and
                open the corresponding report. Scroll to the scenario slider tool.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Utilize the slider to map out the investment required to increase Tree Equity Scores
                in gradual stages. Test various Tree Equity Score targets (e.g., 75, 80, 85, 90) by
                moving the slider incrementally.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                To document and compare scenarios, each time you move the slider to a new benchmark,
                record the updated data, indicated below. This process will enable you to analyze
                and contrast the potential outcomes of different Tree Equity Score targets for your
                geographic area.
              </li>
            </ol>
            <img
              src={`${STATIC_ASSETS_CLOUDFRONT_URL}/scenario-planning.png`}
              className="lg:w-11/12 w-full m-auto"
            />
            <div className="pl-12">
              <p className="md:ml-0 -ml-8 pb-4 pt-2">
                <span className="font-semibold">Example 1.</span> Break down your long-term
                objectives into smaller, manageable milestones, and forecast a multi-year process to
                achieve them. By setting incremental waypoints, you can create a step-by-step
                roadmap for your project or initiative, making it easier to track progress, identify
                potential challenges and ensure that you stay on course towards your larger goals.
              </p>
              <table className="md:ml-0 -ml-8 text-left md:w-[400px] w-full border-b-2 border-brand-blue-dark">
                <thead className="border-b-2 border-t-2 font-medium text-xs border-brand-blue-dark">
                  <tr>
                    <th scope="col" className="px-2 py-2">
                      Year
                    </th>
                    <th scope="col" className="px-2 py-2 text-center">
                      2030
                    </th>
                    <th scope="col" className="px-2 py-2 text-center">
                      2040
                    </th>
                    <th scope="col" className="px-2 py-2 text-center">
                      2050
                    </th>
                  </tr>
                </thead>
                <tbody className="md:text-sm text-xs font-semibold">
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Target Score*
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">70</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">75</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">80</td>
                  </tr>
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Number of target block groups
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">4</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">7</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">11</td>
                  </tr>
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Total trees needed
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">1,793</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">5,325</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">11,766</td>
                  </tr>
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Estimated costs**
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-center"></td>
                    <td className="whitespace-nowrap px-2 py-1 text-center"></td>
                    <td className="whitespace-nowrap px-2 py-1 text-center"></td>
                  </tr>
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">ROI***</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">$103K</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">$750K</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">$2.6M</td>
                  </tr>
                </tbody>
              </table>
              <p className="md:ml-0 -ml-8 pt-1 text-xs">
                *All neighborhoods in Smith County are greater than or equal to this score.
              </p>
              <p className="md:ml-0 -ml-8 pt-1 text-xs">
                **Planting and maintenance costs: On average, it costs $283 to plant an urban tree,
                but we recommend using local estimates where possible. Include maintenance costs by
                multiply the annual costs over the time period of the project.
              </p>
              <p className="md:ml-0 -ml-8 pb-6 pt-1 text-xs">
                ***Return on investment (ROI): Forecast ROI from the Annual Ecosystem Service Value
                by multiplying the estimated annual value by the number of years. Includes carbon,
                air and water benefits; does not include all potential returns on investment such as
                avoided health care costs or energy savings.
              </p>
            </div>
            <div className="pl-12">
              <p className="md:ml-0 -ml-8 pb-4 pt-2">
                <span className="font-semibold">Example 2.</span> Present a menu of funding options
                to key stakeholders, by creating Tree Equity Score scenarios that represent various
                levels of effort, funding and return on investment. Expand on the basic structure of
                this menu to serve as a foundation for collaborative decision-making. It will assist
                stakeholders in evaluating the costs that align with your budget and the projected
                benefits to the community. By evaluating these options, you and your stakeholders
                can decide the best course of action and gain a better understanding of budgeting
                requirements. This process can also help communicate the importance and impact of
                your funding needs to potential supporters and partners.
              </p>

              <table className="md:ml-0 -ml-8 text-left md:w-[400px] w-full border-b-2 border-brand-blue-dark">
                <thead className="border-b-2 border-t-2 font-medium text-xs border-brand-blue-dark">
                  <tr>
                    <th scope="col" className="px-2 py-2">
                      Scenario
                    </th>
                    <th scope="col" className="px-2 py-2 text-center">
                      A
                    </th>
                    <th scope="col" className="px-2 py-2 text-center">
                      B
                    </th>
                    <th scope="col" className="px-2 py-2 text-center">
                      C
                    </th>
                    <th scope="col" className="px-2 py-2 text-center">
                      D
                    </th>
                  </tr>
                </thead>
                <tbody className="md:text-sm text-xs font-semibold">
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Target Score*
                    </td>
                    <td className="whitespace-nowrap md:px-2 px-0 py-1 text-center">65</td>
                    <td className="whitespace-nowrap md:px-2 px-0 py-1 text-center">70</td>
                    <td className="whitespace-nowrap md:px-2 px-0 py-1 text-center">75</td>
                    <td className="whitespace-nowrap md:px-2 px-0 py-1 text-center">80</td>
                  </tr>
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Number of target block groups
                    </td>
                    <td className="whitespace-nowrap md:px-2 px-0 py-1 text-center">3</td>
                    <td className="whitespace-nowrap md:px-2 px-0 py-1 text-center">4</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">7</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">11</td>
                  </tr>
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Total trees needed
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">821</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">1,793</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">5,325</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">11,766</td>
                  </tr>
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Estimated costs**
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-center"></td>

                    <td className="whitespace-nowrap px-2 py-1 text-center"></td>
                    <td className="whitespace-nowrap px-2 py-1 text-center"></td>
                    <td className="whitespace-nowrap px-2 py-1 text-center"></td>
                  </tr>
                  <tr>
                    <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                      Annual ROI***
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">$6,750</td>

                    <td className="whitespace-nowrap px-2 py-1 text-center">$14,725</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">$43,737</td>
                    <td className="whitespace-nowrap px-2 py-1 text-center">$96,636</td>
                  </tr>
                </tbody>
              </table>
              <p className="md:ml-0 -ml-8 pt-1 text-xs">
                *All neighborhoods in Smith County are greater than or equal to this score.
              </p>
              <p className="md:ml-0 -ml-8 pt-1 text-xs">
                **Planting and maintenance costs: On average, it costs $283 to plant an urban tree,
                but we recommend using local estimates where possible. Include maintenance costs by
                multiply the annual costs over the time period of the project.
              </p>
              <p className="md:ml-0 -ml-8 pb-4 pt-1 text-xs">
                ***Return on investment (ROI): The Annual Ecosystem Service Value can be forecasted
                by multiplying the estimated annual value by the number of years. Includes carbon,
                air and water benefits; does not include all potential returns on investment such as
                avoided health care costs or energy savings.
              </p>
            </div>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Explore scenarios (slider)"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The green Tree Equity Score slider is a computational tool designed to help you
                explore what it takes to raise Tree Equity Scores in your selected geography.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  <span className="font-medium">Set the minimum score:</span> Move the slider to set
                  a minimum Tree Equity Score for all block groups in your chosen area. The default
                  target score is 75, but you can adjust it to your preference.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">Watch the data update below:</span> As you adjust
                  the slider, the following information will automatically change:
                </li>
                <ul className="list-disc pb-4 font-normal text-sm pr-4 ml-8">
                  <li className="pt-2 ml-8">
                    <span className="font-medium">
                      Number of block groups currently below the target score:
                    </span>{" "}
                    How many areas currently have scores lower than your chosen minimum.
                  </li>
                  <li className="pt-2 ml-8">
                    <span className="font-medium">Planting need:</span> The estimated number of new
                    trees required to raise all neighborhoods to your target score. The calculation
                    assumes an average urban tree with a canopy area of 600 square feet (55.74
                    square meters) and a crown width of 25-30 feet.
                  </li>
                  <li className="pt-2 ml-8">
                    <span className="font-medium">Benefits of adding new trees:</span> The economic,
                    health, and environmental advantages associated with planting the identified
                    number of new trees.
                  </li>
                </ul>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Understand the tree canopy benefits"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The benefits panel is a computational tool designed to help you communicate the
                critical health, economic and environmental benefits of raising Tree Equity Scores.
              </p>
              <ol className="[counter-reset:list-number] relative font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  <span className="font-medium">Set the minimum score:</span> Adjust the slider to
                  set a minimum Tree Equity Score for all block groups in your selected geography.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">View the benefits:</span> As you move the slider,
                  the benefits of adding new trees will automatically update in the benefits panel
                  below. These are annual benefits and include the economic, health and
                  environmental advantages associated with planting the estimated number of new
                  trees.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  <span className="font-medium">Learn more:</span> Each benefit measure is explained
                  in detail in the information tooltip. You can access this tooltip in the lower
                  right of each benefit bubble.
                </li>
              </ol>
              <p className="pl-4 pt-2 font-normal text-sm pb-2 pr-4">
                The benefit measures in the calculator are designed to help you effectively
                communicate the value of planting and protecting urban trees. They can be valuable
                in presentations, grant applications, community engagement materials and
                conversations with stakeholders and community members.
              </p>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 3. Gather visuals."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pb-4 pt-2">
              Generate a separate map for each scenario, reflecting the different Tree Equity Score
              targets.
            </p>
            <ol className="[counter-reset:list-number] relative">
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Return to the map and access the Filters menu. Using the Tree Equity Score filter,
                set the maximum value to match the first target from Step 2. This action will refine
                the map, displaying only the neighborhoods you intend to target for that specific
                scenario.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Export the map to save it, and then repeat this process with the other targets,
                creating individual maps for each scenario.
              </li>
              <li className={`pb-3 pl-12 ${styles.listNumber}`}>
                Present the maps with the scenario menu as visual aids to understand the geographic
                distribution of neighborhoods across various Tree Equity Score targets.
              </li>
            </ol>
            <p className="pl-4 pb-4 pt-2">
              Tip: Use a basic image-editing program to label project locations, geographic
              landmarks and main roads. This simple addition can make the map more user-friendly and
              help your collaborators interpret the information.
            </p>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Filter map layers"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                A map filter is a tool that allows you to narrow down or prioritize the information
                displayed on the map based on specific criteria. Map filters help you focus on the
                geographic areas that are most relevant to your needs or interests.
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Click on “Filters” to open the filter menu.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Adjust the sliders from either end or enter cutoff values. The filter will modify
                  the map display accordingly, "filtering out" the areas that do not meet your
                  criteria, and leaving only the areas that match visible on the map. You can set
                  one or more filters.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Filters will remain applied even if you close the filters menu change the map
                  layers. Tap “Reset” to set the sliders back to their original positions.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Map filters are a deceptively simple tool with a myriad of uses! Use filters to
                  minimize the amount of information your brain has to process. Use filters to look
                  for patterns and isolate areas of interest. Filters are a helpful tool to make
                  informed decisions. Test prioritization criteria against your local knowledge of
                  an area. You can also filter Tree Equity Score based on issues that are important
                  locally, for example by setting the heat disparity filter to identify
                  neighborhoods endangered by extreme heat.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Export a map"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-2 pr-4">
                Maps are highly versatile and can help communicate patterns in tree inequity. They
                can be useful in a number of ways, including in grant applications, presentations to
                the town board, fliers for a tree planting event, conversations local stakeholders
                and community members.
              </p>
              <p className="pl-4 font-medium text-sm">Print a PDF of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  On the top-left corner of the map, click on camera button.
                </li>
                <li className="pt-2 ml-8">
                  This will capture a screenshot of the map, and prompt you to save a PDF on your
                  computer.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Copy/save an image of the map</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Right click on the map, and select "Copy Image" (available on most browsers).
                </li>
                <li className="pt-2 ml-8">Paste the image into your document or slide deck.</li>
                <li className="pt-2 ml-8">
                  Or select "Save Image As" and import the image into your document or slide deck.
                </li>
              </ul>
              <p className="pl-4 font-medium text-sm">Take a screenshot on your device</p>
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">On Windows, press Alt + PrtScn to capture the screen.</li>
                <li className="pt-2 ml-8">
                  For Mac, press Command-Shift-3 to capture the entire screen.
                </li>
              </ul>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 4. Gather supporting data."
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <div className="pr-4">
            <p className="pl-4 pt-2">
              Gather pertinent data about your strategic focus areas. Document the broader context
              using data from dynamic reports for your locality, county, district or state. To
              access information about individual neighborhoods, simply click on them to load more
              information in the side panel. Take note of the Tree Equity Score, along with the
              supporting priority indicators and tree canopy values for each neighborhood of
              interest.
            </p>
            <div className="pl-8">
              <ul className="list-disc pb-4 pl-4">
                <li className="pt-2 ml-2">
                  <span className="font-semibold">Tree canopy:</span> Compare the current canopy
                  cover (how much tree cover an area has) and canopy gap (how much more tree cover
                  an area needs).
                </li>
                <li className="pt-2 ml-2">
                  <span className="font-semibold">Demographic factors:</span> Illustrate the
                  characteristics of communities impacted by low tree cover.
                </li>
                <li className="pt-2 ml-2">
                  <span className="font-semibold">Health burden index:</span> Illustrate the public
                  health impact&#8212;includes measures of mental and physical health, asthma, and
                  heart disease.
                </li>
                <li className="pt-2 ml-2">
                  <span className="font-semibold">Heat disparity:</span> Show the variance from the
                  average heat severity for the urban area.
                </li>
              </ul>
            </div>

            <p className="pb-2 md:ml-10 ml-2">For example:</p>

            <table className="text-left md:w-72 w-full border-b-2 border-brand-blue-dark md:ml-10 ml-2">
              <thead className="border-b-2 border-t-2 font-medium text-xs border-brand-blue-dark">
                <tr>
                  <th scope="col" className="px-2 py-2">
                    Metric
                  </th>
                  <th scope="col" className="px-2 py-2 text-center">
                    Neighborhood A
                  </th>
                  <th scope="col" className="px-2 py-2 text-center">
                    Neighborhood B
                  </th>
                </tr>
              </thead>
              <tbody className="md:text-sm text-xs font-semibold">
                <tr>
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    Tree Equity Score
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">82</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">88</td>
                </tr>
                <tr>
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    Tree canopy cover
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">5%</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">3%</td>
                </tr>
                <tr className="">
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    People of color
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">93%</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">81%</td>
                </tr>
                <tr>
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    People in poverty
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">78%</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">63%</td>
                </tr>
                <tr className="">
                  <td className="md:whitespace-nowrap whitespace-normal px-2 py-1">
                    Heat disparity
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">+7 degrees</td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">+9 degrees</td>
                </tr>
              </tbody>
            </table>
            <p className="pb-4 pt-2 md:ml-10 ml-2 md:text-sm text-xs font-normal">
              *To summarize metrics for a group of neighborhoods, record information from the
              sidebar for each neighborhood, then present the average or the range of values for the
              group.
            </p>
          </div>
          <AccordionWithChildren>
            <AccordionItem
              title="Decode the block group rank "
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  Every locality (e.g., a town, city or village) has a unique landscape of Tree
                  Equity Scores. The block group rank helps you quickly identify areas in your
                  community with the lowest rank and greatest priority.
                </li>
                <li className="pt-2 ml-8">
                  For each locality, all block groups are ranked in order of their Tree Equity
                  Scores. Block groups ranked "1st" have the highest Tree Equity Scores (usually
                  100), meaning those locations have enough trees.
                </li>
                <li className="pt-2 ml-8">
                  The bigger the rank, the lower the Tree Equity Score. A block group ranked 270th
                  out of 271 block groups, for example, can be considered among the highest priority
                  within a locality based on Tree Equity Score.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Understand the tree canopy goal"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ul className="list-disc pb-4 font-normal text-sm pr-4">
                <li className="pt-2 ml-8">
                  The red status bar at the bottom of the sidebar represents the canopy cover goal
                  for the highlighted block group. It shows the current canopy cover level as a
                  measure of progress, with a gap indicating the amount of additional tree canopy
                  needed to reach the goal.
                </li>
                <li className="pt-2 ml-8">
                  The canopy cover goal represents a minimum percentage of tree canopy required to
                  deliver the requisite benefits of trees to a block group, adjusted based on
                  natural biome and building density.
                </li>
                <li className="pt-2 ml-8">
                  Block groups with canopy cover that meets or surpasses their tree canopy goal are
                  assigned a Tree Equity Score of 100.
                </li>
                <li className="pt-2 ml-8">
                  Tree canopy goals represent a minimum standard of tree cover for all neighborhoods
                  that is considered appropriate to local urban ecologies and are not based on goals
                  set by cities.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Decipher the spider chart"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-4 pl-10 ${styles.smallListNumber} `}>
                  Tree Equity Score is a combined measure of tree canopy need and an index comprised
                  of seven priority indicators. The spider chart, also known as a radar chart,
                  provides a visual breakdown of the indicators that influence the score for each
                  block group.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Axes: The spider chart consists of multiple axes radiating from a central point,
                  like spokes on a wheel. Each axis represents a different priority indicator. Each
                  axis is a scale that represents the range of each indicator value for the locality
                  overall (all indicators are standardized for visual comparison).
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Data points: Priority indicator values for your highlighted block group are mapped
                  as red points along each axis. The position of the dot reveals where the data
                  points fall within the overall range of values within the locality. The further
                  the point is from the center of the chart, the more that indicator contributes to
                  lowering the Tree Equity Score for the block group.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Shape: All data points are connected with lines, forming a shaded web shape within
                  the spider chart. In general, the larger the shaded area, the lower the Tree
                  Equity Score and higher the priority. Comparing the shape of the spider web across
                  different block groups can help you relatively quickly assess the drivers of Tree
                  Equity Score.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Once you learn how to read it, the spider chart is a valuable tool to gain
                  insights. Quickly assess patterns for different variables in your locality. Tease
                  out the variables that have the most influence on Tree Equity Score for each
                  priority block group.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Access dynamic reports"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-normal text-sm pb-3 pr-4">
                Dynamic reports can help you communicate what it takes to raise Tree Equity Scores
                at a regional level. Dynamic reports are available at four administrative scales:
                Locality (e.g., a town, city or village), County, Congressional District and State.
                Each report provides valuable summary metrics, interactive visualizations to help
                you gain insights for your area of interest, and computational tools to help you
                assess scenarios and highlight the numerous benefits that can be gained by raising
                Tree Equity Scores within your community.
              </p>
              <p className="pl-4 font-medium text-sm">From the map</p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                  Click on a shaded block group on the map. The "Dynamic Reports" menu will open in
                  the upper right corner, showing all available reports for the highlighted block
                  group.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  Choose a scale: Dynamic reports are available at up to four administrative scales
                  from every block group: Locality (e.g., a town, city or village), County,
                  Congressional District and State (always listed in that order).
                </li>
                <li className={`pb-5 pl-10 ${styles.smallListNumber}`}>
                  Click on a link to open a dynamic report.
                </li>
              </ol>
              <p className="pl-4 font-medium text-sm pb-2">
                Alternatively, you can search for reports anywhere in the United States. Click
                "Search all reports."
              </p>
              <p className="pl-4 font-normal text-sm">
                <i>To search for dynamic reports by the name of a locality, county or state:</i>
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                  Open the "Locality, county or state reports" tab.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  Start typing the name of a locality, county or state into the search bar.
                </li>
                <li className={`pb-4 pl-10 ${styles.smallListNumber}`}>
                  Select the best match from the list to open the dynamic report.
                </li>
              </ol>
              <p className="pl-4 font-normal text-sm">
                <i>To search for congressional district reports:</i>
              </p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-2 pl-10 ${styles.smallListNumber} `}>
                  Open the "Congressional district reports" tab.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  Select your state from the dropdown menu.
                </li>
                <li className={`pb-2 pl-10 ${styles.smallListNumber}`}>
                  Optionally, select a city to narrow the results.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Choose a district from the list to open the dynamic report.
                </li>
              </ol>
              <p className="pl-4 font-normal text-sm pb-2">
                If you don't know your district, return to the map. Use the search bar located in
                the upper left of the map to search for your address. Click on your block group. Now
                your district report will display in the "Reports" menu.
              </p>
            </AccordionItem>
            <AccordionItem
              title="Interpret the demographic summary"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  When you open a dynamic report, the first section provides an overview of
                  population characteristics to help you understand the demographic context of the
                  urban areas in your selected geography.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  The summary is specific to the coverage of Tree Equity Score, which includes only
                  the urban areas within each locality, county, congressional district and state, as
                  defined by Census.
                </li>
              </ol>
            </AccordionItem>
            <AccordionItem
              title="Interact with the charts"
              variant="secondary"
              theme="blue"
              className={styles.accordionItemSecondary}
            >
              <p className="pl-4 font-medium text-sm pt-2 pr-4">Left chart</p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Tree Equity Scores: This chart shows the distribution of Tree Equity Scores in
                  your selected geography. The scores are divided into different priority levels:
                  Highest (0-69), High (70-79), Moderate (80-89), Low (90-99), and None (100).
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  The summary is specific to the coverage of Tree Equity Score, which includes only
                  the urban areas within each locality, county, congressional district and state, as
                  defined by Census.
                </li>
              </ol>
              <p className="pl-4 font-medium text-sm pr-4">Right chart</p>
              <ol className="[counter-reset:list-number] relative pt-2 font-normal text-sm pr-4">
                <li className={`pb-3 pl-10 ${styles.smallListNumber} `}>
                  Canopy Cover Distribution: This chart evaluates tree canopy cover against selected
                  demographic parameters in your chosen area.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Default View: The default view clusters block groups based on the percentage of
                  people of color and displays the average tree canopy cover for each cluster.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Tooltips: Hover or tap to view tooltips that display the number of block groups in
                  each cluster.
                </li>
                <li className={`pb-3 pl-10 ${styles.smallListNumber}`}>
                  Change Chart Parameters: To explore different demographic parameters, use the
                  dropdown menu to select a different clustering parameter for the X-axis of the
                  chart.
                </li>
              </ol>
            </AccordionItem>
          </AccordionWithChildren>
        </AccordionItem>
        <AccordionItem
          title="Step 6. Define key terms. "
          variant="primary"
          theme="blue"
          className={styles.accordionItemPrimary}
        >
          <p className="py-4 pl-4 pr-4">
            Go to our{" "}
            <a
              href="/methodology"
              className="text-brand-green"
              target="_blank"
              rel="noreferrer noopener"
            >
              Methods & Data
            </a>{" "}
            page for definitions and guidance to help you communicate the science that powers Tree
            Equity Score.
          </p>
        </AccordionItem>
      </AccordionWithChildren>
    </section>
  </div>
)

const Resources: BlitzPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = router.query.tab as string
    const foundTab = tabs.find((tab) => tab.slug === tabParam)
    return foundTab ? foundTab.label.toLowerCase() : "starter guide"
  })
  const handleTabSelection = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, tab: typeof tabs[0]) => {
      event.preventDefault()
      setActiveTab(tab.label.toLowerCase())
      router.push(`/resources?tab=${tab.slug}`, undefined, { shallow: true })
    },
    [router]
  )
  // ensure active tab updates when new link is clicked
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const tabParam = new URLSearchParams(url.split("?")[1]).get("tab")
      const foundTab = tabs.find((tab) => tab.slug === tabParam)
      if (foundTab) {
        setActiveTab(foundTab.label.toLowerCase())
      }
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router])

  return (
    <div className="min-h-screen">
      <section
        style={{
          backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/Parcel_Tree_Banner_DarkerGr_gdt.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          imageRendering: "crisp-edges",
        }}
      >
        <div className="bg-white">
          <Header />
        </div>
        <div className="pt-32 w-4/5 m-auto">
          <div>
            <p className="xl:text-[46px] lg:text-[40px] text-3xl md:leading-snug font-medium text-white pb-2">
              Resources
            </p>
            <p className="text-2xl md:leading-snug font-light text-white  pb-20">
              Take the next steps with Tree Equity Score.
            </p>
            <div className="xl:w-3/5 lg:w-4/5 w-full m-auto flex flex-row justify-between">
              {tabs.map((tab) => (
                <Tab
                  key={tab.slug}
                  label={tab.label}
                  handleClick={(event) => handleTabSelection(event, tab)}
                  isSelected={activeTab === tab.label.toLowerCase()}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {activeTab === "watch a demo" && <DemoPanel />}
      {activeTab === "starter guide" && <StarterGuidePanel />}
      {activeTab === "resources" && <ResourcesPanel />}

      <Footer />
    </div>
  )
}

Resources.getLayout = (page) => <Layout title={"Resources"}>{page}</Layout>
export default Resources
