import { ConnectedRouter } from 'connected-react-router'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Routes from '../Routes'

export interface IRootProps {
  store: Store
  history: {}
}

export default class Root extends Component<IRootProps> {
  public render(): ReactNode {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}
