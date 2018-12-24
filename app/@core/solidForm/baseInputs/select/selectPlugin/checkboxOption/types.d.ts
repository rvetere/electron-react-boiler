import { ISelectOption } from '@core/solidForm'
import { SyntheticEvent } from 'react'

export interface ICheckboxOptionProps {
  isSelected: boolean
  isFocused: boolean
  className: string
  option: ISelectOption
  removeValue: (option: ISelectOption) => void
  onSelect: (option: ISelectOption, event: SyntheticEvent<HTMLElement>) => void
  onFocus: (option: ISelectOption, event: SyntheticEvent<HTMLElement>) => void
}
