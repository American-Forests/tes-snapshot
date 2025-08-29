import {
    ChatBubbleIcon,
    Pencil2Icon,
    BellIcon,
    HandIcon,
    HomeIcon,
    BackpackIcon,
    DrawingPinIcon,
    ReaderIcon
  } from "@radix-ui/react-icons"
  import { boldText } from "app/features/stories-pages/austin-shade/austin-shade-constants"
  import BasicLink from "../shared/basic-link";

  interface DifferenceItem {
    icon: typeof ChatBubbleIcon;
    title: string;
    text: string | JSX.Element;
  }
  
const MakeADifference = () => {
    const items: DifferenceItem[] = [
      {
        icon: ChatBubbleIcon,
        title: "Raise Awareness",
        text: "Start the conversation with your classmates, parents, teachers and school administrators. Create posters, presentations, or social media campaigns to show how shade — or the lack of it — affects your classmates' daily walks or bike rides.",
      },
      {
        icon: Pencil2Icon,
        title: "Map Hotspots",
        text: "Work with classmates to map the routes students take to school. Identify areas where shade is missing.",
      },
      {
        icon: BellIcon,
        title: "Advocate for Change",
        text: "Write letters or petitions to local leaders or attend community meetings. Ask for more investments in urban forestry;  shaded, safe routes to school; and good streetscape design that includes adequate space for trees to grow and thrive.",
      },
      {
        icon: HandIcon,
        title: "Volunteer for Tree Planting",
        text: (
          <>
            Join local environmental groups like{" "}
            <BasicLink url="http://treefolks.org" text="TreeFolks" />{" "}
            or{" "}
            <BasicLink url="http://austinparks.org" text="Austin Parks Foundation" />{" "}
            to participate in tree planting to add more greenery around your neighborhood, at your
            school and in local public spaces.
          </>
        ),
      },
      {
        icon: HomeIcon,
        title: "Get Neighbors Involved",
        text: (
          <>
            Encourage families and community members to plant trees in their front yards that can
            provide shade for nearby sidewalks.{" "}
            <BasicLink url="https://www.austintexas.gov/trees" text="The City of Austin's Urban Forest Program"/>{" "}
            offers curated resources to help grow and maintain our tree canopy.
          </>
        ),
      },
      {
        icon: BackpackIcon,
        title: "Design a Project",
        text: (
          <>
            Work with{" "}
            <BasicLink url="https://www.austintexas.gov/department/neighborhood-partnering-program" text="Austin's Neighborhood Partnering Program" />{" "}
            to fund, develop and carry out a project on city property. Work with parent-teacher
            groups and academic institutions to apply for an{" "}
            <BasicLink url="https://www.austintexas.gov/urban-forest-grant" text="Urban Forest Grant" />{" "}
            for projects like school plantings.
          </>
        ),
      },
      {
        icon: DrawingPinIcon,
        title: "Engage in School Safety and Sustainability",
        text: (
          <>
            Explore opportunities available through{" "}
            <BasicLink url="https://www.austintexas.gov/saferoutes" text="Austin's Safe Routes to School Program" />{" "}
            to help kids walk, bike, and roll to school safely. Follow the{" "}
            <BasicLink url="https://www.austinisd.org/advisory-bodies/esac" text="Environmental Stewardship Advisory Committee" />{" "}
            (ESAC) to support sustainability at school."
          </>
        ),
      },
    ];
  
    return (
      <div className="bulleted-list text-xs md:text-base">
        <ul className="list-none pl-3 md:pl-5">
          {items.map((item, index) => {
            const IconComponent = item.icon
            return (
              <li key={index} className="flex items-start mb-4 leading-4 lg:leading-5">
                <IconComponent className="w-[15px] h-[15px] mr-4 mt-1 flex-shrink-0" />
                <span>
                  <span className={boldText}>{item.title}:</span>{" "}
                  {typeof item.text === "string" ? item.text : item.text}
                </span>
              </li>
            )
          })}
          <hr className="my-4" />
          <li className="flex items-start mb-4">
            <ReaderIcon className="w-[15px] h-[15px] mr-4 mt-1 flex-shrink-0" />
            <span>
              <span className={boldText}>Helpful Resources on Heat:</span>{" "}
              <BasicLink
                url="https://innovation.luskin.ucla.edu/wp-content/uploads/2022/10/Urban-Heat-and-Cool-Design-Facts.pdf"
                text="Urban Heat and Cool Design Facts"
              />
              ,{" "}
              <BasicLink
                url="https://innovation.luskin.ucla.edu/wp-content/uploads/2023/10/Action-Area-3-Protecting-Students-from-Heat-Outdoors.pdf"
                text="Protecting Students from Heat Outdoors"
              />
              ,{" "}
              <BasicLink
                url="https://innovation.luskin.ucla.edu/publication/the-problem-with-hot-schools/"
                text="The Problem with Hot Schoolyards"
              />
              ,{" "}
              <BasicLink
                url="https://innovation.luskin.ucla.edu/wp-content/uploads/2024/03/Communicating-Heat-Risk.pdf"
                text="Communicating Heat Risk"
              />
            </span>
          </li>
        </ul>
    </div>
  )
}

export default MakeADifference