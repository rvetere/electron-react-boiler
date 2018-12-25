import classNames from 'class-names'
import React, { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { ILabelProps } from './types'

export class Label extends PureComponent<ILabelProps> {
  public render(): ReactNode {
    const { label, appendix, inverted, children } = this.props

    if (!label) {
      return children
    }

    return (
      <label className={classNames('formLabel', styles.label, { [styles.inverted]: inverted })}>
        <span>{label}</span>
        {appendix && <span className={classNames(styles.appendix, { [styles.inverted]: inverted })}>{appendix}</span>}
        {children}
      </label>
    )
  }
}
