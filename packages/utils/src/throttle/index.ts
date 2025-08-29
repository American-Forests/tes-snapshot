export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): {
  (...args: Parameters<T>): void
  clear: () => void
} {
  let inThrottle: boolean = false
  let timeoutId: NodeJS.Timeout | null = null

  const throttled = (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      timeoutId = setTimeout(() => {
        inThrottle = false
        timeoutId = null
      }, limit)
    }
  }

  throttled.clear = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      inThrottle = false
      timeoutId = null
    }
  }

  return throttled
}
