import React, { PureComponent } from 'react'

export default class App extends PureComponent<{}> {
  public render(): ReactNode {
    const { children } = this.props
    return children
  }
}
