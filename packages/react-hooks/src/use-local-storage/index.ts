import { useState } from "react"

const isBrowser = () => typeof window !== "undefined" //The approach recommended by Next.js

export const useLocalStorage = <T>(key: string) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = isBrowser() && window.localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      } else {
        return undefined
      }
    } catch (error) {
      return undefined
    }
  })

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (newValue: T) => {
    isBrowser() && window.localStorage.setItem(key, JSON.stringify(newValue))
    setLocalStorageValue(newValue)
  }

  return [localStorageValue, setLocalStorageStateValue]
}
