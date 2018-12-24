import { IValidationDisplayConfig, IValidationMessage } from '@core/solidForm/elements/infoSlot/validationDisplay/types'
import { IFormControllerInputProps } from '@core/solidForm/formController/types'
import { LabelPosition } from '@core/solidForm/types'
import react, { ReactNode } from 'react'

export interface ICheckboxProps extends react.InputHTMLAttributes<HTMLInputElement> {
  name: string
  inverted?: boolean
  labelPosition?: LabelPosition
  inputProps: IFormControllerInputProps
  value?: never
  hideValidation?: boolean
  infoSlot?: (validationConfig: IValidationDisplayConfig) => ReactNode
}

export interface ICheckboxState {
  isChecked?: boolean
  isValid: boolean
  isTouched: boolean
  validationMessages: IValidationMessage[]
}
