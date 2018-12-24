import routes from '@constants/routes'
import { Checkbox, FormController, IFormControllerActions, InputText } from '@core/solidForm'
import React, { PureComponent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.css'

export default class Home extends PureComponent<{}> {
  public render(): ReactNode {
    return (
      <div className={styles.container} data-tid="container">
        <h1>Home</h1>
        <Link to={routes.COUNTER}>to Counter</Link>
        <FormController>
          {({ inputProps }: IFormControllerActions): ReactNode => (
            <>
              <InputText name="test" inputProps={inputProps} />
              <Checkbox name="check" inputProps={inputProps}>
                check me
              </Checkbox>
            </>
          )}
        </FormController>
      </div>
    )
  }
}
