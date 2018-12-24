import noop from '@helpers/noop'
import { IImageProps, IImageListViewProps, IImageViewProps } from '@core'
import LoadingCircle from '@core/loading/circle'

export const getImageMock = (p?: Partial<IImageProps>): IImageProps => ({
  ...getDefaultImageMock(),
  ...p
})

export const getImageListViewMock = (p?: Partial<IImageListViewProps>): IImageListViewProps => ({
  ...getDefaultImageListViewMock(),
  ...p
})

export const getImageViewMock = (p?: Partial<IImageViewProps>): IImageViewProps => ({
  ...getDefaultImageViewMock(),
  ...p
})

const getDefaultImageMock = (): IImageProps => ({
  src: 'https://static.digitecgalaxus.ch/Files/1/3/7/6/2/9/7/8/MSSurface_Jupiter.jpg?fit=inside%7C228:126&output-format=progressive-jpeg',
  alt: 'AltText',
  loadingSpinner: <LoadingCircle centered />,
  showImageSet: true,
  renderDimensionsAttributes: false
})

const getDefaultImageViewMock = (): IImageViewProps => ({
  src: 'https://static.digitecgalaxus.ch/Files/1/3/7/6/2/9/7/8/MSSurface_Jupiter.jpg?fit=inside%7C228:126&output-format=progressive-jpeg',
  alt: 'AltText',
  width: 300,
  height: 300,
  isVisible: true,
  renderDimensionsAttributes: true
})

const getDefaultImageListViewMock = (): IImageListViewProps => ({
  animationStarted: false,
  activeImageIndex: 0,
  startAnimation: noop,
  endAnimation: noop,
  width: 300,
  height: 300,
  isVisible: true,
  renderDimensionsAttributes: true,
  imageSet: [
    {
      source: 'https://static.digitecgalaxus.ch/Files/1/3/7/6/2/9/7/8/MSSurface_Jupiter.jpg?fit=inside%7C228:126&output-format=progressive-jpeg',
      alternateText: 'AltText'
    },
    {
      source:
        'https://static.digitecgalaxus.ch/Files/1/1/4/2/9/4/0/9/01_Thinkpad_E580_Hero_Front_Forward_Facing_Win10_screen_Black.jpg?fit=inside%7C227:126&output-format=progressive-jpeg',
      alternateText: 'AltText'
    }
  ]
})
