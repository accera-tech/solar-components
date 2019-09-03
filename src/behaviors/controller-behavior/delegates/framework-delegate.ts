/**
 * Represents an integration with a custom dom platform.
 */
export interface FrameworkDelegate {
  /**
   * Create a component from a tag, passing properties to it.
   * @param tag The target tag.
   * @param options The component properties.
   */
  createComponent<E extends HTMLStencilElement>(tag: string, options: any): E;

  /**
   * Attach an element to the dom.
   * @param domRoot The root node.
   * @param element The element to attach.
   */
  attachViewToDom(domRoot: HTMLElement, element): Promise<void>;

  /**
   * Detach an element from the dom.
   * @param element The element to detach.
   * @param props The element props.
   * @param wrapper The wrapper element.
   */
  detachViewFromDom(element, props, wrapper?): Promise<void>;
}
