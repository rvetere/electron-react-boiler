import React, { PureComponent, ReactNode } from 'react'

export default class App extends PureComponent<{}> {
  public render(): ReactNode {
    const { children } = this.props
    return children
  }
}
