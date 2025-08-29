import React, { Children, useRef } from "react"
import { useTab, useTabList, useTabPanel, AriaTabListProps } from "react-aria"
import { Item, useTabListState, TabListState } from "react-stately"

function Tab({
  item,
  state,
}: {
  item: Record<string, any>
  state: TabListState<unknown>
  orientation?: string
}): JSX.Element {
  let { key, rendered } = item
  const ref = useRef<HTMLDivElement>(null)
  let { tabProps, isSelected, isDisabled } = useTab({ key }, state, ref)
  return (
    <div
      {...tabProps}
      ref={ref}
      className={`
          border-b-2 pt-1 px-1 mr-8 uppercase text-gray-50 cursor-pointer text-xs font-semibold tracking-wide
          ${isSelected ? "border-gray-50" : "border-transparent"}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
    >
      {rendered}
    </div>
  )
}

export function TabsComponent(props: AriaTabListProps<object>) {
  let state = useTabListState(props)
  let ref = useRef<HTMLDivElement>(null)
  let { tabListProps } = useTabList(props, state, ref)
  return (
    <div className={`tabs ${props.orientation || ""} h-[calc(100%-75px)]`}>
      <div
        {...tabListProps}
        ref={ref}
        className="flex flex-row p-4 bg-brand-green-dark h-[55px]"
      >
        {Array.from(state.collection).map((item) => (
          <Tab
            key={item.key}
            item={item}
            state={state}
            orientation={props.orientation}
          />
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  )
}

function TabPanel({ state, ...props }: { state: TabListState<unknown> }) {
  const ref = useRef<HTMLDivElement>(null)
  const { tabPanelProps } = useTabPanel(props, state, ref)
  return (
    <div
      {...tabPanelProps}
      ref={ref}
      className="h-full relative overflow-y-scroll"
    >
      {state.selectedItem?.props.children}
    </div>
  )
}

export const Tabs = ({
  children,
  label,
}: {
  children: JSX.Element[]
  label: string
}) => (
  <TabsComponent aria-label={label} orientation="horizontal">
    {Children.map(children, (child, index) => (
      <Item key={index} title={child.props.title}>
        {child}
      </Item>
    ))}
  </TabsComponent>
)
