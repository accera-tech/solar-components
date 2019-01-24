/**
 * Check if a node creates a shadow dom.
 * @param el
 */
export function hasShadowDom(el: HTMLElement) {
  return !!el.shadowRoot && !!(el as any).attachShadow;
}
