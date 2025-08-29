import { twMerge } from "tailwind-merge"
import type { GenericComp } from "./utils"

export const ValueWithUnit: GenericComp<{ unitClassName?: string }> = ({
  item,
  className,
  unitClassName,
}) => (
  <span className={className}>
    {`${item.displayValue || item.value}`}
    <span className={`${unitClassName}`}>{item.unit}</span>
  </span>
)

export const Fragment: GenericComp = ({ item, className }) => {
  return <span className={twMerge("font-medium", className)}>{item.value}</span>
}

export const Progress: GenericComp = ({ item, className }) => {
  const percent = item.value
  return (
    <div className={twMerge("flex items-center w-full", className)}>
      <div className="w-11/12 bg-gray-200 h-3 rounded-lg">
        <div
          style={{
            width: `${percent}%`,
          }}
          className="bg-brand-mint-green h-3 rounded-l-lg  border-r-2 border-brand-green-dark"
        ></div>
      </div>
      <div className="w-2/12 p-.5 font-medium">{item.value}</div>
    </div>
  )
}

export const Percentile: GenericComp = ({ item, className }) => {
  const percent = Number(item.value)
  return (
    <div className={twMerge("w-full h-full relative group", className)}>
      <div
        style={{
          left: `calc(${percent}% - ${percent > 10 ? "2.5em" : "1.5em"})`,
        }}
        className={twMerge(
          "absolute pl-3 z-50 font-semibold xl:text-[15px] lg:text-sm text-xs text-[#005251]",
          "bottom-[12px]"
        )}
      >
        <ValueWithUnit className="whitespace-nowrap" item={item} />
        {item.hint && (
          <div
            className={twMerge(
              "absolute bottom-full left-1/2 transform -translate-x-20 translate-y-8 mb-2",
              "bg-brand-green-darker rounded-lg shadow-md p-2 text-sm text-white font-normal",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "pointer-events-none w-48 text-left z-50"
            )}
          >
            {item.hint}
          </div>
        )}
      </div>
      <div
        data-percent={percent}
        style={{
          width: `${percent}%`,
        }}
        className={twMerge(
          "w-full h-[5px] absolute z-20 bg-[#005251] cursor-pointer",
          "l-0 bottom-[3.5px]"
        )}
      ></div>
      <div
        style={{
          left: `${percent}%`,
        }}
        className={twMerge(
          "absolute z-20 bg-brand-green-dark cursor-pointer",
          "w-[2px] h-[12px]",
          "bottom-0"
        )}
      ></div>
      <div className="h-[20px] cursor-pointer">
        <div
          className={twMerge(
            "absolute bg-gray-300/20 bg-opacity-60",
            "l-0 w-[20%] h-[12px]",
            "bottom-0"
          )}
        ></div>
        <div
          className={twMerge(
            "absolute bg-gray-300/40 bg-opacity-60",
            "w-[20%] h-[12px]",
            "bottom-0",
            "left-[20%]"
          )}
        ></div>
        <div
          className={twMerge(
            "absolute bg-gray-300/60 bg-opacity-60",
            "w-[20%] h-[12px]",
            "bottom-0",
            "left-[40%]"
          )}
        ></div>
        <div
          className={twMerge(
            "absolute bg-gray-300/90 bg-opacity-60",
            "w-[20%] h-[12px]",
            "bottom-0",
            "left-[60%]"
          )}
        ></div>
        <div
          className={twMerge(
            "absolute bg-gray-400 bg-opacity-60",
            "w-[20%] h-[12px]",
            "bottom-0",
            "left-[80%]"
          )}
        ></div>
      </div>
    </div>
  )
}
