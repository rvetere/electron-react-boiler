import { IInterval } from './types'

export const requestInterval = (fn: () => void, delay: number): IInterval => {
  let start = new Date().getTime()
  let handle: IInterval = { value: 0 }

  const loop = (): void => {
    let current = new Date().getTime()
    let delta = current - start

    if (delta >= delay) {
      fn.call(this)
      start = new Date().getTime()
    }

    handle.value = window.requestAnimationFrame(loop)
  }

  handle.value = window.requestAnimationFrame(loop)

  return handle
}

export const clearRequestInterval = (handle: IInterval): void => {
  if (handle) {
    window.cancelAnimationFrame(handle.value)
  }
}

export const isBreakpointSmaller = (): boolean => false

export const isBreakpointBigger = (): boolean => false
