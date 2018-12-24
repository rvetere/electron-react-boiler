import LoadingCircle from '@core/loading/circle'
import Observer from '@researchgate/react-intersection-observer'
import React, { PureComponent, ReactNode } from 'react'
import { ImageController } from './imageController'
import { ImageListController } from './imageListController'
import { ImageListView } from './imageListView'
import { ImageView } from './imageView'
import { IImageControllerRenderProps, IImageListControllerRenderProps, IImageProps } from './types'

export class Image extends PureComponent<IImageProps> {
  public render(): ReactNode {
    const {
      alt,
      src,
      imageSet,
      onLoad,
      width,
      height,
      loadingSpinner = <LoadingCircle centered />,
      showImageSet = true,
      renderDimensionsAttributes = false
    } = this.props

    return (
      <ImageController src={src} onLoad={onLoad} width={width} height={height}>
        {(data: IImageControllerRenderProps): ReactNode => (
          <Observer onChange={data.onIntersection}>
            <span>
              {!data.isVisible && loadingSpinner}

              {showImageSet && imageSet && imageSet.length > 1 ? (
                <ImageListController imageSet={imageSet}>
                  {({ startAnimation, activeImageIndex, animationStarted, endAnimation }: IImageListControllerRenderProps): ReactNode => (
                    <ImageListView
                      animationStarted={animationStarted}
                      activeImageIndex={activeImageIndex}
                      startAnimation={startAnimation}
                      endAnimation={endAnimation}
                      onLoad={data.onLoad}
                      renderDimensionsAttributes={renderDimensionsAttributes}
                      width={data.width}
                      height={data.height}
                      isVisible={data.isVisible}
                      imageSet={imageSet}
                    />
                  )}
                </ImageListController>
              ) : (
                <ImageView
                  onLoad={data.onLoad}
                  isVisible={data.isVisible}
                  src={data.src}
                  width={data.width}
                  height={data.height}
                  alt={alt}
                  renderDimensionsAttributes={renderDimensionsAttributes}
                />
              )}
            </span>
          </Observer>
        )}
      </ImageController>
    )
  }
}
