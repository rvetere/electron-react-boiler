/* eslint-env jest */
import { getInputProps } from '@core/solidForm/__tests__/__mocks__/solidForm.mock'
import { selectOptions } from '@misc/styleguide/solidForm/sample/helpers'
import { getByClass } from '@testing/classQueries'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'
import { Select } from '..'
import { ISelectProps } from '../types'

describe('Select', () => {
  afterEach(cleanup)
  const inputProps = getInputProps()
  const mockProps: ISelectProps = {
    inputProps,
    name: 'select',
    label: 'Select'
  }

  test('Select component should render correctly', () => {
    const { container } = render(<Select {...mockProps} options={selectOptions} />)

    expect(container).toMatchSnapshot()
    expect(mockProps.inputProps.registerInput).toBeCalledTimes(1)
  })

  test('Select should validate', async () => {
    const { container } = render(<Select {...mockProps} required options={selectOptions} />)

    const elem = container.querySelector('select')
    fireEvent.blur(elem!)
    fireEvent.change(elem!, { target: { value: undefined } })

    const validationDisplay = await waitForElement(() => getByClass(container, 'validationMessage'))

    expect(validationDisplay).toBeTruthy()
    expect(mockProps.inputProps.updateForm).toBeCalledTimes(1)
  })
})
