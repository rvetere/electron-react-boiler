import { Button } from '@core'
import { FormController, IFormControllerActions, InputPassword, InputText } from '@core/solidForm'
import { PureComponent, ReactNode } from 'react'
import { IWithAuthViewProps } from './types'

export class WithAuthView extends PureComponent<IWithAuthViewProps> {
  public render(): ReactNode {
    return (
      <FormController onSubmit={this.props.onSubmit}>
        {({ inputProps }: IFormControllerActions): ReactNode => (
          <>
            <InputText name="username" required autoFocus inputProps={inputProps} label="Username" />
            <InputPassword name="password" required inputProps={inputProps} label="Password" />

            <Button primary type="submit">
              login
            </Button>
          </>
        )}
      </FormController>
    )
  }
}
