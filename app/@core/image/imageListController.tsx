import { IInterval } from '@helpers/types'
import { clearRequestInterval, requestInterval } from '@helpers/window'
import { PureComponent, ReactNode } from 'react'
import { IImageListControllerProps, IImageListControllerState } from './types'

export class ImageListController extends PureComponent<IImageListControllerProps, IImageListControllerState> {
  public readonly state: IImageListControllerState = {
    animationStarted: false,
    activeImageIndex: 0
  }

  private animationInterval: number = 1600
  private animationIntervalHandle: IInterval

  public render(): ReactNode {
    const { children } = this.props
    const { animationStarted, activeImageIndex } = this.state

    return children({
      animationStarted,
      activeImageIndex,
      startAnimation: this.startAnimation,
      endAnimation: this.endAnimation
    })
  }

  private endAnimation = (): void => {
    clearRequestInterval(this.animationIntervalHandle)
    this.setState({ activeImageIndex: 0, animationStarted: false })
  }

  private stepAnimation = (): void => {
    const nextIndex = this.state.activeImageIndex + 1
    const maxIndex = this.props.imageSet.length - 1

    const activeImageIndex = nextIndex > maxIndex ? 0 : nextIndex

    this.setState({ activeImageIndex })
  }

  private startAnimation = (): void => {
    clearRequestInterval(this.animationIntervalHandle)
    this.stepAnimation()
    this.animationIntervalHandle = requestInterval(this.stepAnimation, this.animationInterval)
    this.setState({ animationStarted: true })
  }
}
