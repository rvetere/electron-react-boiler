import * as AuthActions from '@actions/auth'
import { IFormValues } from '@core/solidForm'
import { SignIn } from '@graphql/types/generated'
import { IGlobalState } from '@reducers/types'
import { PureComponent, ReactNode } from 'react'
import { Mutation, MutationFunc, MutationResult } from 'react-apollo'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { SIGN_IN } from './data.graphql'
import { isAuthorized, verifyToken } from './helpers'
import { ITokenData, IWithAuthInnerControllerProps } from './types'
import { WithAuthView } from './WithAuthView'

class WithAuthInnerController extends PureComponent<IWithAuthInnerControllerProps> {
  public componentDidMount(): void {
    // check for existing login
    const authToken = localStorage.getItem('authToken')

    if (authToken) {
      verifyToken(authToken).then((decoded: ITokenData) => {
        if (decoded) {
          this.props.signIn({ ...decoded, token: authToken! })
        }
      })
    }
  }

  public render(): ReactNode {
    const { children, auth } = this.props

    if (!isAuthorized(auth)) {
      return (
        <Mutation mutation={SIGN_IN}>
          {(signIn: MutationFunc<SignIn.Mutation, SignIn.Variables>): ReactNode => (
            <WithAuthView onSubmit={(values: IFormValues): Promise<void> => this.onSubmit(values, signIn)} />
          )}
        </Mutation>
      )
    }

    return children(auth)
  }

  private onSubmit = (values: IFormValues, signIn: MutationFunc<SignIn.Mutation, SignIn.Variables>): Promise<void> =>
    signIn({
      variables: {
        username: values.username as string,
        password: values.password as string
      }
    }).then(
      ({ loading, error, data }: MutationResult<SignIn.Mutation>): void => {
        if (loading || error || !data) {
          return
        }

        if (data.signIn.status === 'SUCCESS') {
          verifyToken(data.signIn.token!).then((decoded: ITokenData) => {
            if (decoded) {
              this.props.signIn({ ...decoded, token: data.signIn.token! })
            }
          })

          localStorage.setItem('authToken', data.signIn.token!)
        }
      }
    )
}

const mapStateToProps = (state: IGlobalState): Partial<IWithAuthInnerControllerProps> => ({
  auth: state.auth
})

// @ts-ignore
const mapDispatchToProps = (dispatch: Dispatch): Action<string> => bindActionCreators(AuthActions, dispatch)

export const WithAuthController = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithAuthInnerController)
