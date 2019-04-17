import { ComponentBase, ComponentBehavior } from '../../utils/stencil/component-behavior';
import debug from 'debug/src/browser';

const log = debug('solar:ControllerBehavior');

/**
 * Used to implement a Controller Component logic.
 * A controller component is a singleton that can make operations in a context of all the layout, breaking the atomic design.
 * Use it to create modals, toasts, floating panels etc.
 * This was based on the abstraction from Ionic Team.
 */
export class ControllerBehavior<C, H extends HTMLElement> extends ComponentBehavior<ControllerComponent<C, H>> {
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
   * Clear the controller before unload.
   */
  detach(): Promise<any> | void {
    return this.component.clear ? this.component.clear() : null;
  }

  /**
   * Create a new element by the Controller's managed target and append it to the bound parent.
   * @param props The properties based on the target component.
   */
  async create(props: ControllerProps<C>) {
    const { component, portal, render, ...restProps } = props as any;

    if (portal && render) {
      return await new Promise(res => {
        portal.vchildren = render({ ref: res, Tag: this.component.target });
        this.root.appendChild(portal);
      });
    } else {
      const element = <HTMLStencilElement>document.createElement(this.component.target);
      if (restProps) Object.assign(element, restProps);

      if (component) {
        if (typeof component == 'string') {
          // The component is an template id:
          const componentElt = <HTMLTemplateElement>document.getElementById(component);
          if (componentElt) {
            element.appendChild(componentElt.content.cloneNode(true));
          } else {
            // The component is a HTML String:
            element.innerHTML = component;
          }
        } else {
          // The component is a HTMLElement:
          element.appendChild(component)
        }
      }

      if (portal) {
        portal.appendChild(element);
        this.root.appendChild(portal);
      } else {
        this.root.appendChild(element);
      }

      await element.componentOnReady();

      return element;
    }
  }
}

/**
 * Represents a Controller Component that will manage to create a new target component.
 */
export interface ControllerComponent<C, H extends HTMLElement> extends ComponentBase {
  /**
   * The instance of this behaviour.
   */
  controllerBehavior: ControllerBehavior<C, H>;

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
  create(props: ControllerProps<C>): Promise<H>

  /**
   * Clear properties of the managed component.
   * @Method
   */
  dismiss(elt?: any): Promise<any>

}



// @TODO: Future framework integrations.
/////////////////////////////////////////////////////////

export interface ControlledComponent extends ComponentBase {
  /**
   * Represents the target inner element.
   */
  component?: ComponentRef;

  /**
   * The Framework internal.
   */
  delegate?: FrameworkDelegate;
}

export type ControllerProps<C> = {
  [key in keyof C]?: any;
};

export type ComponentRef = Function | HTMLElement | string;

export interface FrameworkDelegate {
  attachViewToDom(container: any, component: any, propsOrDataObj?: any, cssClasses?: string[]): Promise<HTMLElement>;
  removeViewFromDom(container: any, component: any): Promise<void>;
}
