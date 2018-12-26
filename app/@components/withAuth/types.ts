import { IFormValues } from '@core/solidForm'
import { IAuthState } from '@reducers/types'
import { ReactNode } from 'react'
import { RouterProps } from 'react-router'

export interface IWithAuthInnerControllerProps {
  children: (auth: IAuthState) => ReactNode
  auth: IAuthState
  signIn: (authState: IAuthState) => void
}

export interface IWithAuthViewProps {
  onSubmit: (values: IFormValues) => void
}

export interface ITokenData {
  name: string
  email: string
  roles: string[]
}

export interface IPrivateRouteProps extends RouterProps {
  component: React.SFC<RouterProps>
  auth: IAuthState
  adminOnly?: boolean
}
