/* eslint-env jest */
import { getInputProps } from '@core/solidForm/__tests__/__mocks__/solidForm.mock'
import { selectOptions } from '@misc/styleguide/solidForm/sample/helpers'
import React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'
import { SelectNative } from '..'
import { ISelectNativeProps } from '../types'

describe('SelectNative', () => {
  afterEach(cleanup)
  const inputProps = getInputProps()
  const mockProps: ISelectNativeProps = {
    setRef: React.createRef(),
    onChange: jest.fn(),
    onBlur: jest.fn(),
    hasError: false,
    inputProps,
    describedById: 'ariaDescribedBy',
    name: 'select'
  }

  test('SelectNative component should render correctly', () => {
    const { container } = render(<SelectNative {...mockProps} options={selectOptions} />)

    expect(container).toMatchSnapshot()
  })

  test('SelectNative must handle change', async () => {
    const { container } = render(<SelectNative {...mockProps} options={selectOptions} />)

    const elem = container.querySelector('select')
    fireEvent.change(elem!, { target: { value: undefined } })

    expect(mockProps.onChange).toBeCalledTimes(1)
  })
})
