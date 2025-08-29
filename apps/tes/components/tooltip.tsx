import Tippy from "@tippyjs/react/headless"
import { CSSProperties } from "react"

interface ArrowProps {
  "data-placement"?: string
}

const Arrow = (props: ArrowProps & { arrowClassName?: string }) => {
  const { "data-placement": placement, arrowClassName } = props

  return (
    <div
      {...props}
      className={`${
        placement && placement.includes("top")
          ? "-bottom-1"
          : placement && placement.includes("bottom")
          ? "-top-1"
          : placement && placement.includes("left")
          ? "-right-1"
          : "-left-1"
      }`}
    >
      <div className={`${arrowClassName}`} />
    </div>
  )
}

export default function Tooltip({
  children,
  className,
  style,
  arrowClassName,
  tooltipText,
  enabled,
}: {
  children: React.ReactElement
  style?: CSSProperties
  className?: string
  arrowClassName?: string
  tooltipText: string
  enabled: boolean
}) {
  return enabled ? (
    <Tippy
      render={(attrs) => (
        <div style={style} className={`${className} box`} tabIndex={-1} {...attrs}>
          {tooltipText}
          <Arrow data-popper-arrow="" arrowClassName={arrowClassName} {...attrs} />
        </div>
      )}
    >
      {children}
    </Tippy>
  ) : (
    children
  )
}
