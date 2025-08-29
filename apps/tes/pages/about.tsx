import { BlitzPage } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
import dynamic from 'next/dynamic'  
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const About: BlitzPage = () => {
  return (
    <div className="min-h-screen">
      <div
        style={{
          backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/Parcel_Tree_Banner_DarkerGr_gdt.jpg)`,
          backgroundSize: "cover",
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
              About Tree Equity Score
            </p>
            <p className="text-2xl md:leading-snug font-light text-white">
              We believe data belongs to everyone.
            </p>
          </div>
        </div>
      </div>

      <section
        className="bg-white"
        style={{
          backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/Parcel_Tree_Outlines_noROW_lite_gradient.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          imageRendering: "crisp-edges",
        }}
      >
        <div className="h-20"></div>
        <div className="text-brand-green-dark text-[23px] font-medium uppercase tracking-wide leading-relaxed 2xl:w-2/5 xl:w-3/5 w-4/5 text-center m-auto p-12 border-2 border-brand-green-dark">
          OUR GOAL IS THAT URBAN COMMUNITIES HAVE THE RESOURCES TO GET HEALTHY TREES TO THOSE WHO
          NEED THEM THE MOST.
        </div>
        <div className="h-28"></div>
        <div className="text-center">
          <p className="uppercase font-bold pb-2 tracking-wide text-brand-green-dark">
            Tree Equity Score
          </p>
          <p className="text-2xl font-bold uppercase pb-10">By the numbers</p>
        </div>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 2xl:w-2/3 xl:w-3/4 lg:w-1/2 w-2/3 m-auto">
          <div className="w-52 mx-auto">
            <img className="inline h-10 mb-8" src="/icons/neighborhood-ln.png" />
            <p className="inline text-5xl text-brand-green-dark leading-loose"> 200K</p>
            <p className="text-lg leading-snug -mt-4 mb-4">
              Tree Equity Scores are available for nearly 200,000 urban neighborhoods in the United
              States.
            </p>
          </div>
          <div className="w-52 mx-auto">
            <img className="inline h-10 mb-8" src="/icons/population-ln.png" />
            <p className="inline text-5xl text-brand-green-dark leading-loose"> 260M+</p>
            <p className="text-lg leading-snug -mt-4 mb-4">
              More than 260 million people live in the neighborhoods covered by Tree Equity Score.
            </p>
          </div>
          <div className="w-52 mx-auto">
            <img className="inline h-10 mb-8" src="/icons/plant-trees-ln.png" />
            <p className="inline text-5xl text-brand-green-dark leading-loose"> 500M</p>
            <p className="text-lg leading-snug -mt-4 mb-4">
              We need over 500 million more new trees to achieve Tree Equity in all areas with
              inadequate tree cover.
            </p>
          </div>
          <div className="w-52 mx-auto">
            <img className="inline h-10 mb-8" src="/icons/es-dollars-ln.png" />
            <p className="inline text-5xl text-brand-green-dark leading-loose"> 4.5B</p>
            <p className="text-lg leading-snug -mt-4 mb-4">
              These trees would provide ecosystem service benefits valued at nearly $4.5 billion each
              year.
            </p>
          </div>
        </div>
        <div className="md:h-40 h-20"></div>
      </section>

      <section className="bg-white">
        <div className="grid md:grid-cols-2 grid-cols-1 2xl:w-2/3 xl:w-4/5 w-11/12 m-auto">
          <div
            style={{
              backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/Parcel_Tree_Banner_DarkerGr.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
              backgroundRepeat: "no-repeat",
              imageRendering: "crisp-edges",
            }}
            className="bg-brand-green-dark text-center font-light md:text-2xl text-xl text-white leading-tight 2xl:p-16 p-10 mt-10 lg:mx-10 mx-5 rounded-xl"
          >
            Planting trees in underserved neighborhoods addresses basic human rights to health,
            safety and welfare. The benefits to mitigate extreme heat, air pollution, public health
            and environmental hazards are well documented.
          </div>
          <div className="flex flex-col justify-center text-gray-800 md:pt-0 pt-20 lg:px-0 px-10">
            <p className="md:text-3xl text-2xl font-bold pb-5">Join the movement</p>
            <p className="text-lg pb-6">
              American Forests developed Tree Equity Score to address damaging environmental
              inequities in tree distribution common to cities and towns all across the U.S. Tree
              Equity Score establishes an equity-first standard to guide investment in critical
              urban tree infrastructure, starting with neighborhoods with the greatest need.
            </p>
            <p className="text-lg">
              We created Tree Equity Score so that every person has the information they need to
              advocate for the health and resilience of their community.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-b from-white to-[#ECF5F2]">
          <div className="lg:h-44 h-36"></div>
          <hr className="border-2 border-brand-green-dark w-1/2 m-auto"></hr>
          <p className="pt-8 text-center lg:w-1/2 w-11/12 m-auto md:text-xl text-lg">
            American Forests partners with corporations, foundations, government agencies,
            community-based organizations, community leaders, nonprofit organizations and academic
            institutions at the local, state and federal levels to advance Tree Equity. Tree Equity
            Score was made possible by the generous financial support from partners.
          </p>
          <div className="h-20"></div>
        </div>
        <div className="bg-[#ECF5F2]">
          <div className="xl:w-2/3 w-4/5 m-auto">
            <p className="text-2xl font-bold uppercase pb-10">Collaborators</p>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-10">
              <img className="aspect-square" src="/itree.jpg" />
              <img className="aspect-square" src="/google.jpg" />
              <img className="aspect-square" src="/usfs.jpg" />
              <img className="aspect-square" src="/uvm.jpg" />
              <img className="aspect-square" src="/icp.jpg" />
            </div>
          </div>
          <div className="h-20"></div>

          <div className="xl:w-2/3 w-4/5 m-auto">
            <p className="text-2xl font-bold uppercase pb-10">Contributors</p>
            <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 sm:gap-10 gap-5">
              <img className="aspect-square" src="/ddcf.jpg" />
              <img className="aspect-square" src="/salesforce.jpg" />
              <img className="aspect-square" src="/microsoft.jpg" />
              <img className="aspect-square" src="/earthdefine.jpg" />
              <img className="aspect-square" src="/google.org.jpg" />
              <img className="aspect-square" src="/aws.jpg" />
              <img className="aspect-square" src="/jpb.jpg" />
              <img className="aspect-square" src="/weyerhaeuser.jpg" />
              <img className="aspect-square" src="/tazo.jpg" />
              <img className="aspect-square" src="/BOA.jpg" />
              <img className="aspect-square" src="/nfwf.jpg" />
              <img className="aspect-square" src="/deloitte.jpg" />
              <img className="aspect-square" src="/amex.jpg" />
              <img className="aspect-square" src="/mcgovern.jpg" />
              <img className="aspect-square" src="/zendesk.jpg" />
              <img className="aspect-square" src="/sunday.jpg" />
              <img className="aspect-square" src="/erb.jpg" />
              <img className="aspect-square" src="/dte.jpg" />
              <img className="aspect-square" src="/seedfund.jpg" />
              <img className="aspect-square" src="/summit.jpg" />
            </div>
          </div>
          <div className="h-40"></div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

About.getLayout = (page) => <Layout title={"About"}>{page}</Layout>
export default About
