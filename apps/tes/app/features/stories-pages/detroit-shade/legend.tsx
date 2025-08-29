const Legend = ({ areBusStopsVisible }: { areBusStopsVisible: boolean }) => (
    <div
      className="absolute top-32 bottom-auto sm:bottom-4 md:bottom-10 sm:top-auto left-5 z-10 bg-[#171717]/80 p-4 rounded"
      style={{ minWidth: "173px" }}
    >
      
      {/* Bus Stops */}
      {areBusStopsVisible && (
        <div className="mb-2">
        <div className="text-white text-sm uppercase mb-2">Bus Stop Shade</div>
        <div className="flex items-center mb-1">
            <div 
            style={{ 
                width: "10px", 
                height: "10px",
                backgroundColor: "#4D4D4D",
                borderRadius: "50%",
                border: "1px solid #000000",
                marginLeft: "10px",
                marginRight: "15px"
            }} 
            />
            <span className="text-white text-xs">5%</span>
        </div>
        <div className="flex items-center">
            <div 
            style={{ 
                width: "30px", 
                height: "30px",
                backgroundColor: "#4D4D4D",
                borderRadius: "50%",
                border: "1px solid #000000",
                marginRight: "4px"
            }} 
            />
            <span className="text-white text-xs">100%</span>
        </div>
        </div>
        )}

      {/* Bus Routes */}
      <div className="flex items-center">
        <div 
          style={{ 
            width: "20px", 
            height: "2px", 
            backgroundColor: "#F9F3E7",
            transform: "rotate(-45deg)",
            marginRight: "8px"
          }} 
        />
        <div className="text-white text-sm uppercase">Bus Routes</div>
      </div>
  
      {/* Shade */}
      <div className="mt-2">
        <div className="flex items-center mb-2 ml-[28px] text-white text-sm uppercase">Shade</div>
        <div className="flex items-center">
          <span className="text-white text-xs mr-2">0</span>
          <div
            className="flex-grow h-4"
            style={{
              background: "linear-gradient(to left, #47505F, #8B929E, #C2CAD4, #F6D0B1)",
            }}
          />
          <span className="text-white text-xs ml-2">&#8250;50%</span>
        </div>
      </div>
    </div>
  )
  
  export default Legend