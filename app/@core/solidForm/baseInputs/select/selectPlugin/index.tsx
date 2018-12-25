import classNames from 'class-names'
import React, { PureComponent, ReactNode, RefObject } from 'react'
import Select from 'react-select'
import { ISelectOption, ISelectState } from '../types'
import { CheckboxOption } from './checkboxOption'
import { ArrowRenderer, ClearRenderer, unClearableOptions } from './helpers'
import styles from './styles.css'
import { ISelectPluginProps } from './types'

export class SelectPlugin extends PureComponent<ISelectPluginProps, ISelectState> {
  // tslint:disable-next-line:no-any
  public readonly selectRef: RefObject<any> = React.createRef()

  public render(): ReactNode {
    const { options, hasError, ...props } = this.props
    const isMultiSelect = props.multi || props.multiCheckbox
    if (isMultiSelect) {
      props.backspaceToRemoveMessage = ''
    } else {
      props.clearable = false
    }

    props.value = this.mapValue()

    if (props.multiCheckbox) {
      props.optionComponent = CheckboxOption
      props.removeSelected = false
      props.closeOnSelect = false
      props.multi = true
    }

    props.optionClassName = styles.option
    props.arrowRenderer = ArrowRenderer
    props.clearRenderer = ClearRenderer
    props.noResultsText = 'No results'
    props.loadingPlaceholder = 'Loading...'

    props.onChange = this.handleChange

    delete props.inputProps

    const isAsync = typeof props.loadOptions !== 'undefined'
    const finalOptions = !isMultiSelect ? unClearableOptions(options) : options

    if (isAsync) {
      return (
        <Select.Async
          className={classNames(styles.select, {
            [styles.error]: hasError
          })}
          placeholder={props.placeholder || 'Please choose'}
          aria-describedby={this.props.describedById}
          ref={this.selectRef}
          {...props}
        />
      )
    }

    return (
      <Select
        className={classNames(styles.select, {
          [styles.error]: hasError
        })}
        placeholder={props.placeholder || 'Please choose'}
        aria-describedby={this.props.describedById}
        ref={this.selectRef}
        options={finalOptions}
        {...props}
      />
    )
  }

  public focus = (): void => {
    const { current } = this.selectRef
    if (current) {
      setTimeout(() => {
        current.input.input.focus()
      }, 50)
    }
  }

  // tslint:disable-next-line:no-any
  private mapValue = (): any => {
    const { initialValue } = this.props
    const isMultiSelect = this.props.multi || this.props.multiCheckbox
    if (!isMultiSelect && Array.isArray(initialValue)) {
      if (initialValue.length > 0) {
        return initialValue[0].value
      }

      return null
    }

    return initialValue
  }

  private handleChange = (selectedOption: ISelectOption[]): void => {
    this.props.onChange(selectedOption)
  }
}
