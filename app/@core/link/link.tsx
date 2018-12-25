import { getButtonStylings } from '@core'
import classNames from 'class-names'
import React, { Children, isValidElement, PureComponent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './link.css'
import { ILinkProps } from './types'

export class LinkComponent extends PureComponent<ILinkProps> {
  public render(): ReactNode {
    let { children, link, button, inverted, fullSize, text, ...otherProps } = this.props

    const count = Children.count(children)
    const iconPadding = count > 1 && (children && isValidElement(children[0]))
    let linkClasses

    if (button) {
      // get button classes and remove the button specific props
      const buttonStylings = getButtonStylings(children, otherProps)
      linkClasses = buttonStylings.className
      otherProps = buttonStylings.otherProps
    } else {
      linkClasses = classNames(styles.link, {
        [styles.inverted]: inverted,
        [styles.fullSizeOverlay]: fullSize,
        [styles.iconPadding]: iconPadding
      })
    }

    return (
      <Link to={link} className={linkClasses}>
        {text}
      </Link>
    )
  }
}
