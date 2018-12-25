import isWindowDefined, { isValueOnWindowDefined } from '@helpers/isWindowDefined'
import classNames from 'classnames'
import React, { PureComponent, ReactNode } from 'react'
import Navigation from './navigation'
import SolidForm from './solidForm'
import styles from './styles.css'
import { IStyleguideProps, IStyleguideState, IStyleguideStoryProps } from './types'

// To support HMR we create a "global state" trough window, so we don't clutter apollo for the styleguide
if (isWindowDefined() && !isValueOnWindowDefined('DgSgActiveNavi')) {
  window.DgSgActiveNavi = 'SolidForm'
}

export default class Styleguide extends PureComponent<IStyleguideProps, IStyleguideState> {
  public static getActiveNavigation = (): string => {
    return isWindowDefined() ? window.DgSgActiveNavi : 'SolidForm'
  }

  // On HMR, the local state resets but the window value stays - keep local state in track with this function
  public static getDerivedStateFromProps(_: IStyleguideProps, state: IStyleguideState): IStyleguideState | null {
    const activeNavigation = Styleguide.getActiveNavigation()
    if (state.activeNavigation !== activeNavigation) {
      return { activeNavigation, naviEntries: state.naviEntries }
    }
    return null
  }

  public readonly state: IStyleguideState = {
    naviEntries: [
      {
        title: 'SolidForm',
        component: <SolidForm />
      }
    ],
    activeNavigation: 'SolidForm'
  }

  public setNavigation = (newNavigation: string): void => {
    window.DgSgActiveNavi = newNavigation

    // still use a local state change to trigger re-rendering
    this.setState({ activeNavigation: newNavigation })
  }

  public render(): JSX.Element {
    const { naviEntries } = this.state
    const navi: string[] = naviEntries.map((entry: IStyleguideStoryProps): string => entry.title)
    return (
      <div className={styles.styleguide}>
        <Navigation naviEntries={navi} activeNavigation={Styleguide.getActiveNavigation()} setNavigation={this.setNavigation} />
        {this.renderContent()}
      </div>
    )
  }

  private renderContent = (): ReactNode => {
    const { naviEntries } = this.state
    const filtered = naviEntries.filter((entry: IStyleguideStoryProps) => entry.title === Styleguide.getActiveNavigation())
    const content = filtered.length > 0 && filtered.pop()
    if (content) {
      return <div className={classNames('styleguide', styles.content)}>{content.component}</div>
    }

    return null
  }
}
