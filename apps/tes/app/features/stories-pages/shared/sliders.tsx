import { useState } from "react"
import { useStyles } from "./constants"
import Slider from "@material-ui/core/Slider"

export const ShortTimeSlider = ({ setTimeColumn }: { setTimeColumn: (time: string) => void }) => {
  const [value, setValue] = useState(0)
  const classes = useStyles()

  const marks = [
    { value: 0, label: "NOON" },
    { value: 1, label: "3PM" },
    { value: 2, label: "6PM" },
  ]

  const handleChange = (
    _event: React.ChangeEvent<Record<string, never>>,
    newValue: number | number[]
  ) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue
    setValue(val)
    switch (val) {
      case 0:
        setTimeColumn("_tot1200")
        break
      case 1:
        setTimeColumn("_tot1500")
        break
      case 2:
        setTimeColumn("_tot1800")
        break
    }
  }

  return (
    <div className="text-white font-bold w-36 md:w-48">
      <Slider
        aria-label="Shade Time"
        value={value}
        onChange={handleChange}
        step={null}
        marks={marks}
        min={0}
        max={2}
        className={`${classes.slider} ${classes.shortSlider}`}
      />
    </div>
  )
}

export const LongTimeSlider = ({ setTimeColumn }: { setTimeColumn: (time: string) => void }) => {
    const [value, setValue] = useState(2) // Default to noon
    const classes = useStyles()

    const marks = [
      { value: 0, label: "7AM" },
      { value: 1, label: "9AM" },
      { value: 2, label: "NOON" },
      { value: 3, label: "3PM" },
      { value: 4, label: "4PM" },
      { value: 5, label: "6PM" },
    ]

    const handleChange = (
      _event: React.ChangeEvent<Record<string, never>>,
      newValue: number | number[]
    ) => {
      const val = Array.isArray(newValue) ? newValue[0] : newValue
      setValue(val)
      switch (val) {
        case 0:
          setTimeColumn("_tot700")
          break
        case 1:
          setTimeColumn("_tot900")
          break
        case 2:
          setTimeColumn("_tot1200")
          break
        case 3:
          setTimeColumn("_tot1500")
          break
        case 4:
          setTimeColumn("_tot1600")
          break
        case 5:
          setTimeColumn("_tot1800")
          break
      }
    }

    return (

      <div className="text-white font-bold w-56 md:w-64">
        <Slider
          aria-label="Time Slider"
          value={value}
          onChange={handleChange}
          step={null}
          marks={marks}
          min={0}
          max={5}
          className={`${classes.slider} ${classes.longSlider}`}
        />
      </div>
    )
  }