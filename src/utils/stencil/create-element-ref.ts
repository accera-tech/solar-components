type NativeRefFunction = (elm?: HTMLElement) => void;

/**
 * Represents a reference function that contains a nativeElement instance.
 * @link https://stenciljs.com/docs/templating-jsx#getting-a-reference-to-a-dom-element
 */
export interface ElementRef<T> extends NativeRefFunction {
  nativeElement?: T;
}

/**
 * Creates a ElementRef function.
 */
export function createElementRef<T extends HTMLElement>(): ElementRef<T> {
  const refFunction: ElementRef<T> = (elt?: HTMLElement) => {
    refFunction.nativeElement = elt as T;
  };
  return refFunction;
}
