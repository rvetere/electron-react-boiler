import Styleguide from '@components/styleguide'
import React, { PureComponent, ReactNode } from 'react'

export default class StyleguideRoute extends PureComponent<{}> {
  public render(): ReactNode {
    console.log('we hre')
    return <Styleguide />
  }
}
