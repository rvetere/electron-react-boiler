import { WithAuth } from '@components/withAuth'
import routes from '@constants/routes.json'
import { GetWorld } from '@graphql/types/generated'
import { IAuthState } from '@reducers/types'
import React, { PureComponent, ReactNode } from 'react'
import { Query, QueryResult } from 'react-apollo'
import { Link } from 'react-router-dom'
import { GET_WORLD } from './data.graphql'
import styles from './styles.css'

export default class Home extends PureComponent<{}> {
  public render(): ReactNode {
    return (
      <div className={styles.container} data-tid="container">
        <WithAuth>
          {(auth: IAuthState): ReactNode => (
            <>
              <h1>howdy {auth.name}!</h1>

              <Query query={GET_WORLD}>
                {({ loading, error, data }: QueryResult<GetWorld.Query, GetWorld.Variables>): ReactNode => {
                  if (loading) {
                    return 'Loading...'
                  }
                  if (error || !data) {
                    return `Error! ${error && error.message}`
                  }

                  return <h5>{data.hello}</h5>
                }}
              </Query>
            </>
          )}
        </WithAuth>

        <Link to={routes.STYLEGUIDE}>to Styleguide</Link>
      </div>
    )
  }
}
