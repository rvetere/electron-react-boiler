import { ReactNode } from 'react'

export interface IValidationMessage {
  message: string
  interpolations?: ReactNode[]
}

export interface IValidationDisplayConfig {
  isValid: boolean
  isTouched: boolean
  hasValidation: boolean
  hideValidation?: boolean
}

export interface IValidationDisplayProps {
  config: IValidationDisplayConfig
  messages: IValidationMessage[]
}
