export function toArray<T>(value: T | T[]): T[] {
  return value ?
    value instanceof Array ? value : [ value ]
    : [];
}
