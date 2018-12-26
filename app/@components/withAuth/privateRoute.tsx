import { IGlobalState } from '@reducers/types'
import { connect } from 'react-redux'
import { Redirect, Route, RouterProps } from 'react-router'
import { isAuthorized } from './helpers'
import { IPrivateRouteProps } from './types'

const PrivateRouteSFC: React.SFC<IPrivateRouteProps> = ({ component: Component, auth, adminOnly = false, ...rest }: IPrivateRouteProps): JSX.Element | null => {
  let authorized = isAuthorized(auth)
  authorized = adminOnly && authorized && auth.roles.includes('admin')
  return <Route {...rest} render={(props: RouterProps): JSX.Element | null => (authorized ? <Component {...props} /> : <Redirect to="/" />)} />
}

const mapStateToProps = (state: IGlobalState): Partial<IPrivateRouteProps> => ({
  auth: state.auth
})

export const PrivateRoute = connect(mapStateToProps)(PrivateRouteSFC)
