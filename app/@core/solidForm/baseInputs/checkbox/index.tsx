import { Checkbox as CheckboxIcon, CheckboxActive } from '@core/image/icon'
import baseStyles from '@core/solidForm/baseInputs/stylesCheckboxRadio.css'
import { InfoSlot } from '@core/solidForm/elements/infoSlot'
import { IFormControllerPayload } from '@core/solidForm/formController/types'
import { LabelPosition } from '@core/solidForm/types'
import noop from '@helpers/noop'
import classNames from 'class-names'
import React, { PureComponent, ReactNode } from 'react'
import { hasValidation, validateInput } from '../input/helpers'
import { IInputValidationResult } from '../input/types'
import styles from './styles.css'
import { ICheckboxProps, ICheckboxState } from './types'

export class Checkbox extends PureComponent<ICheckboxProps, ICheckboxState> {
  public readonly state: ICheckboxState = {
    isChecked: this.props.checked ? true : false,
    isValid: this.props.required && !this.props.checked ? false : true,
    isTouched: false,
    validationMessages: []
  }
  private initialState: ICheckboxState

  private inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  public componentDidUpdate(prevProps: ICheckboxProps, prevState: ICheckboxState): void {
    const valueDefinedOnProps = typeof this.props.checked !== 'undefined'
    const valueChangedOnProps = this.props.checked !== prevProps.checked
    const valueDifferentToState = prevState.isChecked !== this.props.checked
    if (valueDefinedOnProps && valueChangedOnProps && valueDifferentToState) {
      this.doChange(this.props.checked)
    }
  }

  public componentDidMount(): void {
    const {
      checked,
      inputProps: { registerInput }
    } = this.props

    const { isValid, messages } = this.validate()
    this.setState({ isChecked: checked, isValid, validationMessages: messages }, () => {
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
      name,
      children,
      inverted,
      checked,
      disabled,
      className,
      labelPosition = LabelPosition.LabelRight,
      inputProps,
      value,
      hideValidation,
      infoSlot,
      ...restProps
    } = this.props
    const { isChecked = false, isValid, isTouched, validationMessages } = this.state
    const hasValidationRes = hasValidation(this.props)

    const describedById = `${name}ValidationMessage`

    const input = (
      <>
        <input
          className={baseStyles.htmlInput}
          name={name}
          type={'checkbox'}
          checked={isChecked}
          disabled={disabled}
          onChange={this.handleChange}
          ref={this.inputRef}
          aria-describedby={describedById}
          {...restProps}
        />
        <span className={classNames(styles.checkboxSvg, baseStyles.inputSvg)}>
          {isChecked && <CheckboxActive width={18} height={18} />}
          {!isChecked && <CheckboxIcon width={18} height={18} />}
        </span>
      </>
    )

    return (
      <>
        <label
          className={classNames('formField', className, baseStyles.inputElement, styles.checkbox, {
            [baseStyles.labelLeft]: labelPosition === LabelPosition.LabelLeft,
            [baseStyles.disabled]: disabled,
            [baseStyles.inverted]: inverted,
            [styles.inverted]: inverted,
            [styles.isChecked]: isChecked,
            [styles.error]: !isValid && isTouched && !hideValidation,
            ['optional']: !hasValidationRes
          })}
        >
          {children && (
            <>
              {labelPosition === LabelPosition.LabelRight && input}
              {children}
              {labelPosition === LabelPosition.LabelLeft && input}
            </>
          )}
        </label>
        <InfoSlot
          id={describedById}
          slotOverride={infoSlot}
          validationConfig={{ isValid, isTouched, hideValidation, hasValidation: hasValidationRes }}
          validationMessages={validationMessages}
        />
      </>
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

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange = noop } = this.props
    onChange(e)
    this.doChange(e.target.checked)
  }

  private doChange = (checked?: boolean): void => {
    const {
      inputProps: { updateForm }
    } = this.props

    const { isValid, messages } = this.validate()
    const stateUpdate = { isTouched: true, isChecked: checked ? true : false, isValid, validationMessages: messages }
    this.setState(stateUpdate, () => updateForm(this.getPayload()))
  }

  private getPayload(): IFormControllerPayload {
    const { name } = this.props
    const { isChecked, isValid } = this.state

    return {
      isValid,
      value: isChecked,
      name,
      reset: this.reset.bind(this),
      touch: this.touch.bind(this),
      focus: this.focus.bind(this)
    }
  }

  private validate(): IInputValidationResult {
    return validateInput({ inputRef: this.inputRef })
  }

  private touch = (): void => {
    this.setState({ isTouched: true })
  }
}
