import { ReactNode } from 'react'
import { cleanup, render } from 'react-testing-library'
import { ImageController, setSrcByDimensions } from '../imageController'
import { IImageControllerRenderProps } from '../types'
import { getImageViewMock } from './__mocks__/Image.mock'

describe('ImageController', () => {
  afterEach(cleanup)
  const src = getImageViewMock().src

  test('onLoad gets called', async () => {
    const mockOnLoad = jest.fn()

    render(
      <ImageController src={src} onLoad={mockOnLoad}>
        {({ onLoad }: IImageControllerRenderProps): ReactNode => {
          onLoad()
          return null
        }}
      </ImageController>
    )

    expect(mockOnLoad).toBeCalled()
  })

  test('unobserve callback gets called when intersecting', async () => {
    const unobserve = jest.fn()

    render(
      <ImageController src={src}>
        {({ onIntersection }: IImageControllerRenderProps): ReactNode => {
          const intersectionObserverEntry = { isIntersecting: true }
          onIntersection(intersectionObserverEntry as IntersectionObserverEntry, unobserve)
          return null
        }}
      </ImageController>
    )

    expect(unobserve).toBeCalledTimes(1)
  })

  test('unobserve callback gets new state', async () => {
    const unobserve = jest.fn()
    const expected = {
      width: 400,
      height: 400,
      isVisible: true
    }

    render(
      <ImageController width={400} height={400} src={src}>
        {({ onIntersection }: IImageControllerRenderProps): ReactNode => {
          const intersectionObserverEntry = { isIntersecting: true }
          onIntersection(intersectionObserverEntry as IntersectionObserverEntry, unobserve)
          return null
        }}
      </ImageController>
    )

    expect(unobserve).toBeCalledWith(expected)
  })

  test('dimensions of url are correctly increased', () => {
    const image = 'someImage?fit=inside|333:333&output-format=progressive-jpeg'
    const imageExpected = 'someImage?fit=inside%7C666:666&output-format=progressive-jpeg'
    expect(setSrcByDimensions(image, 666, 666)).toBe(imageExpected)
  })

  test('dimensions of url are correctly decreased', () => {
    const image = 'someImage?fit=inside|533:533&output-format=progressive-jpeg'
    const imageExpected = 'someImage?fit=inside%7C333:333&output-format=progressive-jpeg'
    expect(setSrcByDimensions(image, 333, 333)).toBe(imageExpected)
  })

  test('url without output format is returend correctly', () => {
    const image = 'someImage?fit=inside|333:333'
    const imageExpected = 'someImage?fit=inside%7C333:333&output-format=progressive-jpeg'
    expect(setSrcByDimensions(image, 333, 333)).toBe(imageExpected)
  })

  test('url with encoded pipe symbol is returend correctly', () => {
    const image = 'someImage?fit=inside%7C333:533'
    const imageExpected = 'someImage?fit=inside%7C333:333&output-format=progressive-jpeg'
    expect(setSrcByDimensions(image, 333, 333)).toBe(imageExpected)
  })

  test('url with encoded ampersands is returend correctly', () => {
    const image = 'someImage?fit=inside%7C333:533&amp;output-format=progressive-jpeg'
    const imageExpected = 'someImage?fit=inside%7C333:333&output-format=progressive-jpeg'
    expect(setSrcByDimensions(image, 333, 333)).toBe(imageExpected)
  })

  test('url with png gets correct format', () => {
    const image = 'someImage.png?fit=inside%7C333:533&amp;output-format=progressive-jpeg'
    const imageExpected = 'someImage.png?fit=inside%7C333:333&output-format=png'
    expect(setSrcByDimensions(image, 333, 333)).toBe(imageExpected)
  })

  test('url with gif gets correct format', () => {
    const image = 'someImage.gif?fit=inside%7C333:533&amp;output-format=progressive-jpeg'
    const imageExpected = 'someImage.gif?fit=inside%7C333:333&output-format=gif'
    expect(setSrcByDimensions(image, 333, 333)).toBe(imageExpected)
  })
})
