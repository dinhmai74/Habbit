// eslint-disable-next-line import/prefer-default-export
export const capitalize = (s: string): string => {
  if (!s) { return s }
  return s[0].toUpperCase() + s.slice(1)
}
