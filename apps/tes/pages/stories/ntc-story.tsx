import Head from "next/head"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import React from "react"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const NTCStory: BlitzPage = () => {
  function Indicator(
    clickHandler: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
    isSelected: boolean
  ): React.ReactNode {
    return (
      <span
        className={`inline-block sm:h-[16px] sm:w-[16px] h-[14px] w-[14px] sm:ml-[8px] ml-[6px] sm:mr-[6px] mr-[6px] lg:mb-4 mb-0 border-[0.6px] border-[#ada3a9] rounded-[50%] tranisition-all ease-in-out duration-[600ms] cursor-pointer ${
          isSelected ? "bg-[#ada3a9]" : "bg-[#d5cfd2]"
        } hover:bg-[#ada3a9]`}
        onClick={clickHandler}
      />
    )
  }

  function Arrow({
    onClick,
    children,
    className,
  }: {
    onClick: () => void
    children: React.ReactNode
    className?: string
  }) {
    return (
      <a
        className={`absolute z-10 rounded-[50%] leading-[10px] border border-[#ada3a9] text-[#ada3a9] transition-all duration-[600ms] font-light sm:p-[20px] p-3 text-[20px] hover:bg-[#bdb5ba] hover:border-[#d5cfd2] hover:text-[#d5cfd2] cursor-pointer ${
          className ? className : ""
        }`}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  function NextArrow(clickHandler: () => void): React.ReactNode {
    return (
      <Arrow
        onClick={clickHandler}
        className="xl:right-[16vw] right-[4vw] top-[50%] lg:block hidden"
      >
        &#10095;
      </Arrow>
    )
  }

  function PrevArrow(clickHandler: () => void): React.ReactNode {
    return (
      <Arrow onClick={clickHandler} className="xl:left-[16vw] left-[4vw] top-[50%] lg:block hidden">
        &#10094;
      </Arrow>
    )
  }

  const SLIDES: React.ReactChild[] = [
    <div className="lg:w-2/3 w-11/12 h-screen m-auto text-center flex flex-col items-center justify-center">
      <p className="md:text-5xl text-4xl md:leading-tight leading-tight w-4/5">
        Tree Equity Score in Action
      </p>
      <p className="md:pt-10 pt-5 md:pb-20 pb-10 md:text-2xl text-lg lg:w-2/3 w-full">
        Newport Tree Conservancy: The non-profit on a mission to bring Tree Equity to Newport, Rhode
        Island
      </p>
      <div className="w-fit">
        <img
          className="md:h-32 h-24"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-paint-trees.png`}
          alt="illustrated paintbrush dripping green paint and tree icons"
        />
      </div>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-center flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="md:h-80 h-56"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-birdcage.png`}
          alt="illustration of tree icons inside a birdcage"
        />
      </div>
      <p className="pt-5 md:text-2xl text-lg lg:w-2/3 w-full">
        "There's a lot of conversations these days about addressing historical inequity in Newport.
        Our work in Tree Equity focuses our mission and helps build momentum because it fits in with
        the ways Newport is trying to change."
      </p>
      <p className="pt-4 text-xl">-Natasha Harrison</p>
      <p className="sm:text-base text-sm">Executive Director of Newport Tree Conservancy</p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-72 sm:h-64 h-36"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-underneath.png`}
          alt="illustrated mansion with many trees transposed over a row of small houses with few trees"
        />
      </div>
      <p className="pt-5 md:text-xl sm:text-lg text-sm lg:w-2/3 w-full">
        When most people think of Newport, Rhode Island, they picture the luxurious summer homes of
        the wealthy. But beneath the surface, the city is grappling with uneven wealth and access to
        natural resources, like trees.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        Newport Tree Conservancy is a local nonprofit on a mission to support a healthy and
        resilient urban forest. Since 1987, the organization has given away thousands of free trees,
        established a citywide arboretum, helped shape city policies, set up a teaching nursery, and
        provided a range of educational programs and tree maintenance services.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The organization recently took a deep look at their annual planting program. They found
        their first-come-first-serve tree giveaway was inadvertently serving residents who lived in
        wealthier, greener neighborhoods. It was time for a change.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="xl:h-96 lg:h-72 sm:h-64 h-48"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc_map_v2.png`}
          alt="Map of Newport's Tree Equity Score showing low scores in the North End and higher scores 
     in the south. A callout image shows a shady, tree-lined street on 
     Bellevue Avenue. Another callout image shows a street in the North End with very few trees."
        />
      </div>
      <p className="pt-2 md:text-2xl text-xl font-semibold lg:w-2/3 w-full">
        Newport's hidden inequality.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        Mapping Newport's Tree Equity Score reveals the city's tree coverage divide. "The North End
        is really cut off and distinct from the South," says Harrison.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        There are fewer trees in the North End, particularly along the area's exposed and unshaded
        residential streets. Nearly half of all households in this part of town are living below the
        poverty line, and the area is home to the majority of the city's residents of color.
      </p>{" "}
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The North End has been selected as one of the state's fifteen Health Equity Zones. This
        designation is helping cities like Newport leverage investment and support community-led
        solutions to eliminate disparities in livability.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-center flex flex-col items-center justify-center">
      <p className="md:pb-10 pb-5 md:text-2xl text-lg lg:w-2/3 w-full">
        Now, the Newport Tree Conservancy is making sure every resident of Newport reaps the
        benefits of trees. <br />
        How? They are putting Tree Equity Score to work.
      </p>
      <div className="w-fit">
        <img
          className="lg:h-64 h-40"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-tactics.png`}
          alt="illustrated tic-tac-toe board showing three tree icons in a row."
        />
      </div>
      <p className="md:pt-10 pt-5 md:text-2xl text-lg lg:w-2/3 w-full">
        Check out three tactics they are using...
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-60 h-40"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-divisions.png`}
          alt="illustration of a map showing an area with many trees and an area with few."
        />
      </div>
      <p className="text-sm font-semibold tacking-widest lg:w-2/3 w-full xl:pt-6 pt-2">TACTIC 1</p>
      <p className="md:text-2xl text-xl font-semibold lg:w-2/3 w-full">
        Use data to inspire action.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        For years, the Newport Tree Conservancy had been aware of the lack of trees in the North
        End. But they needed board support to shift from a simple tree giveaway to a more intensive
        program model.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        They turned to Tree Equity Score to extract precise, measurable data on the disparities in
        tree cover, heat and health.
      </p>{" "}
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        "The tool gave us the data we needed," says Harrison. "TESA [Tree Equity Score Analyzer]
        confirmed our instincts - that we needed to prioritize the [North End] because that's where
        the lowest Tree Equity Scores are. We could move forward with confidence because our plan
        was no longer subjective."
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-64 h-48"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-remodel.png`}
          alt="illustrated paint can and brush dripping green paint and tree icons."
        />
      </div>
      <p className="lg:pt-8 pt-2 md:text-base text-sm xl:w-1/2 lg:w-2/3 w-full text-center">
        In 2022, Newport Tree Conservancy got approval from their board to remodel their planting
        program to focus on equity.
      </p>
      <p className="lg:pt-4 pt-2 md:text-2xl text-lg xl:w-1/2 lg:w-2/3 w-full text-center">
        "We have a big opportunity to improve tree coverage in areas that need it most," concluded
        Robert Currier, a Newport Tree Conservancy board member.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-72 h-48"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-funding.png`}
          alt="illustrated faucet with trees streaming out of the tap."
        />
      </div>
      <p className="text-sm font-semibold tacking-widest lg:w-2/3 w-full xl:pt-6 pt-2">TACTIC 2</p>
      <p className="md:text-2xl text-xl font-semibold lg:w-2/3 w-full">Tap into funding.</p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The intensive new model would require more resources and staff time. The organization needed
        a bigger budget to support outreach, planting and maintenance services.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        Turning back to the Tree Equity Score Analyzer, the staff gathered data and secured a grant
        under the USDA State Urban Forest Resilience Grant Initiative for their 2022 work.
      </p>{" "}
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The following year, they won a $35,000 "Citizens in Action" grant from Citizens Bank to
        continue their work to address racial and economic disparities through Tree Equity.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-96 h-60"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-freetrees.png`}
          alt="illustration of tree icons escaping like butterflies from a birdcage."
        />
      </div>
      <p className="lg:pt-10 pt-2 md:text-2xl text-lg xl:w-1/2 lg:w-2/3 w-full text-center">
        "TESA [Tree Equity Score Analyzer] helped us communicate how our program can elevate
        everyone's access to the benefits of trees," says Harrison.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-64 h-36"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-residents-tree.png`}
          alt="illustration of a potted tree held by child and their parents' hands."
        />
      </div>
      <p className="text-sm font-semibold tacking-widest lg:w-2/3 w-full xl:pt-6 pt-2">TACTIC 3</p>
      <p className="md:text-2xl text-xl font-semibold lg:w-2/3 w-full">
        Build meaningful relationships.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The organization is making it a priority to get to know North End residents.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        They introduced the free tree program through direct mailings and flyers featuring simple
        Tree Equity Score maps and metrics. Then, staff arborists headed onsite to work with each
        resident to select and plant their tree. The staff fielded questions from passers-by and
        chatted up locals about Tree Equity and the generational health benefits of trees.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-80 h-40"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-mailbox.png`}
          alt="illustrated mailbox open with tree icons spilling out."
        />
      </div>
      <p className="lg:pt-10 pt-2 md:text-2xl text-lg xl:w-1/2 lg:w-2/3 w-full text-center">
        "People might not have been looking for a tree program, but they're starting to see trees
        going into the ground," says Joe Verstandig, Living Collections Manager at Newport Tree
        Conservancy. "They ask questions and we can talk to them about Tree Equity and the impact
        for their community."
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-72 h-48"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc-paintthetown.png`}
          alt="illustration of a paint roller held in a child's hands leaving a streak of green paint and tree icons over a town."
        />
      </div>
      <p className="md:text-2xl text-xl font-semibold lg:w-2/3 w-full">
        Door by door, tree by tree.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        Newport Tree Conservancy has continued to ramp up their community engagement work. Staff are
        spending even more time going door-to-door and holding community events to get to know
        residents.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        They use Tree Equity Score Analyzer's property-level data to find sites for new tree
        plantings and guide outreach.
      </p>
      <p className="lg:pt-3 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        "We're in the right neighborhoods," says Harrison. "Now we need to get down to specific
        streets where Tree Equity can be dramatically improved and hone our communication strategy
        to engage those residents."
      </p>
    </div>,
  ]

  return (
    <div className="min-h-screen">
      <Head>
        {/* Open Graph Protocol metadata that specifies how stuff renders for social sharing,
            that we want to override, to see the default variables, go to /pages/_app.tsx */}
        <meta
          property="og:title"
          content="Tree Equity Score in Action - Tiny Stories by American Forests"
          key="title"
        />
        <meta
          property="og:description"
          content="Newport Tree Conservancy: The non-profit on a mission to bring Tree Equity to Newport, Rhode Island."
          key="description"
        />
        <meta
          property="og:image"
          content={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc_social_share.jpg`}
          key="image"
        />
        <meta
          property="og:url"
          content="https://www.treeequityscore.org/stories/ntc-story/"
          key="url"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        {/* Story */}
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={false}
          showThumbs={false}
          interval={4000}
          showStatus={false}
          renderIndicator={Indicator}
          renderArrowNext={NextArrow}
          renderArrowPrev={PrevArrow}
          className="min-h-screen flex place-items-center bg-gradient-to-b from-[#E4DDE1] to-[#d5cfd2]"
        >
          {SLIDES.map((slide) => slide)}
        </Carousel>
      </div>

      {/* Footer */}

      <section className="text-center m-auto text-neutral-400 text-xs bg-[#343434]">
        <img className="h-16 text-center m-auto" src="/AF-Logo-Knockout-LtGreen-Horiz.png" />
        <p className="-mt-2">
          Article and design by&nbsp;
          <a
            href="https://www.americanforests.org/personnel/julia-twichell/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Julia Twichell
          </a>
          . Code by&nbsp;
          <a
            href="https://www.americanforests.org/personnel/chase-dawson/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Chase Dawson
          </a>
          .
          <br />
          Special thanks to the&nbsp;
          <a
            href="https://www.newporttreeconservancy.org/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Newport Tree Conservancy
          </a>
          , Natasha Harrison, Dana Henry and Molly Henry. <br />
          Copyright <i className="fa-regular fa-copyright text-xs"></i> 2023 American Forests. All
          Rights Reserved.
          <br />
          <br />
        </p>
      </section>
    </div>
  )
}

NTCStory.getLayout = (page) => (
  <Layout title={"Tree Equity Score in Action - Tiny Stories by American Forests"}>{page}</Layout>
)
export default NTCStory
