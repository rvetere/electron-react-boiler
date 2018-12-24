import { IRadioProps } from '@core/solidForm/baseInputs/radioGroup/types'
import { LabelPosition } from '@core/solidForm/types'
import react from 'react'

export interface IRadioOptionProps extends react.InputHTMLAttributes<HTMLInputElement> {
  value: string
  inverted?: boolean
  radioProps: IRadioProps
  labelPosition?: LabelPosition
}
