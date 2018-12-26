import { AUTH_SIGN_IN } from '@actions/auth'
import { IAuthState } from './types'

// tslint:disable-next-line:no-any
export default (state: IAuthState, action: any): any => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return { ...state, ...action.payload }
    default:
      return state || {}
  }
}
