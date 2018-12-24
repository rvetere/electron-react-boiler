import { IInputTextProps } from '@core/solidForm/baseInputs/input/types'
import { ITextAreaProps } from '@core/solidForm/baseInputs/textArea/types'
import { FieldWithLimitType } from '.'

export interface IInputTextWithLimitProps extends IInputTextProps {
  limit: number
  type?: FieldWithLimitType
}

export interface ITextAreaWithLimitProps extends ITextAreaProps {
  limit: number
  type?: FieldWithLimitType
}

export interface IInputWithLimitState {
  isFocused: boolean
  valueLength: number
}
