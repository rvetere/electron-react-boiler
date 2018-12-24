/* eslint-env jest */
import { getInputProps } from '@core/solidForm/__tests__/__mocks__/solidForm.mock'
import { selectOptions } from '@misc/styleguide/solidForm/sample/helpers'
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { SelectPlugin } from '..'
import { ISelectPluginProps } from '../types'

describe('SelectPlugin', () => {
  afterEach(cleanup)
  const inputProps = getInputProps()
  const mockProps: ISelectPluginProps = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    inputProps,
    hasError: false,
    describedById: 'ariaDescribedBy',
    name: 'select'
  }

  test('SelectPlugin component should render correctly', () => {
    const { container } = render(<SelectPlugin {...mockProps} options={selectOptions} />)

    expect(container).toMatchSnapshot()
  })
})
