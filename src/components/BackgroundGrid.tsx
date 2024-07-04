import { Box } from '@mui/material'
import { FC, memo } from 'react'

export type BackgroundGridProps = {
  itemWidth: number
  itemHeight: number
  fieldWidth: number
  fieldHeight: number
}

const BackgroundGridComponent: FC<BackgroundGridProps> = (props) => {
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
      {...Array.from({ length: fieldHeight * fieldWidth }).map(() => (
        <Box
          sx={{ outline: '1px dashed rgba(0, 0, 0, 0.1)' }}
          width={`${itemWidth}px`}
          height={`${itemHeight}px`}
        ></Box>
      ))}
    </Box>
  )
}

export const BackgroundGrid = memo(BackgroundGridComponent)
