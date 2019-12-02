/**
 * Used to assign into a object field, accessing it by it Form Data Path,
 * commonly used in PHP's form data parsing engine.
 * @param target The target Object that will be assigned.
 * @param path The Form Data Path to assign the value. Ex: `user[name]`.
 * @param value The value of the field.
 */
export function assignByFormDataPath(target, path, value) {
  const pathTokens = path.split(/\[/).map(p => p.replace(/\]/, ''));
  let i;
  let actualTarget = target;
  let lastTarget = null;
  for (i = 0; i < pathTokens.length; i++) {
    if (/^(\s*|\d+)$/.test(pathTokens[i])) {
      if (!(lastTarget[pathTokens[i - 1]] instanceof Array)) {
        lastTarget[pathTokens[i - 1]] = [];
      }

      const tempActual = actualTarget;
      actualTarget = lastTarget[pathTokens[i - 1]];
      lastTarget = tempActual;
      continue;
    }
    if (Array.isArray(actualTarget)) {
      actualTarget.push(actualTarget[pathTokens[i]] || {});
    } else {
      actualTarget[pathTokens[i]] = actualTarget[pathTokens[i]] || {};
    }

    lastTarget = actualTarget;
    actualTarget = actualTarget[pathTokens[i]];
  }

  if (actualTarget instanceof Array) {
    actualTarget.push(value);
  } else {
    lastTarget[pathTokens[i - 1]] = value;
  }
  return target;
}
