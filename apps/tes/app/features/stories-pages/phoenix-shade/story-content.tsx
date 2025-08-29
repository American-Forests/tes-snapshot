import { Scrollama, Step } from "react-scrollama"
import { boldText } from "./phoenix-shade-constants"
import { mainText, staticText, superText, imageCaption, stepStart, stepMain, stepEnd, stepTransition } from "../shared/constants"
import { StoryContentProps } from "../shared/types"
import BackgroundImage from "../shared/background-image"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import BasicLink from "../shared/basic-link"
import FlourishChart from "../shared/flourish-chart"

const StoryContent: React.FC<StoryContentProps> = ({ onStepEnter, currentStepImage }) => {
  return (
    <>
      <main className="bg-black">
        {/* SCROLLY */}
        <section className="relative w-full m-auto">
          <BackgroundImage
            image={currentStepImage}
            style="cover"
          />
          <article className="relative flex-1 items-center justify-center">
            <Scrollama offset={0.5} onStepEnter={onStepEnter}>
              <Step data="/phx_sun.jpg">
                <div className={stepStart} id="why">                    
                  <div className={mainText}>
                    Phoenix is ground zero for extreme heat. In 2024, the county recorded its hottest 
                    summer yet, nearly 2°F hotter than 2023, with{" "}
                    <span className={boldText}>113 days above 100°F</span>.
                    <br />
                    <br />
                    The impact is devastating. Heat-related deaths in the county have surged{" "}
                    <span className={boldText}>900%</span> since 2014, from 61 to{" "}
                    <span className={boldText}>645 deaths</span> in 2023. An average of{" "}
                    <span className={boldText}>13 people died every day in July 2023</span> from exposure. 
                    Nearly two-thirds of those deaths occurred in Phoenix alone.
                  </div>
                </div>
              </Step>
              <Step data="/phx_splash_park.jpg">
                <div className={stepMain} id="why2">
                  <div className={mainText}>
                    Extreme heat poses the greatest risks to children and seniors, as well as people with 
                    health sensitivities, limited coping resources or high exposure to heat.
                    <br />
                    <br />
                    But here's the game-changer: <span className={boldText}>shade reduces heat burden by up to 50%</span>, 
                    making sweltering parks, playgrounds and streets feel cooler.
                    <span className={superText}>1</span>
                    <img
                      src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/ucla_heat_graphic.jpg`}
                      className="mt-4"
                    />
                    <p className="text-xs pt-1 text-right">
                      <BasicLink
                        url="https://innovation.luskin.ucla.edu/publication/the-problem-with-hot-schools/"
                        text="UCLA Luskin Center for Innovation"
                      />
                    </p>
                  </div>
                </div>
              </Step>
              <Step data="/phx_spaces_oppty_commty_gardens.jpg">
                <div className={stepMain} id="why3">
                  <div className={mainText}>
                    For any city grappling with extreme heat, shade isn't just an amenity — it's{" "}
                    <span className={boldText}>essential infrastructure</span>.
                  </div>
                </div>
              </Step>
              <Step data="/phx_bus_shelter_lores2.jpg">
                <div className={stepMain} id="vision">
                  <div className={mainText}>
                    The ground-breaking <span className={boldText}>2024 Shade Phoenix Plan</span>{" "}
                    commits over <span className={boldText}>$60 million</span> to shade investments in 
                    just 5 years, focusing on equity and prioritizing lower-income communities.
                    <br />
                    <br />
                    The plan outlines <span className={boldText}>36 clear actions</span> for key spaces, 
                    including parks and playgrounds, which serve as lifelines for cooling and recreation.
                  </div>
                </div>
              </Step>
              <Step data="/phx_fountain_hills_az.jpg">
                <div className={stepEnd} id="vision2">
                  <div className="md:text-xl text-sm bg-[#171717]/80 text-white p-4 md:p-6 w-[90%] md:max-w-3xl sm:max-w-2xl max-w-xl mx-auto flex-1 text-center z-30 overflow-auto">
                    The plan establishes shade recommendations to guide citywide improvements, ensuring{" "}
                    <span className={boldText}>shade is placed where it matters most</span> — where people 
                    gather and where use is more intensive.
                    <br />
                    <br />
                    <table className="w-full border-collapse md:text-sm text-xs [&_td]:p-2">
                      <colgroup>
                        <col className="w-[24%] p-2" />
                        <col className="w-[40%]" />
                        <col className="w-[12%]" />
                        <col className="w-[12%]" />
                        <col className="w-[12%]" />
                      </colgroup>
                      <tbody>
                        <tr className="font-bold border-b">
                          <td></td>
                          <td></td>
                          <td>Minimum shade cover</td>
                          <td>Better shade cover</td>
                          <td>Optimal shade cover</td>
                        </tr>
                        <tr>
                          <td className="font-bold border-none text-left" rowSpan={2}>
                            High duration heat exposure, forced outside wait, use by high-risk populations, or high intensity activity
                          </td>
                          <td className="border-b text-left">
                            <span className="font-bold">Highest Priority:</span> Bus stops, playground equipment and seating
                          </td>
                          <td className="border-b">100%</td>
                          <td className="border-b">100%</td>
                          <td className="border-b">100%</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            School pick up/drop off zones, intersections, sidewalks, plazas, eating areas, parking spots, play area sidelines, bleachers, event queue areas
                          </td>
                          <td>25%</td>
                          <td>50%</td>
                          <td>75%</td>
                        </tr>
                        <tr className="border-t border-b">
                          <td className="font-bold text-left">
                            Short duration heat exposure, low occupancy, or light activity
                          </td>
                          <td className="text-left">
                            Residential yards, open space, dog parks, parking lots, open space in parks
                          </td>
                          <td>10%</td>
                          <td>20%</td>
                          <td>30%</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-xs pt-1 text-right">
                      <BasicLink
                        url="https://www.phoenix.gov/heat/shade"
                        text="Shade Phoenix Plan"
                      />, pg. 43
                    </p>
                  </div>
                </div>
              </Step>
              <Step data={null}>
                <div className={stepTransition}>
                  <div className="h-screen bg-black -mb-[100vh]" />
                </div>
              </Step>
            </Scrollama>
          </article>
        </section>
        <section className="relative w-full m-auto" id="cutting-edge">
          <article className="relative flex flex-col items-center">
            <div className={staticText}>
              To make this vision a reality, Phoenix has a powerful new tool. In partnership with the 
              UCLA Luskin Center for Innovation and American Forests, state-of-the-art, county-wide shade 
              data is now available through the{" "}
              <span className={boldText}>Maricopa County Tree Equity Score Analyzer</span>.
              <br />
              <br />
              This tool provides high resolution information and supports people-centered urban planning to 
              address damaging outcomes that result from inequitable tree distribution.
              <br />
              <br />
              UCLA's analysis uses 2020 LIDAR and Microsoft Building Footprints to model{" "}
              <span className={boldText}>vegetation (primarily trees) and built features</span>, then applies 
              a shade algorithm on June 21, the longest day of the year, at noon, 3 p.m. and 6 p.m.
            </div>
            <img
              src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/shade_animation.gif`}
              className="h-auto xl:h-[calc(100vh-20rem)] object-contain"
            />
            <div className={imageCaption}>
              UCLA Luskin Center's raw shade data at noon, 3 p.m. and 6 p.m.
            </div>
            <div className={staticText}>
              The data estimates <span className={boldText}>2020 shade cover</span>, how it changed 
              over the course of a day and <span className={boldText}>where it was missing</span>.
              <br />
              <br />
              We applied the data for insights about Phoenix parks. At midday, shade levels in 2020 were{" "}
              <span className={boldText}>below the "optimal" recommendation (30% cover) in 89% of parks</span>. 
              20% of parks were below the minimum level (10% cover).
            </div>
            <div className={`${imageCaption} pb-2`}>&darr; Interactive chart: Hover for more info. Toggle to switch from noon to 6 p.m. shade.</div>
            <FlourishChart storyId="2853425" />
            <div className={staticText}>
              Trees and shade structures in parks and playgrounds create, on average,{" "}
              <span className={boldText}>7 times more shade</span> than buildings. Trees also provide evapotranspirative 
              cooling, absorb pollutants and provide mental health benefits, among other advantages.
              <br />
              <br />
              Shade cover within parks can also be <span className={boldText}>inconsistent</span>. Phoenix's new 
              recommendations call for 100% shade over play structures and, ideally, 75% for pools, play zones and 
              picnic areas.
            </div>
            <div className="flex flex-row max-w-[90%] xl:max-w-[50%] gap-4">
              <div className="w-1/2">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full"
                >
                  <source src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/Cactus_Park.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="w-1/2">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full"
                >
                  <source src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/Eastlake_Park.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className={staticText}>
              In <span className={boldText}>Cactus Park</span>, the play areas and parking lot barely meet or 
              fall below minimum shade levels at noon, despite the park meeting overall recommendations. In 
              contrast, <span className={boldText}>Eastlake Park</span> falls short of the overall "optimal" 
              shade level, but its play and parking areas come closer to meeting recommendations due to the 
              placement of trees and shade structures.
            </div>
            <img
              src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/phx_splash_park_joelclark_af.jpg`}
              className="h-auto xl:h-[calc(100vh-20rem)] object-contain"
            />
            <div className={imageCaption}>
              Splash park and playground protected by shade sails in Phoenix AZ.
            </div>
            <div className={staticText}>
              <span className={boldText}>Shading high-use areas is critical</span>. Direct sunlight can make 
              play equipment and surfaces dangerously hot, and physical activity can lead to overheating.
              <br />
              <br />
              Shade data makes it easier to plan natural and engineered shade{" "}
              <span className={boldText}>where people gather and where activity is most intense</span>.
            </div>
            <div className="h-20" />
          </article>
        </section>

        <section className="relative w-full m-auto" id="action">
          <BackgroundImage
            image={currentStepImage}
            style="cover"
          />
          <article className="relative flex-1 items-center justify-center">
            <Scrollama offset={0.5} onStepEnter={onStepEnter}>
              <Step data="/phx_downtown.jpg">
                <div className={stepStart}>
                  <div className={`${mainText} relative z-20`}>
                    The Shade Phoenix Plan provides the roadmap. Shade data gives you the tools. Here's how 
                    you can <span className={boldText}>take action to cool your community</span>.
                  </div>                    
                  <div className="h-20" />
                </div>
              </Step>
              <Step data={null}>
                <div id="map" className={stepEnd}>
                  <div className={`${mainText} relative z-20`}>
                    Explore parks in this <span className={boldText}>interactive shade map</span>. See whether 
                    your local park meets shade recommendations — and how shade changes from midday to evening hours.
                  </div>
                </div>
              </Step>
              <Step data={null}>
                <div className={stepTransition}>
                  <div className="h-screen bg-black -mb-[100vh]" />
                </div>
              </Step>
            </Scrollama>
          </article>
        </section>

        <section className="relative w-full m-auto" id="action2">
          <article className="relative flex flex-col items-center">
              <div className="max-w-5xl mx-auto py-16 px-6 flex flex-col md:flex-row items-center gap-8 mt-28">
                <div className="md:w-1/2">
                  <img
                    src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/TESA_Shade_iPad.png`}
                    alt="TESA iPad interface"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 text-white p-6 text-sm md:text-base">
                  Pinpoint shade gaps for the Greater Phoenix Area using the{" "}
                  <span className={boldText}>Maricopa County Tree Equity Score Analyzer</span>:
                  <br />
                  <br />
                  <ol className="list-decimal pl-3 md:pl-5">
                    <li className="pb-8">
                      <span className={boldText}>Visit</span>{" "}
                      <BasicLink
                        url="https://www.treeequityscore.org/analyzer/maricopa/map"
                        text="Tree Equity Score Analyzer"
                      />.
                      <ul>
                        <li className="list-disc ml-5">Log in or create a free account.</li>
                      </ul>
                    </li>
                  <li className="pb-8">
                    <span className={boldText}>Search</span> for your park, other point of interest or address.
                    <ul>
                      <li className="list-disc ml-5">
                        Zoom in until you see parcel and right-of-way segments.
                      </li>
                      <li className="list-disc ml-5">
                        Open the Layers list to toggle shade cover estimates at three times of day.
                      </li>
                    </ul>
                  </li>
                  <li className="pb-8">
                    <span className={boldText}>Visualize</span> opportunities for improvement.
                    <ul>
                      <li className="list-disc ml-5">
                        Identify hotspots where trees or engineered shade structures could make the biggest impact.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
            <div className="h-20" />
          </article>
        </section>

        <section className="relative w-full m-auto" id="next">
          <BackgroundImage
            image={currentStepImage}
            style="cover"
          />
          <article className="relative flex-1 items-center justify-center">
            <Scrollama offset={0.5} onStepEnter={onStepEnter}>
              <Step data="/phx_fountain_park_playground.jpg">
                <div className={stepStart}>
                  <div className="md:text-xl text-sm bg-[#171717]/80 text-white p-4 md:p-6 w-[90%] md:max-w-lg sm:max-w-sm max-w-xs mx-auto text-center flex-1 z-30">
                    Creating a cooler, safer and more equitable Phoenix requires <span className={boldText}>action</span>{" "}
                    and <span className={boldText}>collaboration</span> across all sectors.
                    <br />
                    <hr className="border-white my-4" />
                    <ul className="list-disc ml-10 md:text-lg text-sm text-left">
                      <li className="py-1">
                        Use the data to <span className={boldText}>prioritize shade investments</span> where they're needed most.
                      </li>
                      <li className="pb-1">
                        Leverage these tools to <span className={boldText}>design shade solutions</span> that keep public spaces 
                        functional year round.
                      </li>
                      <li className="pb-1">
                        <span className={boldText}>Spread the word</span> about the Shade Phoenix Plan and discover how shade can 
                        transform your parks and neighborhoods.
                      </li>
                      <li className="pb-1">
                        <span className={boldText}>Amplify</span> communications around extreme heat risk and preparedness using 
                        this helpful guide from UCLA.
                      </li>
                    </ul>
                  </div>
                </div>
              </Step>
              <Step data="/phx_central_ave.jpg">
                <div className={stepEnd}>
                  <div className={mainText}>
                    Phoenix is setting the standard for cities across the globe facing the extreme heat crisis.{" "}
                    <span className={boldText}>Let's get to work — and stay cool</span>.
                  </div>
                </div>
              </Step>
              <Step data="/phx_central_ave.jpg">
                <div className={stepTransition}>
                  <div className="h-[50vh]" />
                </div>
              </Step>
            </Scrollama>
          </article>
        </section>
      </main>
    </>
  )
}

export default StoryContent