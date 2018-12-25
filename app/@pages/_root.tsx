import { apolloClient } from '@graphql/initApollo'
import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import Routes from '../Routes'

export interface IRootProps {
  store: Store
  // tslint:disable-next-line:no-any
  history: any
}

export default class Root extends React.Component<IRootProps> {
  public render(): React.ReactNode {
    const { store, history } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    )
  }
}
