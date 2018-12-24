import { InputValue, ISelectOption } from '@core/solidForm'
import { ValidatorFn } from '@core/solidForm/validators/types'
import { ICheckboxProps } from '../checkbox/types'
import { IRadioGroupProps } from '../radioGroup/types'
import { ISelectProps } from '../select/types'
import { ITextAreaProps } from '../textArea/types'
import { IInputTextProps, IInputValidationPayload, IInputValidationResult } from './types'

export const applyValidators = (value: InputValue | ISelectOption[], validators: ValidatorFn[]): IInputValidationResult =>
  validators.reduce(
    (result: IInputValidationResult, validator: ValidatorFn): IInputValidationResult => {
      const { isValid, message } = validator(value)

      if (result.isValid !== false) {
        result.isValid = isValid
      }

      if (message && !isValid) {
        result.messages = [...result.messages, message]
      }

      return result
    },
    { isValid: true, messages: [] }
  )

export const getNativeValidation = ({ current }: React.RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): IInputValidationResult => {
  return {
    isValid: current ? current.validity.valid : true,
    messages:
      current && !current.validity.valid
        ? [
            {
              message: current.validationMessage
            }
          ]
        : []
  }
}

export const validateInput = ({ value, validators, inputRef }: IInputValidationPayload): IInputValidationResult => {
  const { messages, isValid } = validators ? applyValidators(value, validators) : { isValid: true, messages: [] }
  const { messages: nativeMessages, isValid: nativeIsValid } = inputRef ? getNativeValidation(inputRef) : { isValid: true, messages: [] }

  return {
    isValid: isValid && nativeIsValid,
    messages: [...messages, ...nativeMessages]
  }
}

export const hasValidation = (props: ICheckboxProps | IInputTextProps | IRadioGroupProps | ISelectProps | ITextAreaProps): boolean => {
  // @ts-ignore
  return props.required || (props.validators && props.validators.length > 0)
}
