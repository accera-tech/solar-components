export function assignPath(target, path, value) {
  const pathTokens = path.split(/\[/).map(p => p.replace(/\]/, ''));
  let i;
  let actualTarget = target;
  let lastTarget = null;
  for (i = 0; i < pathTokens.length; i++) {
    if (/^(\s*|\d+)$/.test(pathTokens[i])) {
      if (!(lastTarget[pathTokens[i - 1]] instanceof Array)) lastTarget[pathTokens[i - 1]] = [];

      const tempActual = actualTarget;
      actualTarget = lastTarget[pathTokens[i - 1]];
      lastTarget = tempActual;
      continue;
    }
    if (actualTarget instanceof Array) actualTarget.push(actualTarget[pathTokens[i]] || {});
    else actualTarget[pathTokens[i]] = actualTarget[pathTokens[i]] || {};

    lastTarget = actualTarget;
    actualTarget = actualTarget[pathTokens[i]];
  }

  if (actualTarget instanceof Array) actualTarget.push(value);
  else lastTarget[pathTokens[i - 1]] = value;
  return target;
}

export function serialize(form: HTMLFormElement) {
  const obj = {};

  Array.prototype.slice.call(form.querySelectorAll('[name]'))
    .forEach(function (field) {
      if (field.name && ['file', 'reset', 'button'].indexOf(field.type) === -1) {
        switch (field.type) {
          case 'select-multiple':
            const options = [];
            Array.prototype.slice.call(field.options).forEach(function (option) {
              if (option.selected) options.push(option.value);
            });
            assignPath(obj, field.name, options);
            break;

          case 'checkbox':
          case 'radio':
            if (field.checked) assignPath(obj, field.name, true);
            break;

          default:
            if (field.value) assignPath(obj, field.name, field.value);
            break
        }
      }
    });

  return obj;
}

