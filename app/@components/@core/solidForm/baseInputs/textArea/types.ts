import { IValidationDisplayConfig } from '@core/solidForm/elements/infoSlot/validationDisplay/types'
import { IFormControllerInputProps } from '@core/solidForm/formController/types'
import { IInputDefaultState } from '@core/solidForm/types'
import { ValidatorFn } from '@core/solidForm/validators/types'
import React, { ReactNode } from 'react'

export interface ITextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  inputProps: IFormControllerInputProps
  validators?: ValidatorFn[]
  inverted?: boolean
  label?: ReactNode
  labelAppendix?: ReactNode
  hideValidation?: boolean
  infoSlot?: (validationConfig: IValidationDisplayConfig) => ReactNode
}

export type ITextAreaState = IInputDefaultState
