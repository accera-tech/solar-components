import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';

export class ControllerBehavior<T> extends ComponentBehavior<ControllerComponent<T>> {
  root: HTMLElement;

  attach() {
    this.root = document.querySelector(this.component.bound) || this.component.host.parentElement;
  }

  create(props: ControllerProps) {
    const element = document.createElement(this.component.target);

    Object.keys(props).forEach(key => {
      element[key] = props[key];
    });

    // if (props.templateId) {
    //   const content = document.getElementById(props.templateId).content;
    //   const clone2 = document.importNode(t.content, true);
    // } else
    if (props.children) {
      if (props.children instanceof HTMLElement) {
        element.appendChild(props.children)
      } else {
        element.innerHTML = props.children;
      }
    }

    this.root.appendChild(element);
  }
}

export interface ControllerComponent<T> extends ComponentBase {
  controllerBehavior: ControllerBehavior<T>;
  target: string;

  /**
   * @Prop
   */
  bound: string;

  /**
   * @Method
   */
  set?(props: ControllerProps): void

  /**
   * @Method
   */
  clear?(): void
}

export interface ControllerProps {
  children: HTMLElement | string;
  [key: string]: any;
}
