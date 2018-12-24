import { cleanup, render } from 'react-testing-library'
import { Image } from '../image'
import { getImageMock } from './__mocks__/Image.mock'

describe('Image', () => {
  afterEach(cleanup)

  test('Image renders correctly', () => {
    const imageMock = getImageMock()
    const { container } = render(<Image {...imageMock} />)

    expect(container).toMatchSnapshot()
  })
})
