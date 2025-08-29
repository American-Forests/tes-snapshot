import { withStyles } from "@material-ui/core/styles"
import Slider from "@material-ui/core/Slider"

const StyledSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    padding: 2,
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -4,
    marginLeft: -6,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% -6px)",
    fontWeight: "bold",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider)

export const TSlider = (
  props: React.ComponentProps<typeof StyledSlider> & { step: number; showInputs: boolean },
) => {
  const value = props.value as [number, number]
  if (props.showInputs === false) {
    return <StyledSlider {...props} />
  }
  return (
    <div
      className="grid items-center"
      style={{
        gridTemplateColumns: "min-content 1fr min-content",
      }}
    >
      <input
        type="number"
        value={value[0]}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(e) => {
          props.onChange?.(e, [+e.target.value, value[1]])
        }}
        className="p-0.5 text-xs w-14 border-gray-100 hover:border-gray-500 rounded text-right mr-2"
      />
      <StyledSlider {...props} />
      <input
        type="number"
        value={value[1]}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(e) => {
          props.onChange?.(e, [value[0], +e.target.value])
        }}
        className="ml-4 p-0.5 text-xs w-14 border-gray-100 hover:border-gray-500 rounded text-right"
      />
    </div>
  )
}
