import { IFormControllerInputProps } from '@core/solidForm/formController/types'
import { ValidatorFn } from '@core/solidForm/validators/types'
import react, { RefObject } from 'react'
import { Omit } from 'utility-types'
import { SelectPlugin } from '../selectPlugin'
import { ISelectOption } from '../types'

type HTMLSelectPropsWithoutOnChange = Omit<react.InputHTMLAttributes<HTMLSelectElement>, 'onChange'>

export interface ISelectNativeProps extends HTMLSelectPropsWithoutOnChange {
  name: string
  inputProps: IFormControllerInputProps
  validators?: ValidatorFn[]
  options?: ISelectOption[]
  onChange: (value: ISelectOption[]) => void
  setRef: RefObject<HTMLSelectElement | SelectPlugin>
  hasError?: boolean | null
  describedById: string
}
