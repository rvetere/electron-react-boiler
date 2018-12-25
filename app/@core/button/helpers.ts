import classNames from 'class-names'
import React, { ReactNode } from 'react'
import styles from './button.css'
import { IButtonProps, IButtonStylings } from './types'

export const getIconPadding = (children: ReactNode): boolean => {
  if (!children) {
    return false
  }

  const count = React.Children.count(children)
  let iconPadding = React.isValidElement(children[0]) && count > 1

  if (count > 1 && children[1].props) {
    iconPadding = children[1].props.className !== 'ssrOnly'
  }

  return iconPadding
}

export const getButtonStylings = (children: ReactNode, props: IButtonProps): IButtonStylings => {
  const { primary, secondary, outline, small, big, inverted, block, mobileNoBlock, loading, fullSize, ...otherProps }: IButtonProps = props
  const className = classNames(styles.button, {
    [styles.disabled]: props.disabled,
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.small]: small,
    [styles.outline]: outline,
    [styles.big]: big,
    [styles.inverted]: inverted,
    [styles.iconPadding]: getIconPadding(children),
    [styles.block]: block,
    [styles.mobileNoBlock]: mobileNoBlock,
    [styles.loading]: loading,
    [styles.fullSizeOverlay]: fullSize
  })
  return { className, otherProps }
}
