import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { ILimitInfoProps } from './types'

export class LimitInfo extends PureComponent<ILimitInfoProps> {
  public render(): ReactNode {
    const { limit, valueLength } = this.props
    const limitReached = valueLength > limit
    return <p className={classNames(styles.limitInfo, { [styles.limitReached]: limitReached })}>[0] / [1] characters</p>
  }
}
