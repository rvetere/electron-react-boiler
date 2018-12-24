/* eslint-env jest */
import { getInputProps } from '@core/solidForm/__tests__/__mocks__/solidForm.mock'
import { ReactNode } from 'react'
import { cleanup, render } from 'react-testing-library'
import { RadioGroup } from '..'
import { RadioOption } from '../radio'
import { IRadioProps } from '../types'

describe('RadioGroup', () => {
  afterEach(cleanup)

  test('RadioGroup component should render correctly', () => {
    const inputProps = getInputProps()
    const checkedMock = jest.fn()
    const { container } = render(
      <RadioGroup name="radioGroup" inputProps={inputProps}>
        {(radioProps: IRadioProps): ReactNode => {
          checkedMock(radioProps.radioGroupValue)
          return (
            <>
              <RadioOption disabled value="test1" radioProps={radioProps}>
                test 1 Label
              </RadioOption>
              <RadioOption checked value="test2" radioProps={radioProps}>
                test 2 Label
              </RadioOption>
            </>
          )
        }}
      </RadioGroup>
    )

    expect(checkedMock).toBeCalledTimes(2)
    expect(checkedMock).toBeCalledWith('test2')

    expect(container).toMatchSnapshot()
    expect(inputProps.registerInput).toBeCalledTimes(1)
  })
})
