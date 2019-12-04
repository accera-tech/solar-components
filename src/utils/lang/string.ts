export const dashToCamelCase = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());

export const isEmpty = str => str === undefined || str === null || str === '';