import { InputText, TextArea } from '@core/solidForm'
import { IInputTextProps } from '@core/solidForm/baseInputs/input/types'
import { ITextAreaProps } from '@core/solidForm/baseInputs/textArea/types'
import { IValidationDisplayConfig } from '@core/solidForm/elements/infoSlot/validationDisplay/types'
import { IValidatorResult } from '@core/solidForm/validators/types'
import { PureComponent, ReactNode } from 'react'
import { LimitInfo } from './limitInfo'
import { IInputTextWithLimitProps, IInputWithLimitState, ITextAreaWithLimitProps } from './types'

export enum FieldWithLimitType {
  InputText = 'InputText',
  TextArea = 'TextArea'
}

export class InputWithLimit extends PureComponent<IInputTextWithLimitProps | ITextAreaWithLimitProps, IInputWithLimitState> {
  public readonly state: IInputWithLimitState = {
    isFocused: this.props.autoFocus || false,
    valueLength: ((this.props.value as string) || '').length
  }

  public render(): ReactNode {
    const { limit, validators = [], ...restPorps } = this.props
    const { isFocused, valueLength } = this.state

    return this.renderComponent({
      ...restPorps,
      validators: [...validators, this.limitValidation],
      hideValidation: isFocused && valueLength > limit,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus
    })
  }

  private renderComponent = (inputProps: IInputTextProps | ITextAreaProps): ReactNode => {
    const { type = FieldWithLimitType.InputText } = this.props

    switch (type) {
      case FieldWithLimitType.InputText:
        return <InputText {...inputProps as IInputTextProps} infoSlot={this.renderInfoSlot} />

      case FieldWithLimitType.TextArea:
        return <TextArea {...inputProps as ITextAreaProps} infoSlot={this.renderInfoSlot} />
    }
  }

  private renderInfoSlot = ({ isTouched }: IValidationDisplayConfig): ReactNode => {
    const { isFocused, valueLength } = this.state
    if (isFocused && (!isTouched || valueLength >= 0)) {
      return <LimitInfo limit={this.props.limit} valueLength={valueLength} />
    }
    return null
  }

  private limitValidation = (value: string): IValidatorResult => {
    const { limit, name } = this.props
    return {
      isValid: value.length <= limit,
      message: { message: '[0] cannot be longer than [1] characters', interpolations: [name, limit] }
    }
  }

  private handleFocus = (): void => {
    this.setState({ isFocused: true })
  }

  private handleBlur = (): void => {
    this.setState({ isFocused: false })
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = e.target.value as string
    this.setState({ valueLength: value.length })
  }
}
