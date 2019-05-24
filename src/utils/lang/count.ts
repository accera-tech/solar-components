/**
 * Create a array based on a length, useful for arbitrary iterations.
 */
export function count(to: number) {
  const array = [];
  for (let i = 0; i < to; i++) {
    array.push(i);
  }
  return array;
}
