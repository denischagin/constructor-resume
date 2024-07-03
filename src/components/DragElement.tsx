import { Box, BoxProps } from '@mui/material'
import { FC, PropsWithChildren, useState } from 'react'
import Draggable, { DraggableProps } from 'react-draggable'
import settingsIcon from '../assets/svg/settings-icon.svg'

export type Element1Props = {
  itemWidth: number
  itemHeight: number
  x: number
  y: number
  boxProps?: BoxProps
  draggableProps: Partial<DraggableProps>
  countWidth?: number
  countHeight?: number
  onToggleSettings?: () => void
  isActive?: boolean
} & PropsWithChildren

export const DragElement: FC<Element1Props> = (props) => {
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
    onToggleSettings,
    isActive,
  } = props
  const { onStop, onStart, ...restDraggableProps } = draggableProps

  const [isDragging, setIsDragging] = useState(false)

  const commonTransitions = [
    'background-color 300ms',
    'height 300ms',
    'width 300ms',
  ]

  return (
    <Draggable
      position={{
        x,
        y,
      }}
      cancel=".settings-icon"
      defaultClassName="element"
      onStop={(...args) => {
        setIsDragging(false)
        onStop && onStop(...args)
      }}
      onStart={(...args) => {
        setIsDragging(true)
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
          isActive ? 'rgba(201, 231, 255, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        }
        textAlign="center"
        boxShadow={2}
        onDoubleClick={onToggleSettings}
        style={{
          transition: [
            ...(!isDragging ? ['transform 300ms ease-in-out'] : []),
            ...commonTransitions,
          ].join(', '),
        }}
        sx={{
          outline: isDragging
            ? (theme) => `2px solid ${theme.palette.primary.main}`
            : '1px solid rgba(0, 0, 0, 0.6)',
          cursor: 'grab',
          '&:active': {
            cursor: 'grabbing',
          },
          ...sx,
        }}
        {...boxProps}
      >
        <Box
          position="absolute"
          borderRadius="50%"
          width="25px"
          height="25px"
          bottom={6}
          right={6}
          className="settings-icon"
          sx={{
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src={settingsIcon}
            zIndex="5"
            onClick={onToggleSettings}
          ></Box>
        </Box>
        {children}
      </Box>
    </Draggable>
  )
}
