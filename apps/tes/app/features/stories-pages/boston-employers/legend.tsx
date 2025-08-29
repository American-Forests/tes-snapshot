const getDemoColumnLabel = (demoColumn: string) => {
  switch (demoColumn) {
    case "pctpoc":
      return "People of Color";
    case "pctpov":
      return "People in Poverty";
    case "unemplrate":
      return "Unemployment Rate";
    default:
      return demoColumn;
  }
}

const Legend = ({ showTESLayer, showTransitLayer, demoColumn }: { showTESLayer: boolean, showTransitLayer: boolean, demoColumn: string }) => (
    <div
      className="absolute top-32 bottom-auto sm:bottom-4 md:bottom-10 sm:top-auto left-5 z-10 bg-white/75 p-4 rounded text-[#171717]"
      style={{ minWidth: "173px" }}
    >


      {/* Transit */}
      {showTransitLayer && (
        <div>
          <div className="mb-2">
            <div className="flex items-center">
              <div
                style={{
                    width: "20px",
                    height: "5px",
                    backgroundColor: "#4e4e4e",
                    opacity: "85%",
                    marginRight: "4px"
                }}
              />
              <span className="ml-2 text-black text-sm">MBTA Rail</span>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center">
              <div
                style={{
                    width: "20px",
                    height: "2px",
                    backgroundColor: "#686868",
                    opacity: "55%",
                    marginRight: "4px"
                }}
              />
              <span className="ml-2 text-black text-sm">MBTA Bus</span>
            </div>
          </div>
        </div>
      )}

      {/* Employers */}
      <div className="mb-2">
        <div className="flex items-center">
          <div
            style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#FFFFFF",
                opacity: "100%",
                borderRadius: "50%",
                border: "2px solid #2C7D53",
                marginRight: "4px"
            }}
          />
          <span className="ml-2 text-black text-sm">Employer</span>
        </div>
      </div>

      {/* Tree Equity Score */}
      {showTESLayer && (
        <div className="mt-2">
          <div className="text-black text-sm pb-2">Tree Equity Score</div>
          <div className="flex items-center">
            <span className="text-black text-xs mr-2">&lt;70</span>
            <div
              className="flex-grow h-4"
              style={{
                background: "linear-gradient(to right, #F99D3E, #6CC396)",
              }}
            />
            <span className="text-black text-xs ml-2">100</span>
          </div>
        </div>
      )}

      {/* Demographics */}
      {!showTESLayer && (
        <div className="mt-2">
          <div className="text-black text-sm pb-2">{getDemoColumnLabel(demoColumn)}</div>
          <div className="flex items-center">
            <span className="text-black text-xs mr-2">0%</span>
            <div
              className="flex-grow h-4"
              style={{
                background: "linear-gradient(to right, #FFFFFF, #007185)",
              }}
            />
            <span className="text-black text-xs ml-2">100%</span>
          </div>
        </div>
      )}
    </div>
  )

  export default Legend
