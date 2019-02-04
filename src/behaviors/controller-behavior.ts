import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';

/**
 * Used to implement a Controller Component logic.
 */
export class ControllerBehavior<T> extends ComponentBehavior<ControllerComponent<T>> {
  root: HTMLElement;

  attach() {
    this.root = document.querySelector(this.component.bound) || this.component.host.parentElement;
  }

  /**
   * Create a new element by the Controller's managed target and append it to the bound parent.
   * @param props
   */
  create(props: ControllerProps) {
    const element = document.createElement(this.component.target);
    const {content, templateId, ...realProps} = props;

    Object.assign(element, realProps);

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
  }
}

/**
 * Represents a Controller Component that will manage to create a new target component.
 */
export interface ControllerComponent<T> extends ComponentBase {
  /**
   * The instance of this behaviour.
   */
  controllerBehavior: ControllerBehavior<T>;

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
  set?(props: ControllerProps): void

  /**
   * Clear properties of the managed component.
   * @Method
   */
  clear?(): void
}

/**
 * Represents the props of a Controlled Component.
 */
export interface ControllerProps {
  content: HTMLElement | string;
  [key: string]: any;
}
