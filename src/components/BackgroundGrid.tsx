import { Box } from '@mui/material'
import { FC } from 'react'

export type BackgroundGridProps = {
  itemWidth: number
  itemHeight: number
  fieldWidth: number
  fieldHeight: number
}

export const BackgroundGrid: FC<BackgroundGridProps> = (props) => {
  const { itemHeight, itemWidth, fieldHeight, fieldWidth } = props

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      position="absolute"
      top="0"
      left="0"
      width={itemWidth * fieldWidth}
      height={itemHeight * fieldHeight}
    >
      {...Array.from({ length: (fieldHeight + 2) * fieldWidth }).map(() => (
        <Box
          sx={{ outline: '1px solid rgba(0, 0, 0, 0.2)' }}
          width={`${itemWidth}px`}
          height={`${itemHeight}px`}
        ></Box>
      ))}
    </Box>
  )
}
