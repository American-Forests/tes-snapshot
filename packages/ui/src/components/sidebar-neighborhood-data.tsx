import { HelpTooltip } from "./help-tooltip"

export const SidebarNeighborhoodData = ({
  populationHint,
  title,
  population,
  location,
  urbanArea,
  urbanPercentage,
  areaType,
  urbanHint,
}: {
  populationHint: string
  title: string
  population: number
  location: string
  urbanArea: string
  urbanPercentage: string
  areaType: string
  urbanHint: string
}) => (
  <div className="grid border-t-2">
    <div className="flex flex-col items-center pt-6 pb-3">
      <p className="font-bold text-sm text-brand-green-dark">{title}</p>
      <div className="flex flex-row justify-center items-center pb-1">
        <p
          className={`${
            population < 20
              ? "text-[15px] text-[#E94D4D]"
              : "text-[13px] text-brand-green-dark"
          } font-semibold mr-1`}
        >
          Population: {population.toLocaleString("en")}
        </p>
        <HelpTooltip>
          <p>{populationHint}</p>
        </HelpTooltip>
      </div>
      <div className="flex flex-row justify-center items-center pb-1">
        <p
          className={`${
            population < 20
              ? "text-[15px] text-[#E94D4D]"
              : "text-[13px] text-brand-green-dark"
          } font-semibold mr-1`}
        >
          {`Urban area: ${urbanArea} sq-km (${urbanPercentage} of ${areaType} area)`}
        </p>
        <HelpTooltip>
          <p>{urbanHint}</p>
        </HelpTooltip>
      </div>
      <p className="text-gray-600 font-semibold text-sm">{location}</p>
    </div>
  </div>
)
