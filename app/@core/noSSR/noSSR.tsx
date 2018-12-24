import { Fragment, PureComponent, ReactNode } from 'react'
import { INoSSRProps, INoSSRState } from './types'

export class NoSSR extends PureComponent<INoSSRProps, INoSSRState> {
  public readonly state: INoSSRState = {
    mounted: false
  }

  public componentDidMount(): void {
    this.setState({ mounted: true })
  }

  public render(): ReactNode {
    const { children, onSSR = <Fragment /> } = this.props
    const { mounted } = this.state

    return mounted ? children : onSSR
  }
}
