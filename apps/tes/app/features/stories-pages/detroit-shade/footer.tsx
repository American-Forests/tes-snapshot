import Link from "next/link"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { boldText } from "./detroit-shade-constants"
import { superText } from "../shared/constants"
import BasicLink from "../shared/basic-link"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

const Footer: React.FC = () => {
    return (
        <section className="bg-[#151515] text-white text-center">
            <div className="md:max-w-md sm:max-w-sm max-w-xs m-auto">
            <div className="flex col-2 items-center justify-center pt-12 pb-2">
                    <img
                        src={`${STATIC_ASSETS_CLOUDFRONT_URL}/AF-Logo-Knockout-LtGreen-Horiz.png`}
                        className="w-[114px] mr-5"
                    />
                    <img
                        src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/LCILogo.svg`}
                        className="w-[128px]"
                    />
                </div>
                <div className="text-sm">
                    Brought to you by <BasicLink url="https://www.americanforests.org/" text="American Forests"/> and the{" "}
                    <BasicLink url="https://innovation.luskin.ucla.edu/" text="UCLA Luskin Center for Innovation"/> in
                    partnership with the{" "}
                    <BasicLink url="https://detroitfuturecity.com/" text="Detroit Future City"/>.
                </div>
                <div className="flex justify-center py-6">
                    <DotsHorizontalIcon />
                </div>
                <div className="text-xl">
                    Like this story? Check out how other cities are using shade data and tackling extreme
                    heat in{" "}
                    <Link href="austin-shade">
                        <span className={`${boldText} underline hover:no-underline`}>Austin, TX</span>
                    </Link>{" "}
                    and{" "}
                    <Link href="phoenix-shade">
                        <span className={`${boldText} underline hover:no-underline`}>Phoenix, AZ</span>
                    </Link>
                    .
                </div>
                </div>
                <div className="text-sm md:max-w-xl sm:max-w-lg max-w-md m-auto">
                <div className="flex justify-center py-6">
                    <DotsHorizontalIcon />
                </div>
                <div>
                    Story Credits: Article and design by{" "}
                    <BasicLink
                        url="https://www.americanforests.org/personnel/julia-twichell/"
                        text="Julia Twichell"
                    />{" "}
                    at American Forests. Shade modeling and data analysis by{" "}
                    <BasicLink url="https://innovation.luskin.ucla.edu/isaac-buo/" text="Dr. Isaac Buo" />. 
                    Collaboration, review, and analysis by{" "}
                    <BasicLink
                        url="https://innovation.luskin.ucla.edu/lana-zimmerman/"
                        text="Lana Zimmerman"
                    />{" "}
                    and{" "}
                    <BasicLink
                        url="https://luskin.ucla.edu/person/v-kelly-turner"
                        text="Dr. V. Kelly Turner"
                    />{" "}
                    at UCLA Luskin Center. Computational support by{" "}
                    <BasicLink url="https://shadelab.asu.edu/" text="ASU SHaDE Lab" />. Collaboration and review by Sarah Peterson at Detroit Future 
                    City, and Dan Rieden at City of Detroit.
                    construction by{" "}
                    <BasicLink
                        url="https://www.americanforests.org/personnel/geri-rosenberg/"
                        text="Geri Rosenberg"
                    />{" "}
                    at American Forests. This project was made possible by funding from the Robert Wood Johnson Foundation.
                </div>
                    <div className="flex justify-center py-6">
                        <DotsHorizontalIcon />
                    </div>
                <div>
                For more information about UCLA Luskin Center's shade data, please
                contact Dr. V. Kelly Turner, Associate Professor of Urban Planning and Geography, 
                    at{" "}
                    <BasicLink url="mailto:vkturner@ucla.edu" text="vkturner@ucla.edu" />.
                </div>
                <div className="flex justify-center py-6">
                    <DotsHorizontalIcon />
                </div>
                    <div>
                        Photo credits (in order):{" "}
                        <BasicLink
                            url="https://www.flickr.com/photos/wiredforsound23/32976100898/"
                            text="wiredforlego"
                        />
                        / Flickr;{" "}
                    <BasicLink
                        url="https://www.flickr.com/photos/brookward/48458384412/"
                        text="Brook Ward"
                    />
                    / Flckr;{" "}
                    <BasicLink
                        url="https://www.flickr.com/photos/wiredforsound23/33031699498/"
                        text="wiredforlego"
                    />
                    / Flickr;{" "}
                    <BasicLink
                        url="https://www.flickr.com/photos/clairity/171162186/"
                        text="Sharon Mollerus"
                    />
                    / Flickr; Joel Clark / American Forests; Joel Clark / American Forests; Google 
                    Street View of 3361 Gratiot Ave, Detroit MI (Nov 2023); Google Street View of 
                    9157 Gratiot Ave, Detroit MI (Nov 2023);{" "}
                    <BasicLink
                        url="https://www.flickr.com/photos/kubia/23546268678/"
                        text="kubia"
                    />
                    / Flickr; Bulleit Bourbon/ American Forests; Joel Clark / American Forests;{" "}
                    <BasicLink
                        url="https://www.flickr.com/photos/atelier_tee/53314160425/"
                        text="Terence Faircloth"
                    />
                    / Flickr.
                </div>
                <div className="flex justify-center py-6">
                    <DotsHorizontalIcon />
                </div>
                <div className="text-xs">
                <span className={superText}>1</span> Shindell, D., Zhang, Y., Scott, M., Ru, M., Stark, K., Ebi, K.L. (2020).
                The Effects of Heat Exposure on Human Mortality Throughout the United States. Geohealth, 4(4). DOI:{" "}
                    <BasicLink
                        url="https://doi.org/10.1029/2019GH000234"
                        text="https://doi.org/10.1029/2019GH000234"
                    />.
                    <br />
                    <br /><span className={superText}>2</span> University of Wisconsin-Madison Nelson Institute 
                    Center for Climatic Research. (Last accessed, January 27, 2025). “Great Lakes Regional 
                    Climate Change Maps” GLISA,{" "}
                    <BasicLink
                        url="https://glisa.umich.edu/great-lakes-regional-climate-change-maps/"
                        text="https://glisa.umich.edu/great-lakes-regional-climate-change-maps/"
                    />.
                    <br />
                    <br />
                    <span className={superText}>3</span> Stone Jr, B., Gronlund, C. J., Mallen, E., Hondula, 
                    D., O'Neill, M. S., Rajput, M., ... & Georgescu, M. (2023). How blackouts during heat 
                    waves amplify mortality and morbidity risk. Environmental Science & Technology, 57(22), 
                    8245-8255.
                    <br />
                    <br />
                    <span className={superText}>4</span> Turner, V. K. et al. (2023). “The problem with hot 
                    schoolyards.” UCLA Luskin Center for Innovation,{" "}
                    <BasicLink
                        url="https://innovation.luskin.ucla.edu/publication/the-problem-with-hot-schools/"
                        text="https://innovation.luskin.ucla.edu/publication/the-problem-with-hot-schools/"
                    />.
                    <br />
                    <br />
                    <span className={superText}>5</span> Lagune-Reutler, M., Guthrie, A., Fan, Y., & Levinson, 
                    D. M. (2016). Transit Riders' Perception of Waiting Time and Stops' Surrounding Environments. 
                    Transportation Research Board, retrieved from the University Digital Conservancy,{" "}
                    <BasicLink
                        url="http://dx.doi.org/10.3141/2543-09"
                        text="http://dx.doi.org/10.3141/2543-09"
                    />.
                    <br />
                    <br />
                    <span className={superText}>6</span> Vibrant Cities Lab. “Trees calm traffic, reduce stress 
                    and car accidents, encourage walking and extend the life of pavement.” US Forest Service and 
                    American Forests,{" "}
                    <BasicLink
                        url="https://vibrantcitieslab.com/research/transportation/#:~:text=Mobility%20Impact,-Traffic%20Calming&text=Trees%20can%20calm%20traffic%20and,within%20an%208%2Dyear%20period"
                        text="https://vibrantcitieslab.com/research/transportation/#:~:text=Mobility%20Impact,-Traffic%20Calming&text=Trees%20can%20calm%20traffic%20and,within%20an%208%2Dyear%20period"
                    />.
                </div>
                <div className="flex justify-center py-6">
                    <DotsHorizontalIcon />
                </div>
                <div className="text-xs">Methods: One-meter resolution shade was modeled at noon (minimum shade), 3 p.m. (hottest time of day), and 6 p.m. (maximum shade) 
                    using high-resolution 2022 USGS LIDAR point cloud data and Microsoft Building Footprints on June 21, the longest day of the year.
                    <br/>
                    <br/>
                    Four surface models were created using LIDAR: (1) all features above ground (FDSM), (2) ground elevations, (3) a Building Surface Model and (4) 
                    a Canopy Model. A Building Surface Model was generated by extracting pixels in the FDSM within Microsoft Building Footprints. The Canopy Model 
                    extracted all other pixels in the FDSM, and defined trees and other non-building shade features as pixels with heights greater than 1.3 meters. 
                    All other above-ground elevations were set to 0 because they are not high enough to provide shade for the average person standing outdoors 
                    (Buo et al., 2023). The Canopy Model predominantly reflects tree shade; however, it also contains other non-building features such as shade sails 
                    that are treated like trees.
                    <br/>
                    <br/>
                    The shadowing function of the SOlar LongWave Environmental Irradiance Geometry (SOLWEIG) model proposed by Lindberg et al. (2008) simulated the 
                    shade distribution from surface models at 1-m resolution. Total shade is a function of the transmissivity of foliated vegetation for 
                    shortwave radiation and shadows from buildings and tree canopy (Lindberg & Grimmond, 2011). 
                    <br/>
                    <br/>
                    Unlike shade generated from the Building Surface Model, shadows from the Canopy Model can occur underneath an elevated feature (such as under tree 
                    canopy, a bridge, or a shade sail). The result are binary rasters that indicate the presence or absence of shade, including building shade, tree 
                    and other shade and total shade rasters. These rasters can be analyzed to calculate percent shade cover for any polygon using zonal statistics.
                </div>
                <div className="flex justify-center py-6">
                    <DotsHorizontalIcon />
                </div>

            </div>

            <div className="m-auto text-center text-xs">
            &copy; 2025 American Forests. All Rights Reserved.
            </div>
            <div className="h-20" />
        </section>
    )
}

export default Footer