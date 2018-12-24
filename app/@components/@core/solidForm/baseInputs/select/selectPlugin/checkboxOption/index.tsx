import { Checkbox } from '@core/solidForm/baseInputs/checkbox'
import { IFormControllerInputProps } from '@core/solidForm/formController/types'
import classNames from 'class-names'
import { Component, ReactNode, SyntheticEvent } from 'react'
import styles from '../styles.css'
import { ICheckboxOptionProps } from './types'

export class CheckboxOption extends Component<ICheckboxOptionProps> {
  public handleMouseDown(event: SyntheticEvent<HTMLElement>): void {
    event.preventDefault()
    event.stopPropagation()

    if (this.props.isSelected) {
      this.props.removeValue(this.props.option)
    } else {
      this.props.onSelect(this.props.option, event)
    }
  }

  public handleMouseEnter = (event: SyntheticEvent<HTMLElement>): void => {
    this.props.onFocus(this.props.option, event)
  }

  public handleMouseMove = (event: SyntheticEvent<HTMLElement>): void => {
    if (this.props.isFocused) {
      return
    }
    this.props.onFocus(this.props.option, event)
  }

  public render(): ReactNode {
    const { children, className, option, isSelected } = this.props

    const inputProps: IFormControllerInputProps = {
      registerInput: (): void => void 0,
      deRegisterInput: (): void => void 0,
      updateForm: (): void => void 0
    }

    return (
      <span
        className={classNames(styles.option, className)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        title={option.label as string}
      >
        <Checkbox name={`checkbox-option-${option.label}`} checked={isSelected} inputProps={inputProps}>
          {!option.template && children}
          {option.template && option.template}
        </Checkbox>
      </span>
    )
  }
}
