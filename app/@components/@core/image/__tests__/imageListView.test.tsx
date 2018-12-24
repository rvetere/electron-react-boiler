import { cleanup, fireEvent, render } from 'react-testing-library'
import { ImageListView } from '../imageListView'
import { getImageListViewMock } from './__mocks__/Image.mock'

jest.mock('@helpers/isMobileSafari', () => jest.fn().mockReturnValue(true))

describe('ImageListView', () => {
  afterEach(cleanup)

  test('mouseover event works', () => {
    const startAnimation = jest.fn()
    const imageListPropsMock = getImageListViewMock({ startAnimation })
    const { container, unmount } = render(<ImageListView {...imageListPropsMock} />)

    fireEvent.mouseOver(container)
    expect(startAnimation).toBeCalledTimes(1)

    unmount()

    fireEvent.mouseOver(container)
    expect(startAnimation).toBeCalledTimes(1)
  })

  test('mouseleave works', () => {
    const endAnimation = jest.fn()
    const imageListPropsMock = getImageListViewMock({ endAnimation })
    const { container, unmount } = render(<ImageListView {...imageListPropsMock} />)

    fireEvent.mouseLeave(container)
    expect(endAnimation).toBeCalledTimes(1)

    unmount()

    fireEvent.mouseLeave(container)
    expect(endAnimation).toBeCalledTimes(1)
  })

  test('touchstart works', () => {
    const startAnimation = jest.fn()
    const imageListPropsMock = getImageListViewMock({ startAnimation })
    const { container, unmount } = render(<ImageListView {...imageListPropsMock} />)

    fireEvent.touchStart(container)
    expect(startAnimation).toBeCalledTimes(1)

    unmount()

    fireEvent.touchStart(container)
    expect(startAnimation).toBeCalledTimes(1)
  })

  test('touchend works', () => {
    const endAnimation = jest.fn()
    const imageListPropsMock = getImageListViewMock({ endAnimation })
    const { container, unmount } = render(<ImageListView {...imageListPropsMock} />)

    fireEvent.touchEnd(container)
    expect(endAnimation).toBeCalledTimes(1)

    unmount()

    fireEvent.touchEnd(container)
    expect(endAnimation).toBeCalledTimes(1)
  })

  test('touchcancel works', () => {
    const endAnimation = jest.fn()
    const imageListPropsMock = getImageListViewMock({ endAnimation })
    const { container, unmount } = render(<ImageListView {...imageListPropsMock} />)

    fireEvent.touchCancel(container)
    expect(endAnimation).toBeCalledTimes(1)

    unmount()

    fireEvent.touchCancel(container)
    expect(endAnimation).toBeCalledTimes(1)
  })

  test('imageListView renders correctly', () => {
    const imageListPropsMock = getImageListViewMock()
    const { container } = render(<ImageListView {...imageListPropsMock} />)

    expect(container).toMatchSnapshot()
  })

  test("imageListView shouldn't render when empty imageSet", () => {
    const imageListPropsMock = getImageListViewMock({ imageSet: [] })
    const { container } = render(<ImageListView {...imageListPropsMock} />)

    expect(container.firstChild).toBeNull()
  })
})
