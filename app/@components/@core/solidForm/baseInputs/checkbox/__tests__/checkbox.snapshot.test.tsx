/* eslint-env jest */
import { getByClass } from '@testing/classQueries'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'
import { Checkbox } from '..'
import { getCheckboxMock } from '../../input/__tests__/__mocks__/input.mock'

describe('Checkbox', () => {
  afterEach(cleanup)
  const mockProps = getCheckboxMock()

  test('Checkbox component should render correctly', () => {
    const { container } = render(<Checkbox {...mockProps}>checkbox Label</Checkbox>)

    expect(container).toMatchSnapshot()
    expect(mockProps.inputProps.registerInput).toBeCalledTimes(1)
  })

  test('Checkbox should validate', async () => {
    const { container } = render(
      <Checkbox required {...mockProps}>
        checkbox Label
      </Checkbox>
    )

    const elem = container.querySelector('input')
    fireEvent.click(elem!)
    fireEvent.click(elem!)

    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))

    expect(validationDisplay).toBeTruthy()
    expect(mockProps.inputProps.updateForm).toBeCalledTimes(2)
  })
})
