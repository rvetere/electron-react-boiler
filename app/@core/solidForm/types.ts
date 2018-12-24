import { InputValue } from '.'
import { IValidationMessage } from './elements/infoSlot/validationDisplay/types'

export enum LabelPosition {
  LabelLeft = 'LabelLeft',
  LabelRight = 'LabelRight'
}

export interface IInputDefaultState {
  value?: InputValue
  isValid: boolean
  isTouched: boolean
  validationMessages: IValidationMessage[]
}
