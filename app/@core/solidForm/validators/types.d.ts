import { ReactNode } from 'react'
import { InputValue } from '..'
import { ISelectOption } from '../baseInputs/select/types'
import { IValidationMessage } from '../elements/infoSlot/validationDisplay/types'

export interface IValidatorResult {
  message?: IValidationMessage
  isValid: boolean
}

export type ValidatorFn = (value: InputValue | ISelectOption[]) => IValidatorResult
