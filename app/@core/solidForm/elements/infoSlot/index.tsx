import React, { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IInfoSlotProps } from './types'
import { ValidationDisplay } from './validationDisplay'

export class InfoSlot extends PureComponent<IInfoSlotProps> {
  public render(): ReactNode {
    const { id, slotOverride, validationConfig, validationMessages } = this.props

    let slotJsx: ReactNode = null
    const slotOverrideJsx = slotOverride && slotOverride(validationConfig)
    if (slotOverrideJsx) {
      slotJsx = slotOverrideJsx
    } else {
      slotJsx = validationConfig.hasValidation && <ValidationDisplay config={validationConfig} messages={validationMessages} />
    }

    if (!slotJsx) {
      return null
    }

    return (
      <div id={id} className={styles.wrapper}>
        {slotJsx}
      </div>
    )
  }
}
