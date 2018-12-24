import { ReactNode } from 'react'
import { ISelectOption } from '../baseInputs/select/types'

export interface IFormControllerProps {
  className?: string
  hideWrappingFormTag?: boolean
  children: (actions: IFormControllerActions) => ReactNode
  // tslint:disable-next-line:no-any
  onSubmit?: (values: IFormValues, resetForm: FormResetFn) => Promise<any> | any
  onInvalid?: () => void
  onUpdate?: (values: IFormValues) => void
  onReset?: () => void
}

export type FieldValue = string[] | string | number | boolean | ISelectOption | ISelectOption[]

export interface IFormControllerState {
  fields: IFormControllerFields
  isLoading: boolean
}

export interface IFormValues {
  [name: string]: FieldValue
}

export interface IFormControllerFields {
  [name: string]: IFormControllerField
}

export type FormSubmitFn = () => void

export type FormResetFn = () => void

export interface IFormControllerActions {
  inputProps: IFormControllerInputProps
  submitForm: FormSubmitFn
  resetForm: FormResetFn
  formState: IFormControllerState
}

export interface IFormControllerInputProps {
  updateForm: (payload: IFormControllerPayload) => void
  registerInput: (payload: IFormControllerPayload) => void
  deRegisterInput: (payload: IFormControllerPayload) => void
}

export interface IFormControllerField {
  isValid: boolean
  value?: FieldValue
  reset: () => void
  touch: () => void
  focus: () => void
}

export interface IFormControllerPayload extends IFormControllerField {
  name: string
}

export type CurryUpdateState = ((field: IFormControllerState) => Pick<IFormControllerState, 'fields'>)
