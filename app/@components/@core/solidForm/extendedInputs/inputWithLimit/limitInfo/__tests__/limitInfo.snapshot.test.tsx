/* eslint-env jest */
import { cleanup, render } from 'react-testing-library'
import { LimitInfo } from '..'
import { ILimitInfoProps } from '../types'

describe('LimitInfo', () => {
  afterEach(cleanup)
  const mockProps: ILimitInfoProps = {
    limit: 3,
    valueLength: 5
  }

  test('LimitInfo component should render correctly', () => {
    const { container } = render(<LimitInfo {...mockProps} />)

    expect(container).toMatchSnapshot()
  })
})
