import { Box, CssBaseline } from '@mui/material'
import { useMemo, useRef, useState } from 'react'
import { DragElement } from './DragElement'
import { validatePoint } from '../helpers'
import { DragItem } from '../types'
import { getDefaultItems } from '../helpers/getDefaultItems'
import { BackgroundGrid } from './BackgroundGrid'
import { Settings } from './Settings'
import { DraggableData, DraggableEvent } from 'react-draggable'

export const Constructor = () => {
  const itemWidth = 100
  const itemHeight = 70

  const fieldWidth = 20
  const fieldHeight = 15

  const itemsPerRow = 6
  const rowsAmount = 10

  const containerRef = useRef<HTMLDivElement>(null)

  const [items, setItems] = useState<DragItem[]>(
    getDefaultItems({ itemWidth, itemHeight }),
  )
  const [itemSettingsId, setItemSettingsId] = useState<number>()
  const itemSettings = useMemo(
    () => items.find((item) => item.id === itemSettingsId),
    [itemSettingsId, items],
  )

  const changeItemValue = (
    itemId: number,
    newItemOptions: Partial<DragItem>,
  ) => {
    setItems((prevItems) => {
      const currentItemIndex = prevItems.findIndex((item) => item.id === itemId)

      if (currentItemIndex === -1) return prevItems

      prevItems[currentItemIndex] = {
        ...prevItems[currentItemIndex],
        ...newItemOptions,
      }

      return [...prevItems]
    })
  }

  const handleDragEnd = (
    newPosition: { x: number; y: number },
    item: DragItem,
  ) => {
    const maxX =
      itemWidth * fieldWidth - (item.countWidth ?? 1) * itemWidth - itemWidth
    const maxY =
      itemHeight * fieldHeight -
      (item.countHeight ?? 1) * itemHeight -
      itemHeight

    const minX = -itemWidth
    const minY = -itemHeight

    const roundX = Math.round(newPosition.x / itemWidth) * itemWidth
    const roundY = Math.round(newPosition.y / itemHeight) * itemHeight

    const x = validatePoint(roundX, maxX, minX, item.x)
    const y = validatePoint(roundY, maxY, minY, item.y)

    changeItemValue(item.id, { x, y })
  }

  const handleDragStart = (item: DragItem) => {
    setItems((prev) => {
      const findedItemIndex = prev.findIndex((el) => item.id === el.id)
      if (findedItemIndex === -1) return prev

      const dragItem = prev[findedItemIndex]
      prev.splice(findedItemIndex, 1)
      return [...prev, dragItem]
    })
  }

  const handleToggleSettings = (item: DragItem) => {
    setItemSettingsId((prev) => (prev === item.id ? undefined : item.id))
  }

  const handleResize = (
    item: DragItem,
    _e: DraggableEvent,
    data: DraggableData,
  ) => {
    const newCountWidth = (item.countWidth ?? 1) + data.deltaX / itemWidth
    const newCountHeight = (item.countHeight ?? 1) + data.deltaY / itemHeight

    changeItemValue(item.id, {
      countWidth:
        newCountWidth > 10 || newCountWidth < 1
          ? item.countWidth
          : newCountWidth,
      countHeight:
        newCountHeight > 10 || newCountHeight < 1
          ? item.countHeight
          : newCountHeight,
    })
  }

  return (
    <Box
      display="flex"
      position="relative"
    >
      <CssBaseline />

      <BackgroundGrid
        itemHeight={itemHeight}
        itemWidth={itemWidth}
        fieldHeight={fieldHeight}
        fieldWidth={fieldWidth}
      />

      <Box
        width={`${itemWidth * itemsPerRow}px`}
        position="absolute"
        left={itemWidth}
        top={itemHeight}
        ref={containerRef}
        height={`${rowsAmount * itemHeight}px`}
        borderRadius="30px"
        sx={{
          outline: (theme) => `4px solid ${theme.palette.primary.light}`,
        }}
      >
        {items.map((item) => (
          <DragElement
            key={item.id}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            countHeight={item.countHeight}
            countWidth={item.countWidth}
            x={item.x}
            y={item.y}
            draggableProps={{
              onStop: (_, { x, y }) => {
                handleDragEnd({ x, y }, item)
              },
              onStart: () => {
                handleDragStart(item)
              },
            }}
            onClick={() => {
              handleToggleSettings(item)
            }}
            onResize={(...args) => {
              handleResize(item, ...args)
            }}
            boxProps={{ sx: item.sx }}
            isActive={item.id === itemSettings?.id}
          >
            {item.renderContent ? item.renderContent(item) : item.text}
          </DragElement>
        ))}
      </Box>

      {itemSettings && (
        <Settings
          title={itemSettings.text}
          onChangeItem={changeItemValue}
          item={itemSettings}
          itemsPerRow={itemsPerRow}
          rowsAmount={rowsAmount}
          onClose={() => {
            setItemSettingsId(undefined)
          }}
        />
      )}
    </Box>
  )
}
