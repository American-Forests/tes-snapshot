const Legend = () => (
<div
    className="absolute top-32 bottom-auto sm:bottom-4 md:bottom-10 sm:top-auto left-5 z-10 bg-[#171717]/80 p-4 rounded"
    style={{ minWidth: "173px" }}
>
    <div className="text-white text-sm mb-2 uppercase">Shade</div>
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
)

export default Legend