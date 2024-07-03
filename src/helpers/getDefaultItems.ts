import { DragItem } from '../types'

export const getDefaultItems = (options: {
  itemWidth: number
  itemHeight: number
}): DragItem[] => {
  const { itemHeight, itemWidth } = options

  return [
    {
      id: 1,
      text: 'ФИО',
      x: 0,
      y: 0,
      countWidth: 2,
      countHeight: 3,
    },
    {
      id: 2,
      text: 'Контактная информация',
      x: 0 * itemWidth,
      y: 3 * itemHeight,
      countWidth: 2,
      countHeight: 2,
    },
    {
      id: 3,
      text: 'Дата рождения',
      x: 0 * itemWidth,
      y: 5 * itemHeight,
      countWidth: 2,
    },
    {
      id: 4,
      text: 'Языки',
      x: 0 * itemWidth,
      y: 6 * itemHeight,
      countWidth: 2,
    },
    {
      id: 9,
      text: 'Интересы',
      x: 0 * itemWidth,
      y: 7 * itemHeight,
      countWidth: 2,
    },
    {
      id: 5,
      text: 'Описание',
      x: 2 * itemWidth,
      y: 0 * itemHeight,
      countWidth: 4,
      countHeight: 2,
    },
    {
      id: 6,
      text: 'Опыт работы',
      x: 2 * itemWidth,
      y: 2 * itemHeight,
      countWidth: 4,
      countHeight: 3,
    },
    {
      id: 7,
      text: 'Образование',
      x: 2 * itemWidth,
      y: 5 * itemHeight,
      countWidth: 4,
      countHeight: 3,
    },
    {
      id: 8,
      text: 'Достижения',
      x: 2 * itemWidth,
      y: 8 * itemHeight,
      countWidth: 4,
      countHeight: 2,
    },
  ]
}
