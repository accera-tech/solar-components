type NativeRefFunction = (elm?: HTMLElement) => void;

export interface RefFunction<T> extends NativeRefFunction {
  element?: T;
}

export function createRef<T extends HTMLElement>(): RefFunction<T> {
  const refFunction: RefFunction<T> = function (elt?: HTMLElement) {
    refFunction.element = elt as T;
  };
  return refFunction;
}
