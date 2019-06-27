export function Debounced(delay): MethodDecorator {
  return function(target, propName, descriptor: TypedPropertyDescriptor<any>) {
    descriptor.value = debounce(target[propName], delay);
    return descriptor;
  };
}

export function debounce(func, delay) {
  let debounceTimer;
  return function(...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}
