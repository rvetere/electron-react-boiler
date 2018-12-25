import { Radio, RadioActive } from '@core/image/icon'
import baseStyles from '@core/solidForm/baseInputs/stylesCheckboxRadio.css'
import { LabelPosition } from '@core/solidForm/types'
import noop from '@helpers/noop'
import classNames from 'class-names'
import React, { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IRadioOptionProps } from './types'

export class RadioOption extends PureComponent<IRadioOptionProps> {
  constructor(props: IRadioOptionProps) {
    super(props)

    const {
      value,
      checked,
      radioProps: { initialValueRadioGroup }
    } = this.props

    if (checked && value) {
      initialValueRadioGroup(value)
    }
  }

  public render(): ReactNode {
    const {
      children,
      value,
      inverted,
      disabled,
      labelPosition = LabelPosition.LabelRight,
      radioProps: { name, radioGroupValue, sideBySide, describedById, hasError },
      className,
      checked,
      ...restProps
    } = this.props

    const isChecked = radioGroupValue === value

    const input = (
      <>
        <input
          className={baseStyles.htmlInput}
          name={name}
          type={'radio'}
          checked={isChecked}
          disabled={disabled}
          value={value}
          onChange={this.handleChange}
          aria-describedby={describedById}
          {...restProps}
        />
        <span className={classNames(styles.radioSvg, baseStyles.inputSvg)}>
          {!isChecked && <Radio width={18} height={18} />}
          {isChecked && <RadioActive width={18} height={18} />}
        </span>
      </>
    )

    return (
      <label
        className={classNames('radioOption', className, styles.radio, baseStyles.inputElement, {
          [baseStyles.labelLeft]: labelPosition === LabelPosition.LabelLeft,
          [baseStyles.disabled]: disabled,
          [baseStyles.inverted]: inverted,
          [styles.inverted]: inverted,
          [styles.sideBySide]: sideBySide,
          [styles.error]: hasError
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
    )
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      value,
      onChange = noop,
      radioProps: { updateRadioGroup }
    } = this.props

    onChange(e)

    const checked = e.target.checked

    updateRadioGroup(checked ? value : '')
  }
}
