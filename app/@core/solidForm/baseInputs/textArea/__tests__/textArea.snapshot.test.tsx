/* eslint-env jest */
import { getInputProps } from '@core/solidForm/__tests__/__mocks__/solidForm.mock'
import { containsUpperCase } from '@core/solidForm/validators'
import { getByClass } from '@testing/classQueries'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'
import { TextArea } from '..'

describe('TextArea', () => {
  afterEach(cleanup)
  const inputProps = getInputProps()
  const mockProps = {
    inputProps,
    name: 'username',
    label: 'Username'
  }

  test('TextArea component should render correctly', () => {
    const { container } = render(<TextArea {...mockProps} />)

    expect(container).toMatchSnapshot()
    expect(mockProps.inputProps.registerInput).toBeCalledTimes(1)
  })

  test('TextArea should validate', async () => {
    const validators = [containsUpperCase]

    const { container } = render(<TextArea {...mockProps} validators={validators} />)

    const elem = container.querySelector('textarea')
    fireEvent.blur(elem!)
    fireEvent.change(elem!, { target: { value: 'must fail' } })

    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))

    expect(validationDisplay).toBeTruthy()
    expect(mockProps.inputProps.updateForm).toBeCalledTimes(1)
  })
})
