/**
 * Check if a node creates a shadow dom.
 */
export function hasShadowDom(el: HTMLElement) {
  return !!el.shadowRoot && !!(el as any).attachShadow;
}
