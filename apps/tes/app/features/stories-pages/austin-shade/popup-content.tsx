import { PopupContentProps } from "./austin-shade.types"

const PopupContent: React.FC<PopupContentProps> = ({ properties, timeColumn }) => {
  const totValue = properties[timeColumn]
  const vegValue = properties[timeColumn.replace("_tot", "_veg")]
  const bldValue = properties[timeColumn.replace("_tot", "_bld")]

  if (properties.NAME) {
    return (
      <div className="bg-[#171717]/90 text-white p-3 rounded text-center">
        <div className="text-base text-[#93AFD1] font-bold leading-5">{properties.NAME}</div>
        <div className="text-sm text-white">{properties.STREET}</div>
      </div>
    )
  }

  if (properties.tree_canop) {
    return (
      <div className="font-md bg-[#171717]/90 rounded p-3">
        <div className="text-base text-center text-white pb-1">
          <div className="text-[#93AFD1] capitalize font-bold">
            {typeof totValue === "number" ? `${Math.round(totValue)}%` : "N/A"} Total Shade
          </div><span className="text-sm">
          {timeColumn === "_tot1200" ? "Noon" : timeColumn === "_tot1500" ? "3PM" : "6PM"}</span>
        </div>
        <hr className="border-1 border-white" />
        <div className="pt-2 text-white">
        Building Shade: {typeof bldValue === "number" ? `${Math.round(bldValue)}%` : "0%"}
        <br/>
        Tree and Other Shade: {typeof vegValue === "number" ? `${Math.round(vegValue)}%` : "0%"}
        <br />
        
          {typeof properties.tree_canop === "number" && (
            <>
              Tree Canopy: {Math.round(properties.tree_canop * 100)}%
              <br />
            </>
          )}
          {typeof properties.pctpov === "number" && (
            <>
              People in poverty: {Math.round(properties.pctpov * 100)}%<br />
            </>
          )}
          {typeof properties.pctpoc === "number" && (
            <>People of color: {Math.round(properties.pctpoc * 100)}%</>
          )}
        </div>
      </div>
    )
  }
    
  if (vegValue != undefined) {
    return (
      <div className="font-md text-center text-white bg-[#171717]/90 rounded p-3">
        <div className="text-base">
        <span className="text-sm text-[#93AFD1]">
          {timeColumn === "_tot700"
            ? "7AM"
            : timeColumn === "_tot900"
            ? "9AM"
            : timeColumn === "_tot1200"
            ? "Noon"
            : timeColumn === "_tot1500"
            ? "3PM"
            : timeColumn === "_tot1600"
            ? "4PM"
            : "6PM"}
            </span>
          <div className="text-[#93AFD1] font-bold capitalize">
            {typeof totValue === "number" ? `${Math.round(totValue)}%` : "N/A"} Total Shade
          </div>
         
        </div>
        <hr className="border-1 border-white my-1" />
        Building shade: {typeof bldValue === "number" ? `${Math.round(bldValue)}%` : "0%"}
        <br />
        Tree and Other Shade: {typeof vegValue === "number" ? `${Math.round(vegValue)}%` : "0%"}
      </div>
    )
  }
}

export default PopupContent