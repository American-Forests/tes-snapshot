import ReactMarkdown from "react-markdown"
import { twMerge } from "tailwind-merge"

export const MarkdownWithCustomStyles = ({
  children,
  className,
  listIndentation,
}: {
  children: string
  className?: string
  listIndentation?: string
}) => (
  <ReactMarkdown
    components={{
      p: ({ ...props }) => (
        <p className={twMerge("pl-3 pt-3 text-gray-700 pr-3", className && className)} {...props} />
      ),
      ul: ({ ...props }) => (
        <ul
          className={twMerge(
            "pl-8 relative",
            className && className,
            listIndentation && listIndentation
          )}
          {...props}
        />
      ),
      li: ({ ...props }) => (
        <li
          {...props}
          className={twMerge("pb-2 pr-3 before:inline-block  list-disc", className && className)}
        />
      ),
      a: ({ ...props }) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={twMerge("text-brand-green")}
          {...props}
        />
      ),
    }}
    // className={twMerge("pl-4 pb-8", className && className)}
  >
    {children}
  </ReactMarkdown>
)
