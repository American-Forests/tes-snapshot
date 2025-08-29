import { withStyles, Slider as UISlider } from "@material-ui/core"
import { twMerge } from "tailwind-merge"

const StyledSlider = withStyles({
  root: {
    color: "#6cc296",
    height: 8,
    padding: 2,
  },
  thumb: {
    height: 32,
    width: 12,
    borderRadius: 4,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
    marginTop: 0,
  },
  active: {},
  valueLabel: {
    left: "calc(-50% -6px)",
    fontWeight: "bold",
  },
  track: {
    height: 32,
    borderRadius: 4,
  },
  rail: {
    height: 32,
    borderRadius: 4,
  },
})(UISlider)

export const Slider = ({
  neighborhoodType,
  targetScore,
  numberOfNeighborhoodsBelowTarget = 0,
  totalNeighborhoods = 0,
  handleSliderChange,
}: {
  neighborhoodType: string
  targetScore: number
  numberOfNeighborhoodsBelowTarget: number
  totalNeighborhoods: number
  handleSliderChange: (event: React.ChangeEvent<unknown>, value: number | number[]) => void
}) => {
  const cx = "flex flex-col items-center justify-center pb-8"
  const titleCx = "text-2xl font-semibold text-gray-700 pb-2 text-center"
  const subtitleCx = "text-lg text-brand-green-dark font-bold text-center"
  const sliderWrapperCx = "pt-4 pb-8 w-full"
  const infoCx = "text-gray-500 text-sm -mt-2"
  const printrCX = "pb-2 print:break-before-page"
  const infoPrintCX = "print:hidden"

  return (
    <div className={twMerge(cx, printrCX)}>
      <p className={titleCx}>
        Get all {neighborhoodType}s to a Tree Equity Score of {targetScore}
      </p>
      <p className={subtitleCx}>
        {numberOfNeighborhoodsBelowTarget} of {totalNeighborhoods} have a Tree Equity Score below{" "}
        {targetScore}
      </p>
      <div className={sliderWrapperCx}>
        <StyledSlider value={targetScore} onChange={handleSliderChange} />
      </div>
      <p className={twMerge(infoCx, infoPrintCX)}>Drag to adjust target score</p>
    </div>
  )
}
