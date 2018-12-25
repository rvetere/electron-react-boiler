import { ChevronDown } from '@core/image/icon'
import noop from '@helpers/noop'
import classNames from 'classnames'
import React, { PureComponent, ReactNode } from 'react'
import { ISelectOption, ISelectState } from '../types'
import styles from './styles.css'
import { ISelectNativeProps } from './types'

export class SelectNative extends PureComponent<ISelectNativeProps, ISelectState> {
  public render(): ReactNode {
    const { options, name, disabled, hasError, setRef } = this.props

    return (
      <div className={classNames(styles.wrapper, { [styles.error]: hasError })}>
        <select
          ref={setRef as React.RefObject<HTMLSelectElement>}
          name={name}
          id={this.props.id || this.props.name}
          disabled={disabled}
          className={styles.select}
          aria-describedby={this.props.describedById}
          {...this.filterProps(this.props)}
          onChange={this.handleChange}
        >
          {options &&
            options.map(
              (option: ISelectOption, index: number): ReactNode => (
                <option key={`native-select-${this.props.id}-option-${index}`} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              )
            )}
        </select>
        <ChevronDown width={16} height={16} />
      </div>
    )
  }

  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { options, onChange = noop as (value: ISelectOption[]) => void } = this.props
    const selectEl = event.target as HTMLSelectElement

    // options is always there - otherwise i'll ask you back how the user could have clicked on one...
    const optionsFiltered = options!.filter((option: ISelectOption): boolean => option.value + '' === selectEl.value)
    onChange(optionsFiltered)
  }

  private filterProps = (props: ISelectNativeProps): { [propName: string]: ISelectNativeProps } => {
    const filteredProps = {}
    Object.keys(props).forEach((propKey: string) => {
      const isPluginProp = [
        'inputProps',
        'backspaceToRemoveMessage',
        'multi',
        'multiCheckbox',
        'clearable',
        'optionComponent',
        'removeSelected',
        'closeOnSelect',
        'optionClassName',
        'arrowRenderer',
        'clearRenderer',
        'noResultsText',
        'loadingPlaceholder',
        'options',
        'loadOptions',
        'setRef',
        'hasError',
        'describedById'
      ].includes(propKey)

      if (!isPluginProp) {
        filteredProps[propKey] = props[propKey]
      }
    })
    return filteredProps
  }
}
