import { SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

export type DragItem = {
  id: number
  text: string
  x: number
  y: number
  countWidth?: number
  countHeight?: number
  sx?: SxProps<Theme>
  renderContent?: (item: Omit<DragItem, 'renderContent'>) => ReactNode
}
