import CONFIG from '@config'
import noop from '@helpers/noop'
import { PureComponent, ReactNode } from 'react'
import { IImageControllerProps, IImageControllerState } from './types'

export const setSrcByDimensions = (src: string, width: number, height: number, checkForHighDensity: boolean = true): string => {
  if (src.indexOf('?') === -1) {
    return src
  }

  let srcParts = decodeURIComponent(src).split('?')
  let host = srcParts[0]
  let queryString = srcParts[1]
  let indexOfOutputFormat = queryString.indexOf('&output-format')

  // the image service from akamai requires an output-format
  if (indexOfOutputFormat === -1) {
    let format = 'progressive-jpeg'
    // Don't try to convert png/gif to progressive-jpeg, doesn't work
    if (host.endsWith('.png')) {
      format = 'png'
    } else if (host.endsWith('.gif')) {
      format = 'gif'
    }

    queryString += `&output-format=${format}`
    indexOfOutputFormat = queryString.indexOf('&output-format')
  }

  const start = queryString.indexOf('|') + 1
  const end = indexOfOutputFormat
  const dimensions = queryString.slice(start, end)
  const isHighDensity = !CONFIG.IS_SERVER && window.devicePixelRatio > 1

  width = checkForHighDensity && isHighDensity ? Math.ceil(width * 2) : Math.ceil(width)
  height = checkForHighDensity && isHighDensity ? Math.ceil(height * 2) : Math.ceil(height)

  queryString = queryString.replace(dimensions, `${width}:${height}`)

  return encodeURI(`${host}?${queryString}`)
}

export class ImageController extends PureComponent<IImageControllerProps, IImageControllerState> {
  public readonly state: IImageControllerState = {
    isVisible: false,
    width: 300,
    height: 300
  }

  public render(): ReactNode {
    const { children, src } = this.props
    const { isVisible, width, height } = this.state
    const optimizedSrc = setSrcByDimensions(src, width, height, true)

    return children({
      onLoad: this.onLoad,
      onIntersection: this.onIntersection,
      isVisible,
      src: optimizedSrc,
      width,
      height
    })
  }

  private onLoad = (): void => {
    const { onLoad = noop } = this.props
    onLoad()
  }

  private onIntersection = (ev: IntersectionObserverEntry, unobserve: (state: IImageControllerState) => void): void => {
    if (ev.isIntersecting && !this.state.isVisible) {
      let width
      let height

      if (this.props.width && this.props.height) {
        width = this.props.width
        height = this.props.height
      } else if (ev.target && ev.target.parentNode) {
        const parentNode = ev.target.parentNode as Element
        const parentDimensions = parentNode
          ? parentNode.getBoundingClientRect()
          : {
              width: 0,
              height: 0
            }

        width = parentDimensions.width
        height = parentDimensions.height
      } else {
        width = this.state.width
        height = this.state.height
      }

      const newState = { isVisible: true, width: Math.ceil(width), height: Math.ceil(height) }

      this.setState(newState)
      unobserve(newState)
    }
  }
}
