import { atom } from "jotai"
import type { Filter } from "react-hooks"

export const filtersAtom = atom<Filter[] | null>(null)
