import { IValidationDisplayConfig, IValidationMessage } from '@core/solidForm/elements/infoSlot/validationDisplay/types'
import { IFormControllerInputProps } from '@core/solidForm/formController/types'
import { ValidatorFn } from '@core/solidForm/validators/types'
import react, { ReactNode } from 'react'
import { Omit } from 'utility-types'

type HTMLSelectPropsWithoutValue = Omit<react.InputHTMLAttributes<HTMLSelectElement>, 'value'>
type HTMLSelectPropsWithoutOnChageAndValue = Omit<HTMLSelectPropsWithoutValue, 'onChange'>

export interface ISelectOption {
  label: string | JSX.Element
  value: string | number
  disabled?: boolean
  template?: ReactNode
  clearableValue?: boolean
}
export interface ISelectProps extends HTMLSelectPropsWithoutOnChageAndValue {
  name: string
  inputProps: IFormControllerInputProps
  validators?: ValidatorFn[]
  inverted?: boolean
  label?: ReactNode
  labelAppendix?: ReactNode
  options?: ISelectOption[]
  value?: ISelectOption | ISelectOption[]
  multi?: boolean
  multiCheckbox?: boolean
  native?: boolean
  validationMessage?: string | null
  // tslint:disable-next-line:no-any
  loadOptions?: (input?: string) => Promise<any>
  onChange?: (value: ISelectOption | ISelectOption[]) => void
  hideValidation?: boolean
  infoSlot?: (validationConfig: IValidationDisplayConfig) => ReactNode
}

export interface ISelectState {
  value?: ISelectOption | ISelectOption[]
  isValid: boolean
  isTouched: boolean
  validationMessages: IValidationMessage[]
}

export interface ISelectValidationPayload {
  value: ISelectOption
  validators: ValidatorFn[]
  inputRef: React.RefObject<HTMLInputElement>
}
