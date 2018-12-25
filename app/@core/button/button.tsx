import Circle from '@core/loading/circle'
import classNames from 'class-names'
import React, { Component, ReactNode } from 'react'
import styles from './button.css'
import { getButtonStylings, getIconPadding } from './helpers'
import { IButtonProps, IButtonStylings } from './types'

export class Button extends Component<IButtonProps> {
  public render(): ReactNode {
    const { children, loading, ...props } = this.props
    let { type } = this.props
    const buttonStylings = getButtonStylings(children, { loading, ...props })
    let { className, otherProps }: IButtonStylings = buttonStylings

    if (type === 'link') {
      className = classNames(styles.link, {
        [styles.iconPadding]: getIconPadding(children),
        [styles.inverted]: props.inverted
      })

      type = 'button'
    }

    return (
      <button type={type || 'button'} {...otherProps} className={className}>
        {loading && <Circle width="16px" height="16px" inverted={props.inverted || props.primary} />}
        {children}
      </button>
    )
  }
}
