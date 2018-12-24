import Translation from '@core/translation'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IValidationDisplayProps, IValidationMessage } from './types'

export class ValidationDisplay extends PureComponent<IValidationDisplayProps> {
  public render(): ReactNode {
    const {
      config: { isValid, isTouched, hideValidation = false },
      messages
    } = this.props

    if (hideValidation) {
      return null
    }

    return (
      <>
        {!isValid &&
          isTouched &&
          messages.map(
            ({ message, interpolations }: IValidationMessage, key: number): JSX.Element => (
              <p className={styles.validationMessage} key={key}>
                <Translation interpolations={interpolations}>{message}</Translation>
              </p>
            )
          )}
      </>
    )
  }
}
