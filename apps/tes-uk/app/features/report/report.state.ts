import { atom } from "jotai"
import { DEFAULT_TARGET_SCORE } from "./report.constants"

export const targetScoreAtom = atom<number>(DEFAULT_TARGET_SCORE)
