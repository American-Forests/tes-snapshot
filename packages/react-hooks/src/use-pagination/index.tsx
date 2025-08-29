export type ItemType =
  | "first"
  | "previous"
  | "start-ellipsis"
  | "page"
  | "end-ellipsis"
  | "next"
  | "last"

export type PageItem = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void
  page: number | null
  disabled: boolean
  type: ItemType
  selected: boolean
  "aria-current"?: string | undefined
}

type HookProps = {
  boundaryCount?: number
  count?: number
  disabled?: boolean
  hideNextButton?: boolean
  hidePrevButton?: boolean
  showFirstButton?: boolean
  showLastButton?: boolean
  siblingCount?: number
  handleClick: (e: React.MouseEvent<HTMLElement>, value: number | null) => void
  page: number
}

// https://dev.to/namirsab/comment/2050
const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

export function usePagination({
  boundaryCount = 1,
  count = 10,
  disabled = false,
  hideNextButton = false,
  hidePrevButton = false,
  showFirstButton = false,
  showLastButton = false,
  siblingCount = 1,
  handleClick,
  page,
}: HookProps) {
  const startPages = range(1, Math.min(boundaryCount, count))
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  )

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    count - boundaryCount - 1
  )

  // Basic list of items to render
  // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList: Array<ItemType | number> = [
    ...(showFirstButton ? ["first" as ItemType] : []),
    ...(hidePrevButton ? [] : ["previous" as ItemType]),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis" as ItemType]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? ["end-ellipsis" as ItemType]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ["next" as ItemType]),
    ...(showLastButton ? ["last" as ItemType] : []),
  ]

  // Map the button type to its page number
  const buttonPage = (type: ItemType) => {
    switch (type) {
      case "first":
        return 1
      case "previous":
        return page - 1
      case "next":
        return page + 1
      case "last":
        return count
      default:
        return null
    }
  }

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map((item) => {
    return typeof item === "number"
      ? {
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            handleClick(event, item)
          },
          type: "page" as ItemType,
          page: item,
          selected: item === page,
          disabled,
          "aria-current": item === page ? "true" : undefined,
        }
      : {
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            handleClick(event, buttonPage(item as ItemType))
          },
          type: item as ItemType,
          page: buttonPage(item as ItemType),
          selected: false,
          disabled:
            disabled ||
            (item.indexOf("ellipsis") === -1 &&
              (item === "next" || item === "last" ? page >= count : page <= 1)),
        }
  })

  return items
}
