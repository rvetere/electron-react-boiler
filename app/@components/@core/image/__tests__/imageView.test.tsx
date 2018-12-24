import { cleanup, fireEvent, render } from 'react-testing-library'
import { ImageView } from '../imageView'
import { getImageViewMock } from './__mocks__/Image.mock'

describe('ImageView', () => {
  afterEach(cleanup)

  test('ImageView renders correctly', () => {
    const imageListPropsMock = getImageViewMock()
    const { container } = render(<ImageView {...imageListPropsMock} />)

    expect(container).toMatchSnapshot()
  })

  test('sizer renders correctly', () => {
    const imageListPropsMock = getImageViewMock({ isVisible: false })
    const { container } = render(<ImageView {...imageListPropsMock} />)

    expect(container).toMatchSnapshot()
  })

  test('dimensions attributes are rendered', () => {
    const imageListPropsMock = getImageViewMock({
      renderDimensionsAttributes: true,
      width: 400,
      height: 400
    })
    const { container } = render(<ImageView {...imageListPropsMock} />)
    const img = container.querySelector('img')!

    expect(img.getAttribute('width')).toBe('400')
    expect(img.getAttribute('height')).toBe('400')
  })

  test('img calls onLoad function', () => {
    const onLoad = jest.fn()
    const imageListPropsMock = getImageViewMock({ onLoad })
    const { container } = render(<ImageView {...imageListPropsMock} />)
    const img = container.querySelector('img')!

    fireEvent.load(img)

    expect(onLoad).toBeCalled()
  })
})
