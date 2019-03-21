/**
 * Useful to create iterations based on a count.
 * @param to
 */
export function count(to: number) {
  const array = [];
  for (let i = 0; i < to; i++) {
    array.push(i);
  }
  return array
}
