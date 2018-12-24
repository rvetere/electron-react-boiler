import { IUiContext } from '@core/context/types'
import UiContext from '@core/context/ui'
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
    const { children, onSSR = <Fragment />, renderOnServerForBots = false } = this.props
    const { mounted } = this.state

    return (
      <UiContext.Consumer>
        {({ ui: { isBot } }: IUiContext): ReactNode => {
          return mounted || (renderOnServerForBots && isBot) ? children : onSSR
        }}
      </UiContext.Consumer>
    )
  }
}
