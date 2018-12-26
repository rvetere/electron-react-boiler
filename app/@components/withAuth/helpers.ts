import config from '@config'
import logger from '@helpers/logger'
import { IAuthState } from '@reducers/types'
import jwt from 'jsonwebtoken'
import { ITokenData } from './types'

export const verifyToken = (token: string): Promise<ITokenData> =>
  new Promise(
    (resolve: (decoded?: ITokenData) => void): void => {
      jwt.verify(
        token,
        config.secret,
        (error: Error, decoded: ITokenData): void => {
          if (error) {
            logger.error(error.message)
            return resolve()
          }

          resolve(decoded)
        }
      )
    }
  )

export const isAuthorized = (auth: IAuthState): boolean => {
  if (auth && auth.token) {
    verifyToken(auth.token).then(
      (_tokenData: ITokenData): void => {
        // TODO: dispatch signOut if invalid!
      }
    )

    return true
  }

  return false
}
