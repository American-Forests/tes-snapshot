import Link from "next/link";
import { BlitzPage, Routes } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const Stories: BlitzPage = () => {
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
        <div className="pt-32 pb-20 w-4/5 m-auto">
          <div>
            <p className="xl:text-[46px] lg:text-[40px] text-3xl md:leading-snug font-medium text-white pb-2">
              Tree Equity Stories
            </p>
            <p className="text-2xl md:leading-snug font-light text-white">
              Insights and perspectives on Tree Equity Score.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-[#ECF5F2]">
        <div className="h-10"></div>

        {/* Story - Austin Shade */}
        <div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10 pb-10  border-b-2 border-solid border-gray-200">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.AustinShadeStory()}>
                  <a className="cursor-pointer">
                    <img
                      className="object-cover rounded-full"
                      src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/aus_decal.jpg`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Austin TX - School Routes Aren't the Coolest</p>
                <p className="text-lg pt-2 w-11/12">
                How hot is your route to school? We analyzed shade along school routes in Austin to find out.
                </p>
                <Link legacyBehavior href={Routes.AustinShadeStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story - Detroit Shade */}
        <div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10 pb-10  border-b-2 border-solid border-gray-200">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.DetroitShadeStory()}>
                  <a className="cursor-pointer">
                    <img
                      className="object-cover rounded-full"
                      src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/det_decal.jpg`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Detroit MI - Cooling Detroit's Bus Stops</p>
                <p className="text-lg pt-2 w-11/12">
                Most public transit stops in Detroit are exposed to scorching heat in the summertime. State-of-the-art shade data can 
                guide smart investments that improve walkability and make Detroit a cooler place to live and visit.
                </p>
                <Link legacyBehavior href={Routes.DetroitShadeStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story - Phoenix Shade */}
        <div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10 pb-10  border-b-2 border-solid border-gray-200">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.PhoenixShadeStory()}>
                  <a className="cursor-pointer">
                    <img
                      className="object-cover rounded-full"
                      src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/phx_decal.jpg`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Phoenix AZ - Beating the Heat in Public Parks</p>
                <p className="text-lg pt-2 w-11/12">
                The City of Phoenix is leading the way to cool its neighborhoods and make public spaces safer year round. 
                Learn how cutting-edge shade data is turning plans into action.
                </p>
                <Link legacyBehavior href={Routes.PhoenixShadeStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Story - Next Generation */}
        <div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10 pb-10  border-b-2 border-solid border-gray-200">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.TES2UpdatesStory()}>
                  <a className="cursor-pointer">
                    <img
                      className="object-cover rounded-full"
                      src="/ds-next-gen-story-img.jpg"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Tree Equity Score - The Next Generation</p>
                <p className="text-lg pt-2 w-11/12">
                  The next generation of Tree Equity Score is here. And it's better than ever...
                  Take a tour and find out what's new.
                </p>
                <Link legacyBehavior href={Routes.TES2UpdatesStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story - NTC Story */}
        <div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.NTCStory()}>
                  <a className="cursor-pointer">
                    <img
                      className="object-cover rounded-full"
                      src={`${STATIC_ASSETS_CLOUDFRONT_URL}/ntc_stories_pg.jpg`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Tree Equity Score in Action</p>
                <p className="text-lg pt-2 w-11/12">
                  Newport Tree Conservancy: The non-profit on a mission to bring Tree Equity to
                  Newport, Rhode Island.
                </p>
                <Link legacyBehavior href={Routes.NTCStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story - PNPP Story */}
        <div>
          <div className="h-10 xl:w-3/5 lg:w-4/5 w-11/12 m-auto border-b-2 border-solid border-gray-200"></div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.PNPPStory()}>
                  <a className="cursor-pointer">
                    <img
                      className="object-cover rounded-full"
                      src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pnpp_stories_pg.jpg`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Unlocking Tree Equity Score</p>
                <p className="text-lg pt-2 w-11/12">
                  How a Providence, Rhode Island non-profit is partnering with their community to
                  take Tree Equity to the next level.
                </p>
                <Link legacyBehavior href={Routes.PNPPStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story - Happier and Healthier */}
        <div>
          <div className="h-10 xl:w-3/5 lg:w-4/5 w-11/12 m-auto border-b-2 border-solid border-gray-200"></div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.HappierHealthierStory()}>
                  <a className="cursor-pointer">
                    <img className="object-cover rounded-full" src="/mh-storyimg.png" alt="" />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Happier and Healthier</p>
                <p className="text-lg pt-2 w-11/12">
                  Tree Equity Score data reveals that mental health complaints decline in
                  neighborhoods with more trees.
                </p>
                <Link legacyBehavior href={Routes.HappierHealthierStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story - Urban Heat Equity*/}
        <div>
          <div className="h-10 xl:w-3/5 lg:w-4/5 w-11/12 m-auto border-b-2 border-solid border-gray-200"></div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.UrbanHeatEquityStory()}>
                  <a className="cursor-pointer">
                    <img
                      className="object-cover rounded-full"
                      src="/heateq-cityfountain-sq.png"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Urban Heat Equity</p>
                <p className="text-lg pt-2 w-11/12">
                  Extreme heat disproportionately impacts people of color and low-income communities
                  across the nation.
                </p>
                <Link legacyBehavior href={Routes.UrbanHeatEquityStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ECF5F2]">
        {/* Story - Keeping Cool*/}
        <div>
          <div className="h-10 xl:w-3/5 lg:w-4/5 w-11/12 m-auto border-b-2 border-solid border-gray-200"></div>
          <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto pt-10">
            <div className="grid md:grid-cols-3">
              <div className="md:w-1/2 w-1/2 m-auto">
                {" "}
                <Link legacyBehavior href={Routes.KeepingCoolStory()}>
                  <a className="cursor-pointer">
                    <img className="object-cover rounded-full" src={`${STATIC_ASSETS_CLOUDFRONT_URL}/uheat-minne-heat.jpg`} alt="" />
                  </a>
                </Link>
              </div>
              <div className="md:w-11/12 w-3/4 m-auto md:col-span-2 font-medium xl:text-lg lg:text-base text-base text-gray-700 leading-snug md:pl-5 md:text-left text-center mt-0">
                <p className="xl:text-3xl text-2xl pt-6">Keeping Cool</p>
                <p className="text-lg pt-2 w-11/12">
                  Trees can moderate urban heat in your city. Explore our findings city by city.
                </p>
                <Link legacyBehavior href={Routes.KeepingCoolStory()}>
                  <div className="mt-3 text-sm font-bold text-brand-green-dark uppercase inline-block hover:text-brand-green cursor-pointer">
                    Read it now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Page Bottom */}
        <div className="h-10 xl:w-3/5 lg:w-4/5 w-11/12 m-auto border-b-2 border-solid border-gray-200"></div>
        <div className="h-20"></div>
        <div className="xl:w-3/5 lg:w-4/5 w-11/12 m-auto">
          <div>
            <p className="text-sm text-center text-brand-green-dark pt-5">
              American Forests data shorts are made possible by{" "}
              <img src="/zendesk-horiz-dkgr.png" className="inline h-12" />
            </p>
          </div>
        </div>
        <div className="h-20"></div>
      </section>
      <Footer />
    </div>
  )
}

Stories.getLayout = (page) => <Layout title={"Stories"}>{page}</Layout>
export default Stories
