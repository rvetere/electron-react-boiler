import classNames from 'classnames'
import React, { MouseEvent, PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { INavigationProps } from './types'

export default class Navigation extends PureComponent<INavigationProps> {
  public render(): ReactNode {
    const { naviEntries, activeNavigation, setNavigation } = this.props

    return (
      <div className={styles.navigation}>
        {naviEntries.map(
          (entry: string, index: number): ReactNode => (
            <div
              key={index}
              onClick={(event: MouseEvent): void => {
                event.preventDefault()
                setNavigation(entry)
              }}
              className={classNames(styles.entry, { [styles.active]: entry === activeNavigation })}
            >
              {entry}
            </div>
          )
        )}
      </div>
    )
  }
}
