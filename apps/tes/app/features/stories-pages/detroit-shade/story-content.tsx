import { Scrollama, Step } from "react-scrollama"
import { boldText } from "./detroit-shade-constants"
import { mainText, staticText, superText, imageCaption, stepStart, stepMain, stepMap, stepEnd, stepTransition } from "../shared/constants"
import { StoryContentProps } from "../shared/types"
import BackgroundImage from "../shared/background-image"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import BasicLink from "../shared/basic-link"
import FlourishChart from "../shared/flourish-chart"
import BulletList from "./bullet-list"

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
          <article className="relative flex-1 items-center justify-center" id="why">
            <Scrollama offset={0.5} onStepEnter={onStepEnter}>
              <Step data="/det_streetart_flickr_brook_ward.jpg">
                <div className={stepStart}>                    
                  <div className={mainText}>
                    Detroit may be known for its cold winters, but <span className={boldText}>summer heat</span>{" "} 
                    can pose a deadlier threat.
                    <br />
                    <br />
                    Heat is now the <span className={boldText}>leading cause of weather-related deaths</span>{" "}
                    in the U.S., claiming an estimated 12,000 lives annually.<span className={superText}>1</span> In Detroit, the number of days above 
                    90 degrees is likely to increase from 7.7 days per year (1991-2020) to as many as 30 days per 
                    year by midcentury.<span className={superText}>2</span>
                  </div>
                </div>
              </Step>
              <Step data="/det_streetart_flickr_wiredforlego_3.jpg">
                <div className={stepMain}>
                  <div className={mainText}>
                    In Detroit, the risks are amplified. <span className={boldText}>Fewer than 60% of 
                    households have air conditioning</span>, and cooling center capacity is limited.
                    <br />
                    <br />
                    A 2023 study estimates that a <span className={boldText}>5-day</span>, 95°F heat wave 
                    could result in over <span className={boldText}>220 deaths</span> in Detroit if the power 
                    fails — or 100 deaths even with the grid intact. In fact, Detroit's mortality rate is much 
                    higher than cities with widespread AC.<span className={superText}>3</span> With frequent 
                    power grid failures and high utility costs, residents face a heightened risk.
                  </div>
                </div>
              </Step>
              <Step data="/det_busstop_stpaulmn_flickr_sharon_mollerus.jpg">
                <div className={stepMain}>
                  <div className={mainText}>
                    Extreme heat hits hardest for children, seniors, those with health conditions or limited 
                    resources — but life doesn't pause for a heat wave. People still need to work, attend 
                    appointments and run errands.
                    <br />
                    <br />
                    <span className={boldText}>Detroit's 85,000 daily transit riders are particularly at risk</span>{" "}
                    — most transit stops lack shade, leaving riders exposed to direct sun and hot sidewalks.
                  </div>
                </div>
              </Step>
              <Step data="/det_bus_stop_2.jpg">
                <div className={stepEnd}>
                  <div className={mainText}>
                    That's why <span className={boldText}>shade is essential</span>, not optional. Shade from 
                    trees and structures can make heat burden — the total heat we experience from the air, 
                    humidity, radiation and more — <span className={boldText}>feel up to 50% cooler</span>
                    <span className={superText}>4</span> and ease strain on energy grids — a necessity as cities 
                    face rising heat.
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
              <Step data={null}>
                <div className={stepTransition}>
                  <div className="h-screen bg-black -mb-[100vh]" />
                </div>
              </Step>
            </Scrollama>
          </article>
        </section>
        <section className="relative w-full m-auto" id="explore">
          <article className="relative flex flex-col items-center">
            <div className={staticText}>
              To help Detroit tackle this issue, <span className={boldText}>American Forests</span>{" "} 
              and <span className={boldText}>UCLA's Luskin Center for Innovation</span> partnered to create 
              comprehensive shade data for the city, now available through the{" "}
              <span className={boldText}>Detroit Tree Equity Score Analyzer</span>.
              <br />
              <br />
              Using LIDAR and Microsoft Building Footprint data, we can{" "}
              <span className={boldText}>model how sunlight interacts with trees and the built environment</span>{" "}
              on the longest day of the year — June 21 — at noon, 3 p.m. and 6 p.m.
            </div>
            <img
              src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/shade_animation.gif`}
              className="h-auto xl:h-[calc(100vh-20rem)] object-contain"
            />
            <div className={imageCaption}>
              UCLA Luskin Center's raw shade data at noon, 3 p.m. and 6 p.m.
            </div>
            <div className={staticText}>
              We can use the data to analyze shade at Detroit's bus stops. The data reveals 
              a stark reality: <span className={boldText}>shade is scarce at most public transit stops</span>.
            </div>
            <img
              src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/det_bus_stop_3.jpg`}
              className="h-auto xl:h-[calc(100vh-20rem)] object-contain"
            />
            <div className={imageCaption}>
              An unsheltered bus stop in Detroit. Photo: Joel Clark / American Forests.
            </div>
            <div className={staticText}>
              Of the 5,098 bus stops in Detroit, only <span className={boldText}>232</span> (&lt;5%) have 
              shelters. <span className={boldText}>Nearly 90% of all stops have poor shade</span> with a 
              maximum of 0-25% coverage when the sun is lowest, and even less during midday hours.
              <br />
              <br />
              And while bus shelters do offer protection from rain, wind and snow,{" "}
              <span className={boldText}>shelters don't mean a stop has significantly more shade.</span>
            </div>
            <div className={`${imageCaption} pb-2`}>&darr; Interactive chart: Hover for more info. Toggle to switch from noon to 6 p.m. shade.</div>
            <FlourishChart storyId="21255671" width="w-1/2" />
            <div className={staticText}>
              Vegetation (primarily trees) and built features provide more shade to bus stops than shelters. 
              And <span className={boldText}>trees provide most of the shade</span>, especially when the sun 
              is highest.
              <br />
              <br />
              Trees also offer more than shade — they clean the air, boost mental health, reduce noise and cool 
              the surroundings by evaporating water from their leaves. Research also shows that{" "}
              <span className={boldText}>trees make public transit more appealing and make wait times feel 
              shorter</span>.<span className={superText}>5</span>
            </div>
            <div className={`${imageCaption} pb-2`}>&darr; Interactive chart: Hover for more info. Toggle to switch between noon, 3 p.m. and 6 p.m. shade.</div>
            <FlourishChart storyId="20936390" width="w-1/4"/>
            <div className={staticText}>
            Compare these two bus stops below. <span className={boldText}>The stop on the left lacks direct shade</span> but a nearby building offers a shady 
            place to wait in the morning hours.{" "} <span className={boldText}>The stop on the right benefits from overhanging trees</span> that provide shade 
            throughout the day.
            </div>
            <div className="flex flex-row max-w-[50%] gap-4 pt-12">
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/det_mack.jpg`}
                className="w-1/2"
              />
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/det_lambert.jpg`}
                className="w-1/2"
              />
            </div>
            <div className={staticText}>
              Shade data can inform where trees and engineered shade can <span className={boldText}>improve 
              walkability and make busy streets safer in the heat.</span>
            </div>
          </article>
          
        </section>
        
        <section className="relative w-full m-auto" id="closing-gap">
          <BackgroundImage
            image={currentStepImage}
            style="cover"
          />
          <article className="relative flex-1 items-center justify-center">
            <Scrollama offset={0.5} onStepEnter={onStepEnter}>
              <Step data={null}>
              <div id="map" className={stepMap}>
                <div className={`${mainText} relative z-20`}>
                <span className={boldText}>Now you can explore the data yourself.</span> Does your bus stop have 
                enough shade? 
                  <br/>
                  <br/>
                  Drag the slider for different time stamps. <span className={boldText}>Double click to zoom in to see bus stops.</span>{" "}
                  Hover to get information about shade coverage.
                  </div>
              </div>
              </Step>
              <Step data="/det_streettrees_flickr_kubia.jpg">
                <div className={stepMain}>
                  <div className={`${mainText} relative z-20`}>
                    Bus shelters don't add much shade, but trees and engineered shade can extend shade to keep 
                    riders cool. One study finds that <span className={boldText}>increasing tree canopy over 
                    roadways to 50% could reduce heat-related deaths by 19%</span> in Detroit.
                    <span className={superText}>3</span>
                    <br />
                    <br />
                    Roadway trees also <span className={boldText}>calm traffic, reduce vehicle speeds</span>
                    <span className={superText}>6</span> and help <span className={boldText}>absorb traffic 
                    pollutants</span> that are made worse by stagnant air during a heat wave.
                  </div>
                </div>
              </Step>
              <Step data="/det_planting.jpg">
                <div className={stepEnd}>
                  <div className={`${mainText} relative z-20`}>
                    Detroit is already taking steps to add more shade. Organizations like{" "}
                    <span className={boldText}>The Greening of Detroit</span> and{" "}
                    <span className={boldText}>the City of Detroit</span> are spearheading initiatives to 
                    plant the right kinds of trees along busy transit routes. These trees will grow to provide the shade that riders 
                    of a warming future will desperately need. Adding trees near homes and yards can also 
                    help reduce air conditioning bills.
                    <br />
                    <br />
                    The challenge: <span className={boldText}>where can trees and shade structures make the 
                    most impact?</span>
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

        <section className="relative w-full m-auto" id="action">
          <article className="relative flex flex-col items-center">
            <div className={staticText}>
              You can use the <span className={boldText}>Detroit Tree Equity Score Analyzer</span>{" "}
              to identify opportunities to improve cooling infrastructure. This tool can be 
              used to plan shade improvement projects for many types of{" "}
              <span className={boldText}>priority sites</span>, including parks, playgrounds, 
              streetscapes, greenways and schoolyards.
            </div>
            <div className="max-w-5xl mx-auto pb-24 px-6 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/TESA_Shade_iPad.png`}
                  alt="TESA iPad interface"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="md:w-1/2 text-white p-6 text-sm md:text-lg">
                <ol className="list-decimal pl-3 md:pl-5">
                  <li className="pb-8">
                    <span className={boldText}>Visit</span>{" "}
                    <BasicLink
                      url="https://www.treeequityscore.org/analyzer/detroit/map"
                      text="Tree Equity Score Analyzer"
                    />.
                    <ul>
                      <li className="list-disc ml-5">Log in or create a free account.</li>
                    </ul>
                  </li>
                  <li className="pb-8">
                    <span className={boldText}>Search</span> for an address or point of interest.
                    <ul>
                      <li className="list-disc ml-5">
                        Zoom in to the property-level.
                      </li>
                      <li className="list-disc ml-5">
                        Open the Layers list to view estimates of shade cover from trees and built features.
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
          </article>
        </section>

        <section className="relative w-full m-auto" id="forward">
          <BackgroundImage
            image={currentStepImage}
            style="cover"
          />
          <article className="relative flex-1 items-center justify-center">
            <Scrollama offset={0.5} onStepEnter={onStepEnter}>
              <Step data="/det_shade_people.jpg">
                <div className={stepStart}>
                  <div className={mainText}>
                    When it comes to extreme heat, shade isn't just about comfort — it's about survival. Using{ " "}
                    <span className={boldText}>natural and engineered shade infrastructure</span>, the city can transform 
                    hot spots into cool spaces that improve quality of life and make the city safer and more walkable.
                  </div>
                </div>
              </Step>
              <Step data="/det_streetart_flickr_terence_faircloth.jpg">
                <div className={stepEnd}>
                  <div className="text-center md:text-xl text-sm bg-[#171717]/80 text-white px-8 py-6 md:px-12 md:py-10 w-[90%] md:max-w-3xl sm:max-w-2xl max-w-xl mx-auto flex-1 z-30">
                    <span className={boldText}>Heat doesn't wait, and neither should we</span> — making Detroit 
                    cooler and healthier starts here.
                    <hr className="border-white my-4" />
                    <ul className="list-none md:text-base text-left space-y">
                      <BulletList 
                        text="Start exploring shade solutions today with the"
                        link={{
                          url: "http://www.treeequityscore.org/analyzer/detroit/map",
                          text: "Detroit Tree Equity Score Analyzer"
                        }}
                      />
                      <BulletList
                        text="Request a new street tree from the City of Detroit:"
                        link={{
                          url: "https://app.smartsheet.com/b/form/396efe007f9549b7af1d66b0fe992a62",
                          text: "Street Tree Request Form"
                        }}
                      />
                      <BulletList
                        text="Apply for a Community Tree Planting with The Greening of Detroit:"
                        link={{
                          url: "https://www.greeningofdetroit.com/community-tree-planting",
                          text: "Community Tree Planting Application"
                        }}
                      />
                      <BulletList
                        text='Plant and care for trees in your yard using "right tree, right place" 
                          guidelines. The Greening of Detroit provides recommendations for care, 
                          tree selection and placement to help ensure your trees thrive:'
                        link={{
                          url: "https://www.greeningofdetroit.com/caring-for-trees",
                          text: "Caring for Trees"
                        }}
                      />
                      <BulletList
                        text="Find transit resources and learn more about transit advocacy with"
                        link={{
                          url: "https://www.detroittransit.org/",
                          text: "Transportation Riders United"
                        }}
                      />
                      <BulletList
                        text="Prepare for Detroit's extreme heat with the city's"
                        link={{
                          url: "https://detroitmi.gov/sites/detroitmi.localhost/files/2024-07/Extreme%20Heat.pdf",
                          text: "Extreme Heat Guide"
                        }}
                      />
                      <BulletList
                        text="Communicate effectively about heat risk and preparedness with the help of 
                          UCLA Luskin Center's"
                        link={{
                          url: "https://innovation.luskin.ucla.edu/wp-content/uploads/2024/03/Communicating-Heat-Risk.pdf",
                          text: "Communicating Heat Risk guide"
                        }}
                      />
                    </ul>
                  </div>
                </div>
              </Step>
              <Step data="/det_streetart_flickr_terence_faircloth.jpg">
                <div className={stepTransition}>
                  <div className="h-[25vh]" />
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