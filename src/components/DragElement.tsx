import { Box, BoxProps } from '@mui/material'
import { FC, PropsWithChildren, useState } from 'react'
import Draggable, {
  DraggableEventHandler,
  DraggableProps,
} from 'react-draggable'
import resizeIcon from '../assets/svg/resize-icon.svg'

export type DragElementProps = {
  itemWidth: number
  itemHeight: number
  x: number
  y: number
  boxProps?: BoxProps
  draggableProps: Partial<DraggableProps>
  countWidth?: number
  countHeight?: number
  isActive?: boolean
  onClick?: () => void
  onResize?: DraggableEventHandler
} & PropsWithChildren

export const DragElement: FC<DragElementProps> = (props) => {
  const {
    itemWidth,
    itemHeight,
    x,
    y,
    boxProps: { sx, ...boxProps } = {},
    draggableProps = {},
    countWidth = 1,
    countHeight = 1,
    children,
    isActive,
    onClick,
    onResize,
  } = props
  const { onStop, onStart, ...restDraggableProps } = draggableProps

  const [isDragging, setIsDragging] = useState(false)

  const [isResizing, setIsResizing] = useState(false)
  const [resizePosition, setResizePosition] = useState({ x: 0, y: 0 })

  const commonTransitions = [
    'background-color 300ms',
    `height ${isResizing ? '100ms' : '300ms'}`,
    `width ${isResizing ? '100ms' : '300ms'}`,
  ]
  const transition = [
    ...(!isDragging ? ['transform 300ms ease-in-out'] : []),
    ...commonTransitions,
  ].join(', ')

  const resizeSize = '20px'

  return (
    <Draggable
      position={{
        x,
        y,
      }}
      cancel=".cancel"
      defaultClassName="element"
      onStop={(...args) => {
        if (!isDragging) {
          onClick && onClick()
        }
        setIsDragging(false)
        onStop && onStop(...args)
      }}
      onDrag={() => {
        setIsDragging(true)
      }}
      onStart={(...args) => {
        onStart && onStart(...args)
      }}
      {...restDraggableProps}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        width={`${itemWidth * countWidth}px`}
        height={`${itemHeight * countHeight}px`}
        top={0}
        left={0}
        borderRadius="30px"
        bgcolor={
          isActive ? 'rgba(222, 240, 255, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        }
        onClick={() => {}}
        textAlign="center"
        boxShadow={2}
        sx={{
          transition,
          cursor: isDragging ? 'move' : 'pointer',
          outline: isDragging
            ? (theme) => `2px dashed ${theme.palette.primary.main}`
            : '1px solid rgba(0, 0, 0, 0.6)',
          ...sx,
        }}
        {...boxProps}
      >
        <Draggable
          position={{ ...resizePosition }}
          onDrag={(...args) => {
            const [, { x, y }] = args

            setResizePosition({ x, y })
            setIsResizing(true)
            onResize && onResize(...args)
          }}
          onStop={() => {
            setResizePosition({ x: 0, y: 0 })
            setIsResizing(false)
          }}
          grid={[itemWidth, itemHeight]}
        >
          <Box
            className="cancel"
            position="absolute"
            right={`${resizePosition.x}px`}
            bottom={`${resizePosition.y}px`}
            height={resizeSize}
            width={resizeSize}
            zIndex="100"
            padding={'3px'}
            sx={{
              cursor: 'nwse-resize',
            }}
          >
            <Box
              src={resizeIcon}
              component="img"
              width="100%"
              height="100%"
              sx={{
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            ></Box>
          </Box>
        </Draggable>
        {children}
      </Box>
    </Draggable>
  )
}
