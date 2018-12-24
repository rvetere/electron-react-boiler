/* eslint-env jest */
import { getInputMock } from '@core/solidForm/baseInputs/input/__tests__/__mocks__/input.mock'
import { containsUpperCase } from '@core/solidForm/validators'
import { getByClass } from '@testing/classQueries'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'
import { InputPassword } from '..'

describe('InputPassword', () => {
  afterEach(cleanup)
  const mockProps = getInputMock()

  test('InputPassword component should render correctly', () => {
    const { container } = render(<InputPassword {...mockProps} />)

    expect(container).toMatchSnapshot()
    expect(mockProps.inputProps.registerInput).toBeCalledTimes(1)
  })

  test('InputPassword should validate', async () => {
    const validators = [containsUpperCase]

    const { container } = render(<InputPassword {...mockProps} validators={validators} />)

    const elem = container.querySelector('input')
    fireEvent.blur(elem!)
    fireEvent.change(elem!, { target: { value: 'must fail' } })

    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))

    expect(validationDisplay).toBeTruthy()
    expect(mockProps.inputProps.updateForm).toBeCalledTimes(1)
  })

  test('InputPassword component must reveal password on eye click', async () => {
    const { container } = render(<InputPassword {...mockProps} />)

    const eye = await waitForElement(() => getByClass(container, 'eye'))
    expect(eye).toBeTruthy()

    const buttonEl = container.querySelector('button')
    fireEvent.mouseDown(buttonEl!)
    expect(container).toMatchSnapshot()
  })
})
