export const roundByNumber = (
  target: number,
  roundToNumber: number,
): number => {
  return Math.round(target / roundToNumber) * roundToNumber
}
