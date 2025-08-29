import { PopupContentProps } from "./boston-employers.types"

// make sure coverage area string is clean
const cleanString = (input: string) => {
 return input.replace(/,(\S)/g, ', $1');
}
const PopupContent: React.FC<PopupContentProps> = ({ properties }) => {

  return (
    <div className="text-sm text-center bg-white/90 rounded p-3 text-[#171717]">
      <div className="text-base text-center pb-1">
        <div className="font-bold">
          {properties.company}
        </div><span className="text-sm">
        {properties.address}</span>
      </div>
      <hr className="border-1 border-black" />
      <div className="py-2">
        {typeof properties.job_posts === "number" && (
          <>
            <b>Job Postings:</b> {properties.job_posts}
            <br />
          </>
        )}
        {typeof properties.cov_area === "string" && (
          <>
            <b>Coverage Area:</b> {cleanString(properties.cov_area)}
            <br />
          </>
        )}
      </div>
      <hr className="border-1 border-black" />
      <div className="pt-2">
        {typeof properties.tree_canop === "number" && (
          <>
            <b>Tree Equity Score:</b> {properties.tes}<br />
          </>
        )}
        {typeof properties.pctpov === "number" && (
          <>
            <b>People in Poverty:</b> {Math.round(properties.pctpov * 100)}%<br />
          </>
        )}
        {typeof properties.pctpoc === "number" && (
          <>
            <b>People of Color:</b> {Math.round(properties.pctpoc * 100)}%<br />
          </>
        )}
        {typeof properties.unemplrate === "number" && (
          <>
            <b>Unemployment Rate:</b> {Math.round(properties.unemplrate * 100)}%
          </>
        )}
      </div>
    </div>
  )
}

export default PopupContent