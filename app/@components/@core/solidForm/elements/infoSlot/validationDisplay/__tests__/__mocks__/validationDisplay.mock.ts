import { IValidationDisplayProps } from '../../types'

export const validationMessage = 'a validation message'
export const getValidationDisplayMock = (p?: Partial<IValidationDisplayProps>): IValidationDisplayProps => ({
  ...{
    config: {
      isValid: false,
      isTouched: false,
      hasValidation: true
    },
    messages: [{ message: validationMessage }]
  },
  ...p
})
