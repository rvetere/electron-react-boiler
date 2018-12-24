import { IFormControllerInputProps } from '@core/solidForm/formController/types'
import { ValidatorFn } from '@core/solidForm/validators/types'
import { ReactNode, SyntheticEvent } from 'react'
import { ISelectOption } from '../types'

export interface ISelectPluginProps {
  name: string
  inputProps: IFormControllerInputProps
  validators?: ValidatorFn[]
  options?: ISelectOption[]
  value?: ISelectOption[] | string | number | undefined
  initialValue?: ISelectOption | ISelectOption[]
  onChange: (value: ISelectOption[]) => void
  onBlur: (event: SyntheticEvent) => void
  hasError?: boolean | null
  validationMessage?: string | null
  required?: boolean
  placeholder?: string
  describedById: string

  backspaceToRemoveMessage?: string
  multi?: boolean
  multiCheckbox?: boolean
  clearable?: boolean
  optionComponent?: ReactNode
  removeSelected?: boolean
  closeOnSelect?: boolean
  optionClassName?: string
  arrowRenderer?: ReactNode
  clearRenderer?: ReactNode
  noResultsText?: ReactNode
  loadingPlaceholder?: ReactNode
  // tslint:disable-next-line:no-any
  loadOptions?: (input?: string) => Promise<any>
}

export type IOptionsType<OptionType> = OptionType[]

export interface IGroupType<OptionType> {
  options: IOptionsType<OptionType>
  // tslint:disable-next-line:no-any
  [key: string]: any
}
