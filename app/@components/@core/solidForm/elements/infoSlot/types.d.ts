import { ReactNode } from 'react'
import { IValidationDisplayConfig, IValidationMessage } from './validationDisplay/types'

export interface IInfoSlotProps {
  id: string
  validationConfig: IValidationDisplayConfig
  validationMessages: IValidationMessage[]
  slotOverride?: (validationConfig: IValidationDisplayConfig) => ReactNode
}
