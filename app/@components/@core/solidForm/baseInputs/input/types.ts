import { InputValue, ISelectOption } from '@core/solidForm'
import { IValidationDisplayConfig, IValidationMessage } from '@core/solidForm/elements/infoSlot/validationDisplay/types'
import { IFormControllerInputProps } from '@core/solidForm/formController/types'
import { IInputDefaultState } from '@core/solidForm/types'
import { ValidatorFn } from '@core/solidForm/validators/types'
import React, { ReactNode } from 'react'

export interface IInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  inputProps: IFormControllerInputProps
  validators?: ValidatorFn[]
  inverted?: boolean
  label?: ReactNode
  labelAppendix?: ReactNode
  hideValidation?: boolean
  infoSlot?: (validationConfig: IValidationDisplayConfig) => ReactNode
}

export type IInputTextState = IInputDefaultState

export interface IInputValidationPayload {
  value?: InputValue | ISelectOption[]
  validators?: ValidatorFn[]
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
}

export interface IInputValidationResult {
  isValid: boolean
  messages: IValidationMessage[]
}
