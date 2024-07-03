import { Box, Slider, Typography, BoxProps } from '@mui/material'
import { FC } from 'react'
import { DragItem } from '../types'

export type SettingsProps = {
  title: string
  onChangeItem: (itemId: number, newItemOptions: Partial<DragItem>) => void
  item: DragItem
  itemsPerRow: number
  rowsAmount: number
  onClose?: () => void
} & BoxProps

export const Settings: FC<SettingsProps> = (props) => {
  const {
    title,
    item,
    onChangeItem,
    rowsAmount,
    itemsPerRow,
    onClose,
    ...boxProps
  } = props

  return (
    <Box
      bgcolor={'rgba(255, 255, 255, 0.6)'}
      padding={3}
      position="fixed"
      right="0"
      top="0"
      border="1px solid rgba(0, 0, 0, 0.6)"
      borderRadius="10px"
      width="400px"
      {...boxProps}
    >
      <Box
        component="button"
        position="absolute"
        top="5px"
        left="5px"
        onClick={onClose}
        bgcolor="transparent"
        border="0px"
        fontSize="14px"
        sx={{
          cursor: 'pointer',
        }}
      >
        X
      </Box>
      <Typography
        variant="h5"
        mb={3}
      >
        Настройка: {title}
      </Typography>

      <Box>
        <Typography>Количество элементов в высоту</Typography>
        <Slider
          defaultValue={30}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={rowsAmount}
          value={item.countHeight}
          onChange={(_, newValue) => {
            onChangeItem(item.id, { countHeight: newValue as number })
          }}
        />
      </Box>
      <Box>
        <Typography>Количество элементов в ширину</Typography>
        <Slider
          defaultValue={30}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={itemsPerRow}
          value={item.countWidth}
          onChange={(_, newValue) => {
            onChangeItem(item.id, { countWidth: newValue as number })
          }}
        />
      </Box>
    </Box>
  )
}
