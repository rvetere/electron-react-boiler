import { setSrcByDimensions } from '@core/image/imageController'
import { ImageView } from '@core/image/imageView'
import { ImageSetItem } from '@graphql/types/generated'
import isMobileSafari from '@helpers/isMobileSafari'
import classNames from 'classnames'
import { createRef, PureComponent, ReactNode, RefObject } from 'react'
import styles from './imageListView.css'
import { IImageListViewProps } from './types'

export class ImageListView extends PureComponent<IImageListViewProps> {
  public listRef: RefObject<HTMLUListElement> = createRef()
  public animationTriggerElement: Element | null

  public componentDidMount(): void {
    const listElement = this.listRef.current
    const closestElementStr = isMobileSafari() ? 'div' : 'article'
    const animationTriggerElement = listElement && listElement.closest ? listElement.closest(closestElementStr) : null

    if (listElement && animationTriggerElement) {
      const { startAnimation, endAnimation } = this.props

      this.animationTriggerElement = animationTriggerElement

      animationTriggerElement.addEventListener('mouseover', startAnimation)
      animationTriggerElement.addEventListener('touchstart', startAnimation)

      animationTriggerElement.addEventListener('mouseleave', endAnimation)
      animationTriggerElement.addEventListener('touchend', endAnimation)
      animationTriggerElement.addEventListener('touchcancel', endAnimation)
    }
  }

  public componentWillUnmount(): void {
    if (this.animationTriggerElement) {
      const { startAnimation, endAnimation } = this.props

      this.animationTriggerElement.removeEventListener('mouseover', startAnimation)
      this.animationTriggerElement.removeEventListener('touchstart', startAnimation)

      this.animationTriggerElement.removeEventListener('mouseleave', endAnimation)
      this.animationTriggerElement.removeEventListener('touchend', endAnimation)
      this.animationTriggerElement.removeEventListener('touchcancel', endAnimation)
    }
  }

  public render(): ReactNode {
    const { onLoad, animationStarted, activeImageIndex, imageSet = [], isVisible, width, height, renderDimensionsAttributes } = this.props

    if (!imageSet.length) {
      return null
    }

    return (
      <ul ref={this.listRef} className={styles.imageList}>
        {imageSet.map((imageSetItem: ImageSetItem, index: number) => (
          <li
            key={index}
            className={classNames({
              [styles.showImage]: index === activeImageIndex
            })}
          >
            {(animationStarted || index === 0) && (
              <ImageView
                onLoad={onLoad}
                isVisible={isVisible}
                src={setSrcByDimensions(imageSetItem.source, width, height, true)}
                width={width}
                height={height}
                alt={imageSetItem.alternateText || ''}
                renderDimensionsAttributes={renderDimensionsAttributes}
              />
            )}
          </li>
        ))}
      </ul>
    )
  }
}
