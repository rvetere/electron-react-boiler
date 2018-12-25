import { InputValue } from '@core/solidForm'
import { InfoSlot } from '@core/solidForm/elements/infoSlot'
import { IFormControllerPayload } from '@core/solidForm/formController/types'
import { RequiredMsgDefault } from '@core/solidForm/validators'
import noop from '@helpers/noop'
import classNames from 'classnames'
// import { InputValue } from '@core/solidForm/types'
import React, { PureComponent, ReactNode } from 'react'
import { hasValidation, validateInput } from '../input/helpers'
import { IInputValidationResult } from '../input/types'
// import { validateInput } from '../input/helpers'
// import { IInputValidationResult } from '../input/types'
import { IRadioGroupProps, IRadioGroupState, IRadioProps } from './types'

// good to read: https://techblog.commercetools.com/seven-patterns-by-example-the-many-ways-to-type-radio-in-react-bfe14322bb6f
// https://github.com/chenglou/react-radio-group/blob/9a992f3bbc1bffeb1dc993e42b0f4842ab299f42/index.jsx

export class RadioGroup extends PureComponent<IRadioGroupProps, IRadioGroupState> {
  public readonly state: IRadioGroupState = {
    value: this.props.value || '',
    isValid: false,
    isTouched: false,
    validationMessages: []
  }

  private initialState: IRadioGroupState
  private stateUpdateAfterMount: IRadioGroupState

  public componentDidMount(): void {
    const {
      inputProps: { registerInput }
    } = this.props
    const { value } = this.state

    const { isValid, messages } = this.validate(value)
    const stateUpdate =
      this.stateUpdateAfterMount && this.stateUpdateAfterMount.isValid
        ? this.stateUpdateAfterMount
        : { ...this.stateUpdateAfterMount, isValid, validationMessages: messages }
    this.setState(stateUpdate, () => {
      registerInput(this.getPayload())
      this.initialState = this.state
    })
  }

  public componentWillUnmount(): void {
    const {
      inputProps: { deRegisterInput }
    } = this.props
    deRegisterInput(this.getPayload())
  }

  public render(): ReactNode {
    const { name, children, hideValidation = false, sideBySide = false, infoSlot } = this.props
    const { isValid, isTouched, validationMessages } = this.state
    const hasValidationRes = hasValidation(this.props)

    const describedById = `${name}ValidationMessage`

    const radioProps: IRadioProps = {
      updateRadioGroup: this.updateRadioGroup,
      initialValueRadioGroup: this.initialValueRadioGroup,
      name,
      radioGroupValue: this.state.value,
      sideBySide,
      describedById,
      hasError: !this.state.isValid && this.state.isTouched && !hideValidation
    }

    return (
      <div
        className={classNames('formField', {
          ['optional']: !hasValidationRes
        })}
      >
        {children(radioProps)}
        <InfoSlot
          id={describedById}
          slotOverride={infoSlot}
          validationConfig={{ isValid, isTouched, hideValidation, hasValidation: hasValidationRes }}
          validationMessages={validationMessages}
        />
      </div>
    )
  }

  public reset = (): void => {
    const {
      inputProps: { updateForm }
    } = this.props

    this.setState(this.initialState, () => updateForm(this.getPayload()))
  }

  private initialValueRadioGroup = (value: string): void => {
    this.stateUpdateAfterMount = { value, isValid: true, validationMessages: [], isTouched: false }
  }

  private updateRadioGroup = (value: string): void => {
    const {
      inputProps: { updateForm }
    } = this.props

    this.setState({ value, isValid: true, isTouched: true }, () => updateForm(this.getPayload()))
  }

  private getPayload = (): IFormControllerPayload => {
    const { name } = this.props
    const { value, isValid } = this.state

    return {
      isValid,
      value,
      name,
      reset: this.reset.bind(this),
      touch: this.touch.bind(this),
      focus: noop // TODO: implement :P
    }
  }

  private validate(value: InputValue): IInputValidationResult {
    const { validators = [] } = this.props
    let { isValid, messages } = validateInput({ validators, value })
    if (this.props.required && !value) {
      isValid = false
      messages = [...messages, { message: this.props.validationMessage || RequiredMsgDefault }]
    }
    return { isValid, messages }
  }

  private touch = (): void => {
    this.setState({ isTouched: true })
  }
}
