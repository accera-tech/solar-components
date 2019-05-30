/**
 * Extend a method functionality, applying monkeypatch method.
 * @link https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/
 * @param target The target object.
 * @param method The name of the method that will be extended.
 * @param extend The method's patch.
 */
export function extendMethod(target: any, method: string, extend: (original: Function, args?: any[]) => any) {
  const original = target[method];

  target['__' + method + '__patch_list'] = target['__' + method + '__patches'] || [];
  const patchList = target['__' + method + '__patch_list'];

  patchList.push(extend);

  target[method] = function(...args) {
    let lastResult;
    for (const patch of patchList) {
      lastResult = patch.bind(this)(original ? original.bind(this) : null, args);
    }
    return lastResult;
  };
}
