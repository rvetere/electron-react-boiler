import { Layout } from '@components/layout'
import { PureComponent, ReactNode } from 'react'

export default class App extends PureComponent<{}> {
  public render(): ReactNode {
    const { children } = this.props
    return <Layout>{children}</Layout>
  }
}
