import isPostalCode from './helpers/isPostalCode'
import { IValidatorResult } from './types'

export const RequiredMsgDefault = 'Required'

export const longerThan5 = (value: string): IValidatorResult => ({
  isValid: value.length > 5,
  message: { message: 'More than 5 characters' }
})

export const containsUpperCase = (value: string): IValidatorResult => ({
  isValid: /[A-Z]/.test(value),
  message: { message: 'Min 1 UpperCase' }
})

export const isZip = (value: string): IValidatorResult => ({
  isValid: isPostalCode(value),
  message: { message: 'Invalid zip' }
})
