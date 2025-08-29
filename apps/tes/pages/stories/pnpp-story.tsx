import Head from "next/head"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import React from "react"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const PNPPStory: BlitzPage = () => {
  function Indicator(
    clickHandler: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
    isSelected: boolean
  ): React.ReactNode {
    return (
      <span
        className={`inline-block sm:h-[16px] sm:w-[16px] h-[14px] w-[14px] sm:ml-[8px] ml-[6px] sm:mr-[6px] mr-[6px] lg:mb-4 mb-0 border-[0.8px] border-[#ada3a9] rounded-[50%] tranisition-all ease-in-out duration-[600ms] hover:border-[#7a6c6c] cursor-pointer ${
          isSelected ? "bg-[#c3bf9a] border-[#7a6c6c]" : "bg-[#f4f0ca]"
        } hover:bg-[#c3bf9a]`}
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
        className={`absolute z-10 rounded-[50%] leading-[10px] border border-[#c3bf9a] text-[#ada3a9] transition-all duration-[600ms] font-light sm:p-[20px] p-3 text-[20px] hover:bg-[#c3bf9a] hover:border-[#7a6c6c] hover:text-[#7a6c6c] cursor-pointer ${
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
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-center flex flex-col items-center justify-center">
      <p className="md:text-5xl text-4xl md:leading-tight leading-tight w-4/5">
        Unlocking Tree Equity Score
      </p>
      <p className="md:pt-10 pt-5 md:pb-20 pb-10 md:text-2xl text-lg lg:w-2/3 w-full">
        How a Providence, Rhode Island non-profit is partnering with their community to take Tree
        Equity to the next level
      </p>
      <div className="w-fit">
        <img
          className="md:h-56 h-24"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-our-trees.png`}
          alt="illustration of a child and their parents' hands holding a tree icon"
        />
      </div>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-center flex flex-col items-center justify-center">
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The Providence Neighborhood Planting Program is a small non-profit in Providence, Rhode
        Island. They work to replenish the urban forest by providing free street trees and training
        community tree stewards. Since their inception in 1988, the organization has planted over
        14,000 street trees and engaged thousands of residents.
      </p>
      <p className="lg:pt-4 pt-2 md:pb-10 pb-3 md:text-base text-sm lg:w-2/3 w-full">
        Under the leadership of Executive Director Cassie Tharinger, the organization has been
        working to focus more resources on developing partnerships in the community to help lead
        planting efforts in Providence's lowest canopy neighborhoods.
      </p>
      <div className="w-fit">
        <img
          className="h-24"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-servingtrees.png`}
          alt="illustrated plate with a tree icon and fork."
        />
      </div>
      <p className="md:pt-10 pt-3 md:text-xl text-lg lg:w-2/3 w-full">
        They are using the Rhode Island Tree Equity Score Analyzer to target areas with the greatest
        need, empower community leadership and attract funding.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-64 sm:h-56 h-36"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-hourglass.png`}
          alt="illustrated hourglass filled with tree icons"
        />
      </div>
      <p className="pt-5 md:text-2xl text-lg lg:w-2/3 w-full">
        "There are no shortcuts to this work," says Tharinger. "It takes a lot of time, but it's
        worth it and necessary."
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="xl:h-[440px] lg:h-80 sm:h-72 h-56"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp_map_v2.png`}
          alt="Map of Providence's Tree Equity Score showing low scores in South Providence. 
          A callout image shows a shady, tree-lined street in the Blackstone Boulevard neighborhood. 
          Another callout image shows a street in South Providence with very few trees."
        />
      </div>
      <p className=" xl:pt-6 pt-2 md:text-2xl text-xl font-semibold lg:w-2/3 w-full">
        Dangerously few trees.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        In 2022, the organization kicked off a new planting initiative in South Providence, an area
        fractured by Interstate 95. Here, residents are predominately Black and Latino, many living
        below the poverty line.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The lack of tree canopy and shade produces some of the most extreme summer temperatures in
        the city, creating dangerous living conditions for residents.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-center flex flex-col items-center justify-center">
      <p className="md:pb-10 pb-5 md:text-2xl text-lg lg:w-2/3 w-full">
        Tharinger shares three tactics the organization used to leverage the power of Tree Equity
        Score.
      </p>
      <div className="w-fit">
        <img
          className="lg:h-64 h-40"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-cards.png`}
          alt="three playing cards illustrated with tree icons."
        />
      </div>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-64 h-40"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-housing.png`}
          alt="Illustration of a row of three houses with tree icons in front."
        />
      </div>
      <p className="text-sm font-semibold tacking-widest lg:w-2/3 w-full xl:pt-6 pt-2">TACTIC 1</p>
      <p className="md:text-2xl text-xl font-semibold lg:w-2/3 w-full">
        Find unconventional allies.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The organization struck up a relationship with the Providence Housing Authority, one of the
        neighborhood's main landlords. Their homes occupy some of the lowest scoring parts of the
        city.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        "The Providence Housing Authority already knew their properties lacked trees," says
        Tharinger.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        Tree Equity Score illuminated the possibilities. The Housing Authority saw that the whole
        area could reap the benefits. Each tree planted on private property is raising the area's
        scores, improving the quality of life for residents by providing shade and improving air
        quality.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-72 h-48"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-students.png`}
          alt="illustrated map held in children's hands."
        />
      </div>
      <p className="text-sm font-semibold tacking-widest lg:w-2/3 w-full xl:pt-6 pt-2">TACTIC 2</p>
      <p className="md:text-2xl text-xl font-semibold lg:w-2/3 w-full">Partner with youth.</p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        360 High School is situated in one of the lowest scoring sections of South Providence. The
        lack of trees in this area is immediately noticeable. Students and residents are living with
        the consequences, from extreme heat in the summer to higher rates of asthma.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        Students and staff of Green Alliance, an afterschool ecology club at the high school,
        collaborated with Planting Program staff to develop a neighborhood planting plan. Students
        led efforts to cross-reference Tree Equity Score maps with outdoor observations. Then the
        youth took to the wider community, knocking on doors to engage residents in conversations
        about Tree Equity.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-56 h-48"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-family.png`}
          alt="illustration of a salad bowl and salad tongs filled with tree icons."
        />
      </div>

      <p className="lg:pt-10 pt-2 md:text-2xl text-lg xl:w-1/2 lg:w-2/3 w-full text-center">
        "We got to know the youth," says Tharinger. "They then talked to their families and
        communities, which helped build community buy-in and generate momentum."
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-64 h-36"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-funders.png`}
          alt="illustrated laptop displaying a bar graph and thermometer."
        />
      </div>
      <p className="text-sm font-semibold tacking-widest lg:w-2/3 w-full xl:pt-6 pt-2">TACTIC 3</p>
      <p className="md:text-2xl text-xl font-semibold lg:w-2/3 w-full">
        Bring funders on board with data.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The organization turned to the Tree Equity Score Analyzer again, this time to gain support
        from funders and key stakeholders for their new programs. According to Tharinger, their
        supporters are already sold on trees. The challenge is gaining buy-in on a course of action
        for Tree Equity. She says human-centered data helped create impetus.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The staff accessed data in the Tree Equity Score Analyzer to demonstrate where trees are
        needed most. They used the tool to generate metrics on heat severity and potential health
        benefits such as air quality improvement to communicate the measurable impact to funders.
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-80 h-60"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-allocation.png`}
          alt="illstrated balance filled with trees."
        />
      </div>
      <p className="lg:pt-10 pt-2 md:text-2xl text-lg xl:w-1/2 lg:w-2/3 w-full text-center">
        "Having Tree Equity Score...allows us to more clearly and emphatically make the case for
        allocating the majority of our funds where they're needed most. We see TESA [Tree Equity
        Score Analyzer] as key to socializing our plan with stakeholders and funders."
      </p>
    </div>,
    <div className="xl:w-2/3 lg:w-4/5 w-11/12 h-screen m-auto text-left flex flex-col items-center justify-center">
      <div className="w-fit">
        <img
          className="lg:h-72 h-48"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp-maintenance.png`}
          alt="illustrated toolbox with a handsaw, clippers, watering can, and tree icons."
        />
      </div>
      <p className="md:text-2xl text-xl font-semibold lg:w-2/3 w-full xl:pt-6 pt-2">
        Hard work pays off.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        The program completed 142 new tree plantings in South Providence through this initiative
        during their 2022 planting season, surpassing the initiative's goals for the year. Using
        Tree Equity Score Analyzer, the organization has estimated that these trees, which include
        45 unique species, will add nearly three acres to the urban canopy once matured.
      </p>
      <p className="lg:pt-4 pt-2 md:text-base text-sm lg:w-2/3 w-full">
        To take the burden of tree care off residents, they also incorporated young tree care into
        all of the plantings, weaving together a network of maintenance and watering services
        through volunteers, community groups, youth and adult education, jobs training programs and
        contractors. Tree Equity Score is providing the confidence to ensure trees are planted and
        cared for where they have the most benefit to the South Providence community.
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
          content="Unlocking Tree Equity Score - Tiny Stories by American Forests"
          key="title"
        />
        <meta
          property="og:description"
          content="How a Providence, Rhode Island non-profit is partnering with their
          community to take Tree Equity to the next level."
          key="description"
        />
        <meta
          property="og:image"
          content={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp_social_share.jpg`}
          key="image"
        />
        <meta
          property="og:url"
          content="https://www.treeequityscore.org/stories/pnpp-story/"
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
          className="min-h-screen flex place-items-center bg-gradient-to-b from-[#F4EFB9] via-[#f4f0ca] to-[#f4f0ca]"
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
          <a href="https://pnpp.org/" target="_blank" rel="noreferrer" className="underline">
            Providence Neighborhood Planting Program
          </a>
          , Cassie Tharinger, Dana Henry and Molly Henry. <br />
          Copyright <i className="fa-regular fa-copyright text-xs"></i> 2023 American Forests. All
          Rights Reserved.
          <br />
          <br />
        </p>
      </section>
    </div>
  )
}

PNPPStory.getLayout = (page) => (
  <Layout title={"Unlocking Tree Equity Score - Tiny Stories by American Forests"}>{page}</Layout>
)
export default PNPPStory
