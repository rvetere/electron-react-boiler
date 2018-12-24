import { NoSSR } from '@core'
import { InfoSlot } from '@core/solidForm/elements/infoSlot'
import { Label } from '@core/solidForm/elements/label'
import { IFormControllerPayload } from '@core/solidForm/formController/types'
import { RequiredMsgDefault } from '@core/solidForm/validators'
import noop from '@helpers/noop'
import classNames from 'classnames'
import React, { PureComponent, ReactNode } from 'react'
import { hasValidation, validateInput } from '../input/helpers'
import { IInputValidationResult } from '../input/types'
import { SelectNative } from './selectNative'
import { SelectPlugin } from './selectPlugin'
import { ISelectOption, ISelectProps, ISelectState } from './types'

export class Select extends PureComponent<ISelectProps, ISelectState> {
  public readonly state: ISelectState = {
    value: this.props.value,
    isValid: false,
    isTouched: false,
    validationMessages: []
  }

  private initialState: ISelectState

  private inputRef: React.RefObject<HTMLSelectElement | SelectPlugin> = React.createRef()

  public componentDidMount(): void {
    const {
      value,
      inputProps: { registerInput }
    } = this.props

    if (this.inputRef.current && this.inputRef.current instanceof HTMLSelectElement) {
      // make it possible "no option is selected" on native select
      let currentValue = value && Array.isArray(value) ? value[0] : value && !Array.isArray(value) ? value : null
      this.inputRef.current.value = (currentValue ? currentValue.value : undefined) as string
    }

    const valueAsArray = this.getValueAsArray(value)
    const { isValid, messages } = this.validate(valueAsArray!)
    const newState = { value: valueAsArray, isValid, validationMessages: messages }
    this.setState(newState, () => {
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
      native = false,
      inverted = false,
      hideValidation = false,
      infoSlot,
      ...restProps
    } = this.props
    const { isValid, isTouched, validationMessages } = this.state

    const isMultiSelect = this.props.multi || this.props.multiCheckbox
    const isAsync = typeof this.props.loadOptions !== 'undefined'

    const describedById = `${restProps.name}ValidationMessage`

    const hasError = !isValid && isTouched && !hideValidation
    const hasValidationRes = hasValidation(this.props)
    const nativeProps = {
      setRef: this.inputRef,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      describedById,
      hasError,
      inputProps,
      ...restProps
    }

    let selectJsx = (
      <NoSSR onSSR={<SelectNative {...nativeProps} />}>
        <SelectPlugin
          ref={this.inputRef as React.RefObject<SelectPlugin>}
          initialValue={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          inputProps={inputProps}
          hasError={hasError}
          describedById={describedById}
          {...restProps}
        />
      </NoSSR>
    )

    // if (native || (isBreakpointSmaller(Viewport.LG) && !isMultiSelect && !isAsync)) {
    //   selectJsx = <SelectNative {...nativeProps} />
    // }

    return (
      <>
        <div
          className={classNames('formField', className, {
            ['optional']: !hasValidationRes
          })}
        >
          <Label label={label} appendix={labelAppendix} inverted={inverted}>
            {selectJsx}
            <InfoSlot
              id={describedById}
              slotOverride={infoSlot}
              validationConfig={{ isValid, isTouched, hideValidation, hasValidation: hasValidationRes }}
              validationMessages={validationMessages}
            />
          </Label>
        </div>
      </>
    )
  }

  public focus = (): void => {
    const { current } = this.inputRef
    if (current) {
      current.focus()
    }
  }

  public reset = (): void => {
    const {
      inputProps: { updateForm }
    } = this.props

    this.setState(this.initialState, () => updateForm(this.getPayload()))
  }

  private getValueAsArray = (value?: ISelectOption | ISelectOption[]): ISelectOption[] | undefined => {
    if (value) {
      if (!Array.isArray(value)) {
        const newValue: ISelectOption[] = []
        newValue.push({
          ...value
        })
        return newValue
      }
    }

    return value
  }

  private getPayload(): IFormControllerPayload {
    const { name } = this.props
    const { isValid } = this.state

    return {
      isValid,
      value: this.getValueAsArray(this.state.value),
      name,
      reset: this.reset.bind(this),
      touch: this.touch.bind(this),
      focus: this.focus.bind(this)
    }
  }

  private touch = (): void => {
    this.setState({ isTouched: true })
  }

  private validate(value: ISelectOption[]): IInputValidationResult {
    const { validators = [] } = this.props
    if (this.inputRef.current && this.inputRef.current instanceof SelectPlugin) {
      let { isValid, messages } = validateInput({ validators, value })
      if (this.props.required && !value) {
        isValid = false
        messages = [...messages, { message: this.props.validationMessage || RequiredMsgDefault }]
      }

      return { isValid, messages }
    }
    return validateInput({ validators, value, inputRef: this.inputRef as React.RefObject<HTMLSelectElement> })
  }

  private handleBlur = (event: React.FocusEvent<HTMLSelectElement>): void => {
    const { onBlur = noop } = this.props
    onBlur(event)

    this.setState({ isTouched: true })
  }

  private doChange = (value: ISelectOption[]): void => {
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

  private handleChange = (value: ISelectOption[]): void => {
    const { onChange = noop } = this.props
    onChange(value.length === 1 ? value[0]! : value)
    this.doChange(value)
  }
}
