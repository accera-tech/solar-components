/**
 * Extend a method functionality, applying monkeypatch method.
 * @link https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/
 * @param target The target object.
 * @param method The name of the method that will be extended.
 * @param extend The method's patch.
 */
export function extendMethod(target: any, method: string, extend: (original: Function, args?: Array<any>) => any) {
  target['_' + method] = target[method];
  target[method] = function (...args) {
    return extend.bind(this)(target['_' + method] ? target['_' + method].bind(this) : null, args);
  }
}
