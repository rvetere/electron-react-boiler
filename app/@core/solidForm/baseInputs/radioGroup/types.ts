import { InputValue } from '@core/solidForm'
import { IValidationDisplayConfig } from '@core/solidForm/elements/infoSlot/validationDisplay/types'
import { IFormControllerInputProps } from '@core/solidForm/formController/types'
import { IInputDefaultState } from '@core/solidForm/types'
import { ValidatorFn } from '@core/solidForm/validators/types'
import react, { ReactNode } from 'react'

export interface IRadioGroupProps extends react.InputHTMLAttributes<HTMLInputElement> {
  name: string
  inputProps: IFormControllerInputProps
  validators?: ValidatorFn[]
  initialValue?: string
  validationMessage?: string | null
  children: (_: IRadioProps) => ReactNode
  hideValidation?: boolean
  infoSlot?: (validationConfig: IValidationDisplayConfig) => ReactNode
  sideBySide?: boolean
}

export type IRadioGroupState = IInputDefaultState

export interface IRadioProps {
  updateRadioGroup: (value: string, initialValue?: string) => void
  initialValueRadioGroup: (value: string) => void
  name: string
  radioGroupValue?: InputValue
  sideBySide: boolean
  hasError: boolean
  describedById: string
}
