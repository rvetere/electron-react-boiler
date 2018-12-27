import { ReactNode } from 'react'

export interface IInterval {
  value: number
}

declare global {
  const __: (key: string, interpolations?: string | number | ReactNode[]) => string
}
