import { PureComponent, ReactNode } from 'react'
import { IImageViewProps } from './types'

export class ImageView extends PureComponent<IImageViewProps> {
  public render(): ReactNode {
    const { isVisible, src, width, height, alt, onLoad, renderDimensionsAttributes } = this.props
    const sizer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAADUlEQVQIHWP4z/CfAQAF/wH/t3haYQAAAABJRU5ErkJggg=='

    return (
      <>
        {renderDimensionsAttributes ? (
          <img onLoad={onLoad} src={isVisible ? src : sizer} alt={alt} width={width} height={height} />
        ) : (
          <img onLoad={onLoad} src={isVisible ? src : sizer} alt={alt} />
        )}
        <noscript dangerouslySetInnerHTML={{ __html: `<img src="${src}" alt="${alt}" />` }} />
      </>
    )
  }
}
