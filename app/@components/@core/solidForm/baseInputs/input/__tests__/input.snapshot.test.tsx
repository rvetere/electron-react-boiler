/* eslint-env jest */
import { containsUpperCase } from '@core/solidForm/validators'
import { getByClass } from '@testing/classQueries'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'
import { InputText } from '..'
import { getInputMock } from './__mocks__/input.mock'

describe('InputText', () => {
  afterEach(cleanup)
  const mockProps = getInputMock()

  test('InputText component should render correctly', () => {
    const { container } = render(<InputText {...mockProps} />)

    expect(container).toMatchSnapshot()
    expect(mockProps.inputProps.registerInput).toBeCalledTimes(1)
  })

  test('InputText should validate', async () => {
    const validators = [containsUpperCase]

    const { container } = render(<InputText {...mockProps} validators={validators} />)

    const elem = container.querySelector('input')
    fireEvent.blur(elem!)
    fireEvent.change(elem!, { target: { value: 'must fail' } })

    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))

    expect(validationDisplay).toBeTruthy()
    expect(mockProps.inputProps.updateForm).toBeCalledTimes(1)
  })
})
