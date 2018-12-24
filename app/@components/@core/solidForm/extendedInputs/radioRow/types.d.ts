import { IRadioProps } from '@core/solidForm/baseInputs/radioGroup/types'
import { DeliveryOptionBlockEdit } from '@graphql/types/generated'
import { ReactNode } from 'react'

export interface IRadioRowProps {
  optionName: string
  optionValue: string
  optionDetail?: ReactNode | null
  disabled: boolean
  radioProps: IRadioProps
  checked?: boolean
}
