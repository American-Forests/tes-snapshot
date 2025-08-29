import { PopupContentProps } from "./detroit-shade.types"

const PopupContent: React.FC<PopupContentProps> = ({ properties, timeColumn }) => {
  const totValue = properties[timeColumn]
  const vegValue = properties[timeColumn.replace("_tot", "_veg")]
  const bldValue = properties[timeColumn.replace("_tot", "_bld")]
  
  if (properties.Route_Name) {
    return (
      <div className="text-sm text-center text-white bg-[#171717]/90 rounded p-3">
        <div className="text-[#FFBC2B] text-base">
          <div className="font-bold -mb-1">
            {properties.Route_Name} {properties.Route_Numb}
          </div><span className="text-sm">
          {properties.Descriptio}</span>
        </div>
        <div className="font-light tracking-tight">
          Shelter: {properties.shelter ? "Yes" : "No" }<br />
          Total Shade: {typeof totValue === "number" ? `${Math.round(totValue)}%` : "N/A"}
          <hr className="border-1 border-white my-1" />
          Building Shade: {typeof bldValue === "number" ? `${Math.round(bldValue)}%` : "0%"}
          <br/>
          Tree Shade: {typeof vegValue === "number" ? `${Math.round(vegValue)}%` : "0%"}         
        </div>
      </div>
    )
  }

  if (properties.ROUTE_NAME) {
    return (
      <div className="uppercase text-sm text-center text-white font-bold bg-[#171717]/90 rounded p-3">
        {properties.ROUTE_NAME} {properties.DIRECTION}
      </div>
    )
  }

  else {
    return (
      <div className="text-sm text-center text-white bg-[#171717]/90 rounded p-3">
        <div className="text-[#FFBC2B] font-bold text-base">
          Total Shade: {typeof totValue === "number" ? `${Math.round(100 * totValue)}%` : "N/A"}
        </div>
        <hr className="border-1 border-white my-1" />
        <div className="font-light tracking-tight">
        Building Shade: {typeof bldValue === "number" ? `${Math.round(100 * bldValue)}%` : "0%"}
          <br/>
          Tree Shade: {typeof vegValue === "number" ? `${Math.round(100 * vegValue)}%` : "0%"}         
        </div>
      </div>
    )
  }
}

export default PopupContent