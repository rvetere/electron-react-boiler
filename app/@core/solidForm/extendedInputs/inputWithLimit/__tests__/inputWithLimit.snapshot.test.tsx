/* eslint-env jest */
import { getInputWithLimitMock } from '@core/solidForm/baseInputs/input/__tests__/__mocks__/input.mock'
import { containsUpperCase } from '@core/solidForm/validators'
import { getByClass } from '@testing/classQueries'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'
import { InputWithLimit } from '..'

describe('InputWithLimit', () => {
  afterEach(cleanup)
  const mockProps = getInputWithLimitMock()

  test('InputWithLimit component should render correctly', () => {
    const { container } = render(<InputWithLimit {...mockProps} limit={3} />)

    expect(container).toMatchSnapshot()
    expect(mockProps.inputProps.registerInput).toBeCalledTimes(1)
  })

  test('InputWithLimit should validate', async () => {
    const validators = [containsUpperCase]

    const { container } = render(<InputWithLimit {...mockProps} validators={validators} />)

    const elem = container.querySelector('input')
    fireEvent.blur(elem!)
    fireEvent.change(elem!, { target: { value: 'must fail' } })

    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))

    expect(validationDisplay).toBeTruthy()
    expect(mockProps.inputProps.updateForm).toBeCalledTimes(1)
  })

  test('InputWithLimit component must show limit indication', async () => {
    const { container } = render(<InputWithLimit {...mockProps} limit={3} />)

    const inputEl = container.querySelector('input')
    fireEvent.focus(inputEl!)
    fireEvent.change(inputEl!, { target: { value: 'to loong!' } })

    const limitReachedEl = await waitForElement(() => getByClass(container, 'limitReached'))
    expect(limitReachedEl).toBeTruthy()

    expect(container).toMatchSnapshot()
  })
})
