import { InputValue } from '@core/solidForm'
import { InfoSlot } from '@core/solidForm/elements/infoSlot'
import { Label } from '@core/solidForm/elements/label'
import { IFormControllerPayload } from '@core/solidForm/formController/types'
import noop from '@helpers/noop'
import classNames from 'classnames'
import React, { PureComponent, ReactNode } from 'react'
import { hasValidation, validateInput } from '../input/helpers'
import { IInputValidationResult } from '../input/types'
import styles from './styles.css'
import { ITextAreaProps, ITextAreaState } from './types'

export class TextArea extends PureComponent<ITextAreaProps, ITextAreaState> {
  public readonly state: ITextAreaState = {
    value: this.props.value || '',
    isValid: false,
    isTouched: false,
    validationMessages: []
  }

  private initialState: ITextAreaState

  private inputRef: React.RefObject<HTMLTextAreaElement> = React.createRef()

  public componentDidUpdate(prevProps: ITextAreaProps, prevState: ITextAreaState): void {
    const valueDefinedOnProps = typeof this.props.value !== 'undefined'
    const valueChangedOnProps = this.props.value !== prevProps.value
    const valueDifferentToState = prevState.value !== this.props.value
    if (valueDefinedOnProps && valueChangedOnProps && valueDifferentToState) {
      this.doChange(this.props.value)
    }
  }

  public componentDidMount(): void {
    const {
      value = '',
      inputProps: { registerInput }
    } = this.props

    const { isValid, messages } = this.validate(value)
    this.setState({ value, isValid, validationMessages: messages }, () => {
      this.initialState = this.state
      registerInput(this.getPayload())
    })
  }

  public componentWillUnmount(): void {
    const {
      inputProps: { deRegisterInput }
    } = this.props
    deRegisterInput(this.getPayload())
  }

  public render(): ReactNode {
    const {
      inputProps,
      onChange,
      onBlur,
      value,
      validators = [],
      className,
      label,
      labelAppendix,
      inverted = false,
      hideValidation = false,
      infoSlot,
      ...restProps
    } = this.props
    const { isValid, isTouched, validationMessages } = this.state
    const hasValidationRes = hasValidation(this.props)

    const describedById = `${restProps.name}ValidationMessage`

    return (
      <div
        className={classNames('formField', className, styles.wrapper, {
          [styles.error]: !isValid && isTouched && !hideValidation,
          ['optional']: !hasValidationRes
        })}
      >
        <Label label={label} appendix={labelAppendix} inverted={inverted}>
          <textarea
            ref={this.inputRef}
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            aria-describedby={describedById}
            {...restProps}
          />
          <InfoSlot
            id={describedById}
            slotOverride={infoSlot}
            validationConfig={{ isValid, isTouched, hideValidation, hasValidation: hasValidationRes }}
            validationMessages={validationMessages}
          />
        </Label>
      </div>
    )
  }

  public focus = (): void => {
    if (this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  public reset = (): void => {
    const {
      inputProps: { updateForm }
    } = this.props

    this.setState(this.initialState, () => updateForm(this.getPayload()))
  }

  private getPayload(): IFormControllerPayload {
    const { name } = this.props
    const { isValid, value } = this.state

    return {
      isValid,
      value,
      name,
      reset: this.reset.bind(this),
      touch: this.touch.bind(this),
      focus: this.focus.bind(this)
    }
  }

  private touch = (): void => {
    this.setState({ isTouched: true })
  }

  private validate(value: InputValue): IInputValidationResult {
    const { validators = [] } = this.props
    return validateInput({ validators, value, inputRef: this.inputRef })
  }

  private handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    const { onBlur = noop } = this.props
    onBlur(event)

    this.setState({ isTouched: true })
  }

  private doChange = (value: InputValue): void => {
    const {
      inputProps: { updateForm },
      name
    } = this.props
    const { isValid, messages } = this.validate(value)
    const customPayload: IFormControllerPayload = {
      name,
      isValid,
      value,
      reset: this.reset.bind(this),
      touch: this.touch.bind(this),
      focus: this.focus.bind(this)
    }

    this.setState({ value, isValid, validationMessages: messages })
    updateForm(customPayload)
  }

  private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { onChange = noop } = this.props
    onChange(e)
    this.doChange(e.target.value as string)
  }
}
