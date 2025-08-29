import { BlitzPage } from "@blitzjs/next";
import dynamic from 'next/dynamic'
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const Privacy: BlitzPage = () => {
  return (
    <div className="min-h-screen">
      <section
        style={{
          backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/Parcel_Tree_Banner_DkGr.jpg)`,
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
            <p className="xl:text-[46px] lg:text-[40px] text-3xl md:leading-snug font-medium text-white pb-16">
              Privacy Policy
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-[#ECF5F2]">
        <div className="xl:w-1/2 lg:w-4/5 w-11/12 m-auto ">
          <div className="h-10"></div>
          <p className="lg:text-4xl text-2xl text-brand-green-dark pt-5">
            Our commitment to your privacy
          </p>
          <p className="pt-5 lg:text-base text-sm">
            American Forests takes your privacy concerns very seriously and has created this
            comprehensive policy to demonstrate our strong commitment to honoring your privacy
            preferences and protecting any personal information you may share with us.
            <br />
            <br />
            This policy is intended to be used by visitors to TreeEquityScore.org and all subdomains
            of TreeEquityScore.org to understand what information is collected and how it is used to
            determine consumer choice and informed consent. Using recognized best practices for
            information collection and sharing, we protect your personal information and secure your
            data from unauthorized access, use, or disclosure on computer servers in a controlled,
            secure environment.
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">
            The Information We Collect
          </p>
          <p className="pt-5 lg:text-base text-sm">
            American Forests collects and uses personal information voluntarily provided to us
            through our websites, in the mail, by phone or email, and via event registrations,
            advocacy efforts, reply forms, and other channels.
            <br />
            <br />
            When you visit our websites, information about your computer hardware and software is
            automatically collected by American Forests. Portions of our websites use temporary
            cookies to maintain data related to the user during navigation, such as such as map zoom
            levels and map locations within all Tree Equity Score applications. No personal data is
            collected through the use of cookies. Website users will remain anonymous unless they
            choose to enter their personal information, such as when they create a login to access
            the Tree Equity Score Analyzer.
            <br />
            <br />
            American Forests uses Google Analytics to measure visitor interaction with the website.
            This information helps us to continue to improve the user experience with the American
            Forests website and other interactive channels. Google Analytics' Privacy Policy is
            available for review{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              className="text-brand-green-dark hover:text-brand-green"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>
            .
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">
            The Way We Use Personal Information
          </p>
          <p className="pt-5 lg:text-base text-sm">
            American Forests will not sell or rent to third parties any individually identifying
            information, such as names, email addresses, mailing addresses, telephone numbers, or
            any other personal information which you voluntarily provide to us, except in the
            following situations:
            <ul className="list-disc pl-10">
              <li className="pt-2">To provide the services you have requested</li>
              <li className="pt-2">
                To the extent necessary to comply with applicable laws or valid legal processes;
              </li>
              <li className="pt-2">
                To protect American Forests intellectual property and other legal rights;
              </li>
              <li className="pt-2">
                We occasionally have third parties perform services on our behalf, such as data
                processing, marketing, analytics, advocacy and outreach, hosting, billing, social
                media integration, fraud protection, etc. These third parties have access to your
                personal information only as needed to perform their services for American Forests
                and are contractually obligated to maintain the confidentiality and security of the
                personal information.
              </li>
            </ul>
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">
            Managing Your Information
          </p>
          <p className="pt-5 lg:text-base text-sm">
            You can gain access to, update, correct, or have deleted any voluntarily provided
            information at any time. In addition, each specific electronic communication sent from
            American Forests always includes a link to unsubscribe. To have your personal
            information reviewed and edited, please contact{" "}
            <a
              href="mailto:treeequityscore@americanforests.org"
              className="text-brand-green-dark hover:text-brand-green"
            >
              treeequityscore@americanforests.org
            </a>
            , or at our mailing address listed below.
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">
            Our Commitment to Data Security
          </p>
          <p className="pt-5 lg:text-base text-sm">
            We use appropriate technical and organizational measures to protect the personal data
            that we collect and process about you. The measures we use are designed to provide a
            level of security appropriate to the risk of processing your personal data. In
            particular, any personal data provided to American Forests is handled with due care and
            security, and will not be used in ways other than as set forth in this Policy.
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">Children Under Age 18</p>
          <p className="pt-5 lg:text-base text-sm">
            American Forests does not knowingly collect information from children under the age of
            18. For their protection, American Forests asks that those under 18 years of age do not
            submit information to us without the consent of a parent or guardian.
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">Copyright</p>
          <p className="pt-5 lg:text-base text-sm">
            Images, text, software, documentation, electronic text and image files, audio and video
            clips, and other materials on American Forests' website(s), including
            TreeEquityScore.org and all subdomains of TreeEquityScore.org, or in emails,
            newsletters, or in print are the property of American Forests except where otherwise
            indicated and are fully protected by copyright laws and other restrictions. Furthermore,
            copyrights and other proprietary rights in the materials on this site may belong to
            individuals and entities other than American Forests. <br />
            <br />
            American Forests expressly prohibits the copying of any protected or copyrighted
            materials on American Forests' website(s), except for the purposes of fair use as
            defined by copyright law and as described below. This prohibition includes the
            downloading of site content for commercial use or for use on personal websites.
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">Fair Use</p>
          <p className="pt-5 lg:text-base text-sm">
            Fair use of copyrighted material includes the use of protected materials for
            noncommercial educational purposes, such as teaching, scholarship, research, criticism,
            commentary, and news reporting. Users who wish to download or print text and image files
            from American Forests websites' for such uses must request American Forests' express
            permission by contacting Nancy Rew, Chief Marketing Officer via email at 
            nrew@americanforests.org. Users must cite the author and source for this material as
            they would material from any printed work and the citation should include the URL http:
            www.americanforests.org. None of the content may be altered or modified.
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">
            Linking to other websites
          </p>
          <p className="pt-5 lg:text-base text-sm">
            TreeEquityScore.org and subdomains of TreeEquityScore.org may include links to other
            websites that are not operated or maintained by American Forests and are not covered by
            this Policy. The processing of personal data on these third party websites including by
            use of cookies, is subject to these third party's notices and terms and conditions.
            Please review the notices and terms and conditions of each website you visit. <br />
            <br />
            We do not accept any responsibility or liability for the privacy practices of such third
            party websites and your use of such websites is at your own risk.
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">Updates to this Policy</p>
          <p className="pt-5 lg:text-base text-sm">
            We may update this Policy from time to time in response to changing legal, technical or
            business developments. When we update our Policy, we will take appropriate measures to
            inform you, consistent with the significance of the changes we make. We will obtain your
            consent to any material Policy changes if and where this is required by applicable data
            protection laws.
            <br />
            <br />
            You can see when this Policy was last updated by checking the “last updated” date
            displayed at the bottom of this Policy.
          </p>
          <p className="lg:text-2xl text-lg text-brand-green-dark pt-5">How to contact us</p>
          <p className="pt-5 lg:text-base text-sm">
            If you have any questions or concerns concerning this Policy or the way we process your
            personal data, or if you wish to exercise your data privacy rights as described above,
            please send inquiries to:
          </p>
          <p className="pt-2 lg:text-base text-sm">
            Email:{" "}
            <a
              href="mailto:treeequityscore@americanforests.org"
              className="text-brand-green-dark hover:text-brand-green"
            >
              treeequityscore@americanforests.org
            </a>
          </p>
          <p className="pt-2 lg:text-base text-sm">Telephone: 202.737.1944 </p>
          <p className="pt-2 lg:text-base text-sm">Toll-Free Number: 1.800.368.5748</p>
          <p className="pt-2 lg:text-base text-sm">
            Mail: American Forests, 1220 L St, NW, Suite 750, Washington, DC 20005-4079
          </p>
          <p className="pt-16 text-xs italic">Last updated February 4, 2025.</p>
          <div className="h-20"></div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

Privacy.getLayout = (page) => <Layout title={"Privacy"}>{page}</Layout>
export default Privacy
