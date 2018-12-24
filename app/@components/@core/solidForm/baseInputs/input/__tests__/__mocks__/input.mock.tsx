import { IInputTextProps } from '../../types'
import { getInputProps, getInputPropsOverrideRegisterInput } from '@core/solidForm/__tests__/__mocks__/solidForm.mock'
import { IFormControllerPayload } from '@core/solidForm/formController/types'
import { IInputTextWithLimitProps } from '@core/solidForm/extendedInputs/inputWithLimit/types'
import { ICheckboxProps } from '@core/solidForm/baseInputs/checkbox/types'

const inputProps = getInputProps()

export const getInputMock = (p?: Partial<IInputTextProps>): IInputTextProps => ({
  ...getDefaultInputMock(),
  ...p
})

export const getCheckboxMock = (p?: Partial<ICheckboxProps>): ICheckboxProps => ({
  ...{
    inputProps,
    name: 'checkbox'
  },
  ...p
})

export const getInputWithLimitMock = (p?: Partial<IInputTextWithLimitProps>): IInputTextWithLimitProps => ({
  ...{
    inputProps,
    limit: 3,
    name: 'withLimit',
    label: 'With Limit'
  },
  ...p
})

export const getInputResetMock = (registerInput: (payload: IFormControllerPayload) => void, p?: Partial<IInputTextProps>): IInputTextProps => ({
  ...{
    inputProps: getInputPropsOverrideRegisterInput(registerInput),
    name: 'input',
    label: 'Input'
  },
  ...p
})

const getDefaultInputMock = (): IInputTextProps => ({
  inputProps,
  name: 'input',
  label: 'Input'
})
