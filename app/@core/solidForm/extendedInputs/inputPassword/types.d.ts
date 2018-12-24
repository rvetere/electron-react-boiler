import { IInputTextProps } from '@core/solidForm/baseInputs/input/types'

export type IInputPasswordProps = IInputTextProps & {
  hideToggle?: boolean
}

export interface IInputPasswordState {
  isVisible: boolean
}
