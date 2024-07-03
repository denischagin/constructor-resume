export const validatePoint = (
  point: number,
  maxPoint: number,
  minPoint: number,
  defaultPoint: number,
): number => {
  let result = point

  if (point > maxPoint) result = defaultPoint
  if (point < minPoint) result = defaultPoint

  return result
}
