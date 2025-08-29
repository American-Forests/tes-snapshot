export const FullLegend = () => (
    <div className="absolute bottom-auto top-32 sm:bottom-4 md:bottom-10 sm:top-auto left-5 sm:left-2 md:left-5 z-10 bg-[#171717]/80 p-4 rounded">
      <div className="flex items-center mb-2">
        <div
          className="w-3 h-3 mr-2 rounded-full"
          style={{
            backgroundColor: "rgba(255, 215, 251, 0.3)",
            border: "1px solid rgb(255, 226, 252)",
          }}
        />
        <span className="text-white text-xs md:text-sm uppercase">Public Schools</span>
      </div>
      <div className="flex items-center mb-4">
        <div
          className="w-3 h-3 mr-2 rounded-full"
          style={{
            backgroundColor: "rgba(239, 183, 79, 0.3)",
            border: "1px solid rgb(239, 183, 79)",
          }}
        />
        <span className="text-white text-xs md:text-sm uppercase">Private Schools</span>
      </div>

      <div className="text-white text-sm mb-2 uppercase">Shade</div>
      <div className="flex items-center">
        <span className="text-white text-xs mr-2">0</span>
        <div
          className="flex-grow h-4"
          style={{
            background: "linear-gradient(to right, #F6D0B1, #C2CAD4, #8B929E, #47505F)",
          }}
        />
        <span className="text-white text-xs ml-2">&gt;50%</span>
      </div>
    </div>
  )

  export const ShadeLegend = () => (
    <div
      className="absolute top-20 bottom-auto sm:bottom-4 md:bottom-10 sm:top-auto left-5 sm:left-2 md:left-5 z-10 bg-[#171717]/80 p-4 rounded"
      style={{ minWidth: "173px" }}
    >
      <div className="text-white text-sm mb-2 uppercase">Shade</div>
      <div className="flex items-center">
        <span className="text-white text-xs mr-2">0</span>
        <div
          className="flex-grow h-4"
          style={{
            background: "linear-gradient(to right, #F6D0B1, #C2CAD4, #8B929E, #47505F)",
          }}
        />
        <span className="text-white text-xs ml-2">&#8250;50%</span>
      </div>
    </div>
  )