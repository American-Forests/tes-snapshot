'use client'
import { FC } from "react"
import { PlusIcon, MinusIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import {
  Accordion as AccessibleAccordion,
  AccordionItem as Item,
} from "@szhsin/react-accordion"
import ReactMarkdown from "react-markdown"
import { ReactNode } from "react"
type AccordionContentVariant = "primary" | "secondary"
type AccordionContentType = "accordion" | "list"
type AccordionContent = {
  content: string
}

export interface AccordionItemType {
  title: string | ReactNode
  variant?: AccordionContentVariant
  type?: AccordionContentType
  nestedAccordionContent?: AccordionItemType[]
  content?: string
  nested?: boolean
  className?: string
  theme?: "green" | "blue"
}

export interface AccordionProps {
  items: AccordionItemType[]
  variant?: AccordionContentVariant
  className?: string
  allowMultiple?: boolean
}

export const AccordionItem: FC<AccordionItemType & { children: ReactNode }> = ({
  title,
  variant,
  nested,
  className,
  children,
  theme = "green",
  ...rest
}) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <div
        className={`text-gray-800 text-sm font-semibold justify-between items-center rounded-sm flex flex-row w-full h-full p-3
        ${variant === "secondary" ? "text-sm" : ""}
        ${nested && "text-[#33966d] text-[13px] pl-3 text-left leading-tight"}
        ${className}
      `}
      >
        {title}
        {variant === "primary" && !nested && (
          <div
            className={`flex justify-center items-center border w-3 h-3 rounded-sm ${
              theme === "green"
                ? "text-brand-green-dark border-brand-green-dark"
                : "text-brand-blue-dark border-brand-blue-dark"
            }`}
          >
            {isEnter ? <MinusIcon /> : <PlusIcon />}
          </div>
        )}
        {(variant === "secondary" || nested) && (
          <div
            className={`text-brand-green-dark w-4 h-4 transition-transform duration-200 ease-in-out 
            ${isEnter && "rotate-180"}
          `}
          >
            <ChevronDownIcon />
          </div>
        )}
      </div>
    )}
    className={`
      justify-between
      ${variant === "secondary" ? "border-b border-b-gray-200" : ""}
      ${nested ? "border-b border-b-gray-200" : ""}
    `}
    buttonProps={{
      className: `justify-between items-center border-none flex flex-row w-full hover:bg-opacity-5 ${
        theme === "green"
          ? "text-brand-green-dark border-b-brand-green hover:bg-brand-green"
          : "text-brand-blue-dark-dark border-b-brand-blue-dark hover:bg-brand-blue-dark"
      }`,
    }}
    contentProps={{
      className: "transition-height duration-200 ease-in-out",
    }}
    panelProps={{ className: "p-0" }}
  >
    {children}
  </Item>
)

const AccordionItemContent: FC<AccordionContent> = ({ content }) => (
  <ReactMarkdown
    components={{
      p: ({ ...props }) => (
        <p className="pl-3 pb-3 text-gray-700 pr-3" {...props} />
      ),
      a: ({ ...props }) => <a className="text-brand-green" {...props} />,
      ol: ({ ...props }) => (
        <ol className="[counter-reset:list-number] relative" {...props} />
      ),
      ul: ({ ...props }) => (
        <ul className="pl-8 relative" {...props} />
      ),
      li: ({ ordered, ...props }) => (
        <li
          {...props}
          className={`pb-2 pr-3 text-gray-700 before:inline-block  ${
            ordered
              ? "relative before:flex before:justify-center before:items-center pb-2 pl-8 [counter-increment:list-number] before:content-[counter(list-number)] before:left-2 before:-top-[0px]  before:absolute before:text-gray-800 before:w-5 before:h-5 before:bg-brand-green-light before:text-sm before:rounded-full before:flex items-center before:font-bold"
              : "pb-1 list-disc"
          } }`}
        />
      ),
    }}
  >
    {content}
  </ReactMarkdown>
)

export const Accordion: FC<AccordionProps> = ({
  items,
  variant,
  className,
  ...rest
}) => (
  <AccessibleAccordion transition transitionTimeout={200} {...rest}>
    {items &&
      items.map((item) =>
        item.type === "accordion" ? (
          <AccordionItem
            title={item.title}
            variant={variant}
            className={className}
          >
            {item.content && (
              <p className="pl-3 pb-3 text-gray-700 pr-3">{item.content}</p>
            )}
            {item.nestedAccordionContent && (
              <AccessibleAccordion
                transition
                transitionTimeout={200}
                allowMultiple={false}
              >
                {item.nestedAccordionContent?.map((element) => (
                  <AccordionItem
                    title={element.title}
                    className={element.className}
                    nested
                  >
                    <AccordionItemContent content={element.content!} />
                  </AccordionItem>
                ))}
              </AccessibleAccordion>
            )}
          </AccordionItem>
        ) : (
          <AccordionItem
            title={item.title}
            variant={variant}
            className={className}
          >
            <AccordionItemContent content={item.content!} />
          </AccordionItem>
        )
      )}
  </AccessibleAccordion>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AccordionWithChildren: FC<any> = ({ children, ...props }) => (
  <AccessibleAccordion transition transitionTimeout={200} {...props}>
    {children}
  </AccessibleAccordion>
)
