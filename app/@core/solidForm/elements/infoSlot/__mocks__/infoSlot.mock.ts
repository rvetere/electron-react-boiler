import { IInfoSlotProps } from '../types'

export const validationMessage = 'a validation message'
export const getInfoSlotMock = (p?: Partial<IInfoSlotProps>): IInfoSlotProps => ({
  ...{
    id: 'ariaDescribedBy',
    validationConfig: {
      hasValidation: true,
      isValid: false,
      isTouched: true
    },
    validationMessages: [
      {
        message: validationMessage
      }
    ]
  },
  ...p
})
