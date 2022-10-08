export const convertMapToArray = (map: any) =>
  Array.from(map, ([name, value]) => value)
