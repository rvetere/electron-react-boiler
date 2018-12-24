import { ReactNode } from 'react'
import { cleanup, render } from 'react-testing-library'
import { ImageListController } from '../imageListController'
import { IImageListControllerRenderProps } from '../types'
import { getImageListViewMock } from './__mocks__/Image.mock'

describe('ImageListController', () => {
  afterEach(cleanup)

  test('startAnimation updates animationStarted', () => {
    const imageListMock = getImageListViewMock()
    let startAnimationCalled = false

    render(
      <ImageListController imageSet={imageListMock.imageSet}>
        {({ animationStarted, startAnimation }: IImageListControllerRenderProps): ReactNode => {
          if (!startAnimationCalled) {
            startAnimationCalled = true
            startAnimation()
          } else {
            expect(animationStarted).toBeTruthy()
          }
          return null
        }}
      </ImageListController>
    )
  })

  test('endAnimation updates animationStarted and activeImageIndex', () => {
    const imageListMock = getImageListViewMock()
    let startAnimationCalled = false
    let endAnimationCalled = false

    render(
      <ImageListController imageSet={imageListMock.imageSet}>
        {({ endAnimation, startAnimation, activeImageIndex, animationStarted }: IImageListControllerRenderProps): ReactNode => {
          if (!startAnimationCalled) {
            startAnimationCalled = true
            startAnimation()
          } else if (!endAnimationCalled) {
            endAnimationCalled = true
            endAnimation()
          } else {
            expect(animationStarted).toBeFalsy()
            expect(activeImageIndex).toBe(0)
          }
          return null
        }}
      </ImageListController>
    )
  })
})
