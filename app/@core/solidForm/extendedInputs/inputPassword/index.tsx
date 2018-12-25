import { Button } from '@core'
import { Eye, EyeClosed } from '@core/image/icon'
import { InputText } from '@core/solidForm'
import React, { PureComponent, ReactNode, SyntheticEvent } from 'react'
import styles from './styles.css'
import { IInputPasswordProps, IInputPasswordState } from './types'

export class InputPassword extends PureComponent<IInputPasswordProps, IInputPasswordState> {
  public readonly state: IInputPasswordState = {
    isVisible: false
  }

  public render(): ReactNode {
    const { hideToggle = false } = this.props
    const { isVisible } = this.state
    return (
      <div className={styles.wrapper}>
        <InputText {...this.props} type={isVisible ? 'text' : 'password'} />
        {!hideToggle && (
          <span className={styles.eye}>
            <Button onMouseDown={this.toggle} tabIndex={-1}>
              <span className="ssrOnly">Toggle password visibility</span>
              {!isVisible && <Eye />}
              {isVisible && <EyeClosed />}
            </Button>
          </span>
        )}
      </div>
    )
  }

  private toggle = (event: SyntheticEvent): void => {
    event.preventDefault()
    this.setState({ isVisible: !this.state.isVisible })
  }
}
