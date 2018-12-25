import { ReactNode } from 'react'

interface IStyleguideProps {
  children?: ReactNode
}

interface IStyleguideStoryProps {
  title: string
  component: ReactNode
}

interface IStyleguideState {
  naviEntries: IStyleguideStoryProps[]
  activeNavigation: string
}

/* tslint:disable */
declare global {
  interface Window {
    DgSgActiveNavi: string
  }
}
/* tslint:enable */
