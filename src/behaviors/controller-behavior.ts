import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';
import debug from 'debug/src/browser';

const log = debug('solar:ControllerBehavior');

/**
 * Used to implement a Controller Component logic.
 * A controller component is a singleton that can make operations in a context of layout, breaking the atomic design.
 * Is useful to create modals, toasts etc.
 * This was based on the abstraction from Ionic Team.
 */
export class ControllerBehavior<C> extends ComponentBehavior<ControllerComponent<C>> {
  /**
   * The element that it is bounded.
   */
  root: HTMLElement;

  /**
   * Bound the controller to the provided bound or to the parentElement.
   */
  attach() {
    this.root = document.querySelector(this.component.bound) || this.component.host.parentElement;
    log('Bounding', this.root);
  }

  /**
   * Create a new element by the Controller's managed target and append it to the bound parent.
   * @param props
   */
  async create(props: ControllerProps<C>) {
    const element = <HTMLStencilElement> document.createElement(this.component.target);
    const {content, templateId, ...realProps} = props as any;

    Object.assign(element, realProps);

    log('Creating', element);

    if (templateId) {
      const template = <HTMLTemplateElement> document.getElementById(templateId);
      element.appendChild(template.content.cloneNode(true));
    } else if (content) {
      if (content instanceof HTMLElement) {
        element.appendChild(content)
      } else {
        element.innerHTML = content;
      }
    }

    this.root.appendChild(element);
    await element.componentOnReady();

    return element;
  }
}

/**
 * Represents a Controller Component that will manage to create a new target component.
 */
export interface ControllerComponent<C> extends ComponentBase {
  /**
   * The instance of this behaviour.
   */
  controllerBehavior: ControllerBehavior<C>;

  /**
   * The tag of the component that will be managed.
   */
  target: string;

  /**
   * An optional property used to refer the parent element that the component will be attached to.
   * @Prop
   */
  bound: string;

  /**
   * Set properties to the managed component.
   * @Method
   */
  set?(props: ControllerProps<C>): void

  /**
   * Clear properties of the managed component.
   * @Method
   */
  clear?(): void

}

export type ControllerProps<C> = {
  [key in keyof C]?: any;
};
