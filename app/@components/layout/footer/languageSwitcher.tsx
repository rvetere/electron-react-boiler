import * as LangActions from '@actions/lang'
import LANGUAGES from '@constants/language'
import { Button } from '@core'
import { IGlobalState } from '@reducers/types'
import { PureComponent, ReactNode } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'

export interface ILanguageSwitcherInner {
  lang: string
  changeLanguage: (lang: string) => void
}

export class LanguageSwitcherInner extends PureComponent<ILanguageSwitcherInner> {
  public render(): ReactNode {
    return Object.keys(LANGUAGES).map(
      (lang: string, index: number): ReactNode => (
        <Button key={`lang-switch-${index}`} onClick={(): void => this.handleClick(lang)}>
          {lang}
        </Button>
      )
    )
  }

  private handleClick = (lang: string): void => {
    // this.props.changeLanguage(lang)
    localStorage.setItem('lang', lang)
    location.reload()
  }
}

const mapStateToProps = (state: IGlobalState): Partial<ILanguageSwitcherInner> => ({
  lang: state.lang
})

// @ts-ignore
const mapDispatchToProps = (dispatch: Dispatch): Action<string> => bindActionCreators(LangActions, dispatch)

export const LanguageSwitcher = connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSwitcherInner)
