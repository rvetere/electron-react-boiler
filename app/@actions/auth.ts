// tslint:disable:typedef
import { IAuthState } from '@reducers/types'
import { action } from 'typesafe-actions'

export const AUTH_SIGN_IN = '@auth/SIGN_IN'

export const signIn = (authState: IAuthState) => action(AUTH_SIGN_IN, authState)
