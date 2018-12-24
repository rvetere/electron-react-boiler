import { ImageSetItem } from '@graphql/types/generated'
import { ReactNode } from 'react'

export interface IImageProps {
  src: string
  alt: string
  loadingSpinner?: ReactNode
  width?: number
  height?: number
  imageSet?: Array<ImageSetItem | null>
  showImageSet?: boolean
  renderDimensionsAttributes?: boolean
  onLoad?: () => void
}

export interface IImageControllerState {
  isVisible: boolean
  width: number
  height: number
}

export interface IImageViewProps {
  isVisible: boolean
  src: string
  width: number
  height: number
  alt: string
  renderDimensionsAttributes: boolean
  onLoad?: () => void
}

export interface IImageControllerRenderProps {
  width: number
  height: number
  isVisible: boolean
  src: string
  onLoad: () => void
  onIntersection: (ev: IntersectionObserverEntry, unobserve: () => void) => void
}

export interface IImageControllerProps {
  width?: number
  height?: number
  src: string
  onLoad?: () => void
  children: (data: IImageControllerRenderProps) => ReactNode
}

export interface IImageListViewProps {
  imageSet: Array<ImageSetItem | null>
  width: number
  height: number
  isVisible: boolean
  renderDimensionsAttributes: boolean
  animationStarted: boolean
  activeImageIndex: number
  startAnimation: () => void
  endAnimation: () => void
  onLoad?: () => void
}

export interface IImageListControllerRenderProps {
  startAnimation: () => void
  endAnimation: () => void
  animationStarted: boolean
  activeImageIndex: number
}

export interface IImageListControllerProps {
  imageSet: Array<ImageSetItem | null>
  children: (data: IImageListControllerRenderProps) => ReactNode
}

export interface IImageListControllerState {
  animationStarted: boolean
  activeImageIndex: number
}
