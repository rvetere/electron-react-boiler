import { ReactNode } from 'react'

export interface INoSSRProps {
  onSSR?: ReactNode
  renderOnServerForBots?: boolean
}

export interface INoSSRState {
  mounted: boolean
}
