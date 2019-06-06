export function toArray(value) {
  return value ?
    value instanceof Array ? value : [ value ]
    : [];
}
