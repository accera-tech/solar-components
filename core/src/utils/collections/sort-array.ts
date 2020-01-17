export function sortArray(array, order = 'asc', property) {

  return array.sort((a, b) => {

    // force null to last
    a = a[property] === null || a[property] === undefined ? '' : a[property];
    b = b[property] === null || b[property] === undefined ? '' : b[property];

    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;

    // Return either 1 or -1 to indicate a params priority
    if (order === 'desc') {
      return (b > a) ? 1 : (b < a) ? -1 : 0;
    } else {
      return (a > b) ? 1 : (a < b) ? -1 : 0;
    }
  });
}
