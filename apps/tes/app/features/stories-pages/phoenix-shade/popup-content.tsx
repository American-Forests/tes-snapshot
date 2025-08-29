import { PopupContentProps } from "./phoenix-shade.types"

const PopupContent: React.FC<PopupContentProps> = ({ properties, timeColumn }) => {
  const totValue = properties[timeColumn]
  const vegValue = properties[timeColumn.replace("_tot", "_veg")]
  const bldValue = properties[timeColumn.replace("_tot", "_bld")]
  
  return (
    <div className="font-md text-center text-white bg-[#171717]/90 rounded p-3">
      <div className="text-base">
        <div className="text-[#9CACC1] font-bold uppercase">
          {properties.PROPERTY_N}
        </div>
        <div className="text-white font-bold">
          Total Shade: {typeof totValue === "number" ? `${Math.round(totValue)}%` : "N/A"}
        </div>
      </div>
      <hr className="border-1 border-white my-1" />
      Building Shade: {typeof bldValue === "number" ? `${Math.round(bldValue)}%` : "0%"}
      <br/>
      Tree and Other Shade: {typeof vegValue === "number" ? `${Math.round(vegValue)}%` : "0%"}      
    </div>
  )
}

export default PopupContent