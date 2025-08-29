import { withStyles, Slider as UISlider } from "@material-ui/core"
import React from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const animTime = 90

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
    transition: `left ${animTime}ms`,
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
    transition: `width ${animTime}ms`,
  },
  rail: {
    height: 32,
    borderRadius: 4,
  },
})(UISlider)

type SliderProps = {
  title: string
  subtitle: string
  targetScore: number
  handleSliderChange: (event: React.ChangeEvent<unknown>, newValue: number | number[]) => void
  handleSliderChangeCommited: (
    event: React.ChangeEvent<unknown>,
    newValue: number | number[],
  ) => void
}

export const Slider: React.FC<SliderProps> = ({
  title,
  subtitle,
  targetScore,
  handleSliderChange,
  handleSliderChangeCommited,
}) => {
  const cx = "flex flex-col items-center justify-center pb-8 pt-1"
  const titleCx = "text-base font-base text-gray-700 pb-5 text-center"
  const subtitleCx = "text-lg text-brand-green-dark font-semibold text-center"
  const sliderWrapperCx = "-mt-1 pb-8 w-full"
  const infoCx = "text-gray-500 text-sm -mt-3 pb-1"
  const printrCX = "pb-2 print:break-before-page"
  const infoPrintCX = "print:hidden"
  const { t } = useTranslation(["location-insights"])
  return (
    <div className={twMerge(cx, printrCX)}>
      <p className={titleCx}>{title}</p>
      <p className={subtitleCx}>{subtitle}</p>
      <div className={sliderWrapperCx}>
        <StyledSlider
          value={targetScore}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommited}
        />
      </div>
      <p className={twMerge(infoCx, infoPrintCX)}>{t("location-insights:planning.drag_adjust")}</p>
    </div>
  )
}
