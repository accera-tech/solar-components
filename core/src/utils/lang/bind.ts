/**
 * A method decorator that binds a method to it instance.
 */
// @ts-ignore
export function Bind(target: any, name: string, descriptor: PropertyDescriptor) {
  return {
    get() {
      const bound = descriptor.value.bind(this);
      Object.defineProperty(this, name, {
        value: bound
      });
      return bound;
    }
  };
}
