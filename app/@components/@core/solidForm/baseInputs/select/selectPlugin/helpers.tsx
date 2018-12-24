import { ChevronDown, ChevronUp, Close } from '@core/image/icon'
import { ISelectOption } from '../types'

export const ArrowRenderer = ({ isOpen }: { isOpen: boolean }): JSX.Element => {
  if (isOpen) {
    return <ChevronUp />
  }

  return <ChevronDown />
}

export const ClearRenderer = (): JSX.Element => <Close />

export const unClearableOptions = (options?: ISelectOption[]): ISelectOption[] => {
  if (!options) {
    return []
  }

  return options.map(
    (option: ISelectOption): ISelectOption => ({
      ...option,
      clearableValue: false
    })
  )
}
