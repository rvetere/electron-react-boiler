import { ITokenData } from '@components/withAuth'

export interface IAuthState extends ITokenData {
  token: string
}

export interface IGlobalState {
  lang: string
  auth: IAuthState
}
