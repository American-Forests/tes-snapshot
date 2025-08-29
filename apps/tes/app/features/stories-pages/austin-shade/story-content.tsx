import { Scrollama, Step } from "react-scrollama"
import { boldText } from "./austin-shade-constants"
import { mainText, staticText, superText, imageCaption, stepStart, stepMain, stepMap, stepEnd, stepTransition } from "../shared/constants"
import { StoryContentProps } from "../shared/types"
import BackgroundImage from "../shared/background-image"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import MakeADifference from "./make-a-difference"
import BasicLink from "../shared/basic-link"
import { Pencil1Icon } from "@radix-ui/react-icons"
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
            <article className="relative flex-1 items-center justify-center" id="why">
              <Scrollama offset={0.5} onStepEnter={onStepEnter}>
               <Step data="/aus_juneteenth.jpg">
                  <div className={stepStart}>                    
                    <div className={mainText}>
                      <span className={boldText}>
                        Extreme heat affects hundreds of millions of Americans every year
                      </span>{" "}
                      — and Austin is no exception. Did you know Austin saw{" "}
                      <span className={boldText}>80 days above 100°F</span> in 2023?
                      <span className={superText}>1</span>
                      <br />
                      <br />
                      Extreme heat hits hardest for{" "}
                      <span className={boldText}>young people, seniors</span> and those with
                      <span className={boldText}> health conditions or limited resources</span>.
                    </div>
                  </div>
                </Step>
                <Step data="/aus_kramerlane.jpg">
                  <div className={stepMain}>
                    <div className={mainText}>
                      And you don't need a record-breaking heat wave for your daily routine at
                      school to feel uncomfortably hot.
                      <br />
                      <br />
                      That's where shade from trees and structures comes in. <span className={boldText}>Shade makes cities cooler and more livable.</span>
                    </div>
                  </div>
                </Step>
                <Step data="/aus_redriverst.jpg">
                  <div className={stepMain}>
                    <div className={mainText}>
                      Shade can reduce heat burden — the total heat we experience from the air,
                      humidity, radiation, and more —{" "}
                      <span className={boldText}>by up to 50%</span>.
                      <span className={superText}>2</span>
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
              </Scrollama>
            </article>
            <article className="relative flex-1 items-center justify-center">
              <Scrollama offset={0.5} onStepEnter={onStepEnter}>
                <Step data="/aus_congressave.jpg">
                  <div className={stepEnd}>
                    <div className={mainText}>
                      To understand how shade affects students across Austin, we analyzed shade on{" "}
                      every sidewalk in the city.
                      <br />
                      <br />
                      <span className={boldText}>So how do we measure shade?</span>
                    </div>
                  </div>
                </Step>
                <Step data={null}>
                  <div  className={stepTransition}>
                    <div className="h-screen bg-black -mb-[40vh]" />
                  </div>
                  </Step>
              </Scrollama>
            </article>
          </section>
          <section className="relative w-full m-auto" id="measure">
            <BackgroundImage
              image={currentStepImage}
              style="contain"
            />
            <article className="relative flex-1 items-center justify-center">
              <Scrollama offset={.66} onStepEnter={onStepEnter}>
                <Step data="/aus_height.png">
                  <div className={stepMain}>
                    <div className={mainText}>
                        The key to understanding shade is <span className={boldText}>height</span>.
                        The taller the tree or structure, the more shade it casts.
                      </div>
                  </div>
                </Step>
                  <Step data="/aus_lidar.png">
                    <div className={stepMain}>
                      <div className={mainText}>
                        To measure height, we use <span className={boldText}>LIDAR</span>, a remote
                        sensing technology. It works by bouncing lasers off surfaces like the tops of
                        trees or buildings to capture their 3D shape. LIDAR can be deployed from
                        satellites, drones, or even airplanes!
                      </div>
                    </div>
                  </Step>
                  <Step data="/aus_built_veg.png">
                    <div className={stepMain}>
                      <div className={mainText}>
                        Using LIDAR surface heights, we mapped everything above the ground. Microsoft 
                        Building Footprints helped us identify which features were 
                        <span className={boldText}> buildings</span>. Most remaining features tall 
                        enough to provide shade (&gt;1.3 meters) are <span className={boldText}>trees</span>, 
                        but a small fraction are <span className={boldText}>shade structures</span> that, 
                        like trees, a person can shelter under.
                      </div>
                    </div>
                  </Step>
                  <Step data="/shade_animation.gif">
                    <div className={stepEnd}>
                      <div className={mainText}>
                      <span className={boldText}>Shade changes over the course of a day</span> as the sun rises and sets. We measure
                        shade on June 21, the longest day of the year, at
                        <span className={boldText}> 7 a.m., 9 a.m., noon, 3 p.m., 4 p.m., 6 p.m.</span>.
                      </div>
                    </div>
                  </Step>
                  <Step data={null}>
                  <div  className={stepTransition}>
                    <div className="h-screen bg-black -mb-[50vh]" />
                  </div>
                  </Step>
              </Scrollama>
            </article>
          </section>
          <section className="relative w-full m-auto" id="how-much">
            <article className="relative flex flex-col items-center">
              <div className={staticText}>
                So, what can all this data tell us? In Austin, average shade{" "}
                ranges from 10% to nearly 35% over the
                course of the day.
                <br />
                <br />
                <span className={boldText}>
                  Trees provide 300 times more shade than buildings
                </span>{" "}
                at midday and over <span className={boldText}>three times as much</span> when the
                sun is lowest. Why? There are simply more trees offering shade in Austin, and
                you can shelter directly under a tree for
                instant cooling!
              </div>
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/aus_redriverst_2.jpg`}
                className="h-auto xl:h-[calc(100vh-20rem)] object-contain"
              />
              <p className={imageCaption}>45th Street and Red River Street, Austin TX.</p>
              <div className={staticText}>
                Throughout the day, Austin sidewalks get on average{" "}
                30-60% shade. <span className={boldText}>That means you're in the sun
                at least half the time</span> — and we all know those sunny
                stretches can feel extra hot!
              </div>
              <FlourishChart storyId="2822737" width="w-1/2"/>
              <div className={staticText}>
                Where does sidewalk shade come from? We found that throughout the day,{" "}
                <span className={boldText}>most sidewalk shade comes from trees</span>.
                Buildings only contribute a little shade early in the morning and late in the
                evening.
                <br />
                <br />
                Looking at this chart, how much shade is there, on average,{" "}
                <span className={boldText}>when you commute to school?</span>
              </div>
              
              <div className="h-20" />
            </article>
          </section>
          <section className="relative w-full m-auto" id="maps">
          <BackgroundImage
              image={currentStepImage}
              style="cover"
            />
            <article className="relative flex-1 items-center justify-center">
              <Scrollama offset={0.5} onStepEnter={onStepEnter}>
                <Step data="/aus_expositionblvd.jpg">
                  <div id="how-much2" className={stepStart}>
                    <div className={`${mainText} relative z-20`}>
                      The amount of shade you get depends on where you are.{" "}
                      <span className={boldText}>Some school zones are shadier than others</span> —
                      does that feel fair?
                    </div>                    
                    <div className="h-20" />
                  </div>
                </Step>
                <Step data={null}>
                  <div id="map" className={stepMap}>
                    <div className={`${mainText} relative z-20`}>
                      For example, <span className={boldText}>the west side of Austin has
                      more shade than the east side</span> — even at noon, the hottest time of day — because it has more trees.
                      <br />
                      <br />
                      <span className={boldText}>Toggle the map for different times of day</span>.
                      Hover for more information about a neighborhood. How do the neighborhoods near
                      your school stack up?
                    </div>
                  </div>
                </Step>
                <Step data={null}>
                  <div id="map2" className={stepMap}>
                    <div className={`${mainText} relative z-20`}>
                      <span className={boldText}>Shade cover can be patchy</span> at the street level, even when an area has a lot of overall shade. 
                      <br/>
                      <br/>
                      At{" "}
                      <span className={boldText}>Kealing Middle School</span> in Central East
                      Austin, for example, we mapped two 10-minute walking routes from the same
                      residence.
                    </div>
                  </div>
                </Step>
                <Step data={null}>
                  <div id="map3" className={stepMap}>
                    <div className={`${mainText} relative z-20`}>
                      Route 1 offers very little shade until the last block. On{" "}
                      Route 2, you'll stay cooler if you stick to the shadier side of
                      the road. But even Route 2 has stretches
                      of full sun.
                      <br /> <br />
                      <span className={boldText}>Which route would you pick?</span>
                    </div>
                  </div>
                </Step>
                <Step data={null}>
                  <div id="map4" className={stepEnd}>
                    <div className={`${mainText} relative z-20`}>
                      We mapped shade for every sidewalk in the city so you can{" "}
                      <span className={boldText}>map your active routes</span>.
                      <br />
                      <br />
                      First, locate your school. Then, zoom in and pan to find the shadiest
                      sidewalks on your route.
                    </div>
                  </div>
                </Step>
                <Step data={null}>
                  <div  className={stepTransition}>
                    <div className="h-screen bg-black" />
                  </div>
                  </Step>
              </Scrollama>
            </article>
          </section>
          <section className="relative w-full m-auto" id="difference">
            <article className="relative flex flex-col items-center">
              <div className={staticText}>
                If you don't think your route is shady enough, the good news is we can make
                school routes cooler. One of the best ways to increase shade is to{" "}
                <span className={boldText}>work with local urban foresters to plant and grow trees</span>. 
                <br/>
                <br/>
                Trees not only cast
                shade, but they also cool the air when water evaporates from their leaves. And
                that's not all — research shows that{" "}
                <span className={boldText}>trees are great for our mental health</span>, too!
              </div>
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/aus_expositionblvd2.jpg`}
                className="h-auto xl:h-[calc(100vh-20rem)] object-contain"
              />
              <p className="text-xs text-white pt-1 mb-20">Exposition Boulevard, Austin TX.</p>
              <div className="relative w-full">
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/aus_pattersonpark.jpg`}
                  className="object-cover w-full h-[170vh] md:h-screen"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#171717]/80 text-white p-3 lg:p-6 w-[90%] xl:w-[56%]">
                  <div className="flex items-start text-base lg:text-lg">
                    <Pencil1Icon className="w-[40px] mr-2 mt-1" />
                    <span>
                      Want to help make your school routes safer? Here are several{" "}
                      <span className={boldText}>ideas</span> to get started!
                    </span>
                  </div>
                  <hr className="my-4 pb-2" />
                  <MakeADifference />
                </div>
              </div>
              <div className="max-w-7xl mx-auto py-16 px-6 flex flex-col md:flex-row items-center gap-8 mt-28">
                <div className="md:w-1/2">
                  <img
                    src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/TESA_Shade_iPad.png`}
                    alt="TESA iPad interface"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 text-white p-6 text-sm md:text-base">
                  Now, shade data is available through the{" "}
                  <span className={boldText}>Austin Tree Equity Score Analyzer</span>. Examine
                  shade access across Austin for all types of areas like parks,{" "}
                  <BasicLink
                    url="https://www.austintexas.gov/urbantrails"
                    text="urban trails"
                  />
                  , bus stops, and more.
                  <br />
                  <br />
                  <ol className="list-decimal pl-3 md:pl-5">
                    <li className="pb-8">
                      <span className={boldText}>Visit</span>{" "}
                      <BasicLink
                        url="https://www.treeequityscore.org/analyzer/austin/map"
                        text="Tree Equity Score Analyzer"
                      />
                      .
                      <ul>
                        <li className="list-disc ml-5">Log in or create a free account.</li>
                      </ul>
                    </li>
                    <li className="pb-8">
                      <span className={boldText}>Search</span> for an address or point of
                      interest.
                      <ul>
                        <li className="list-disc ml-5">
                          Zoom in to view property-level shade.
                        </li>
                        <li className="list-disc ml-5">
                          Open the Layers list to view shade estimates and visualize trees and
                          shade on the map.
                        </li>
                      </ul>
                    </li>
                    <li className="pb-8">
                      <span className={boldText}>Visualize</span> and plan potential projects.
                      <ul>
                        <li className="list-disc ml-5">
                          Identify where trees or engineered shade structures could make the
                          biggest impact.
                        </li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
              <div className={staticText}>
                Adding shade where you live doesn't just help you — it helps create{" "}
                <span className={boldText}>healthier, safer and more livable</span>{" "}
                neighborhoods for all your neighbors.
                <br />
                <br />
                So, the next time you take a walk, take a look around. Where do you see shade?
                Where is it missing? What could you do to help?
              </div>
              <img
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/aus_bike2work.jpg`}
                className="h-auto xl:h-[calc(100vh-20rem)] object-contain"
              />
              <p className={imageCaption}>Bike to Work Day, 2022, Austin TX.</p>
            </article>
          </section>
        </main>
      </>
    )
  }

export default StoryContent