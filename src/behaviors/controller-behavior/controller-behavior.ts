import { VNode } from '@stencil/core/dist/declarations/vdom';
import { HTMLStencilElement } from '@stencil/core/internal';

import { FieldsOf } from '../../utils/lang/types';
import { ComponentBase, ComponentBehavior } from '../../utils/stencil/component-behavior';

import { FrameworkDelegate } from './delegates/framework-delegate';
import { nativeDelegate } from './delegates/native-delegate';

/**
 * Used to implement a Controller Component logic.
 * A controller component is a singleton that can make operations in a context of all the layout,
 * breaking the atomic design.
 * Use it to create modals, toasts, floating panels etc.
 * This was based on the abstraction from Ionic Team.
 */
export class ControllerBehavior<C, E extends HTMLStencilElement> extends ComponentBehavior<ControllerComponent<C, E>> {
  /**
   * The element that it is bounded.
   */
  root: HTMLElement;

  /**
   * Bound the controller to the provided bound or to the parentElement.
   */
  attach() {
    this.root = document.querySelector(this.component.bound) || this.component.host.parentElement;
  }

  /**
   * Clear the controller before unload.
   */
  detach(): Promise<any> | void {
    return this.component.dismissAll ? this.component.dismissAll() : null;
  }

  /**
   * Create a new element by the Controller's managed target and append it to the bound parent.
   * @param options The properties based on the target component.
   * @param customDelegate A custom DOM api used to attach the component.
   */
  async create(
    options: ControllerComponentOptions<C>,
    customDelegate?: FrameworkDelegate
  ): Promise<E & HTMLStencilControlledElement<C, E>> {

    const { wrapper, render, ...props } = options;
    const delegate = customDelegate || nativeDelegate;

    if (render) {
      // Using a portal
      return new Promise(res => {
        wrapper.vchildren = render({ ref: res, Tag: this.component.target });
        this.root.appendChild(wrapper);
      });
    } else {
      // Using delegate
      const element =
        await delegate.createComponent<E & HTMLStencilControlledElement<C, E>>(this.component.target, props);

      element.controller = this.component;
      element._resolveDismiss = null;
      element._resolveWillDismiss = null;
      element.onDidDismiss = () => new Promise(res => element._resolveDismiss = res);
      element.onWillDismiss = () => new Promise(res => element._resolveWillDismiss = res);
      element.dismiss = async data => {
        let canDismiss = true;
        if (this.component.willDismissComponent) {
          canDismiss = await this.component.willDismissComponent(element, data);
        }
        if (canDismiss) {
          if (element._resolveWillDismiss) {
            await element._resolveWillDismiss(data);
          }
          if (wrapper) {
            await delegate.detachViewFromDom(wrapper, props);
          } else {
            await delegate.detachViewFromDom(element, props);
          }
          if (element._resolveDismiss) {
            await element._resolveDismiss(data);
          }
        }
      };

      if (wrapper) {
        wrapper.appendChild(element);
        await delegate.attachViewToDom(this.root, wrapper);
      } else {
        await delegate.attachViewToDom(this.root, element);
      }

      return element;
    }
  }
}

/**
 * Represents a Controller Component that will manage to create a new target component.
 */
export interface ControllerComponent<C, E extends HTMLStencilElement> extends ComponentBase {
  /**
   * The instance of this behaviour.
   */
  controllerBehavior: ControllerBehavior<C, E>;

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
  create(props: ControllerComponentOptions<C>): Promise<E & HTMLStencilControlledElement<C, E>>;

  /**
   * Clear properties of the managed component.
   * @Method
   */
  dismiss(data?: any): Promise<void>;

  willDismissComponent?(element: E & HTMLStencilControlledElement<C, E>, data?: any): Promise<boolean>;
}

/**
 * Represents the custom props that can be passed to a controlled component.
 */
export type ControllerComponentOptions<C> = FieldsOf<C> & {
  component?: any;
  componentProps?: any;
  wrapper?: any;
  render?: (data) => VNode;
  [key: string]: any;
};

export interface ControlledElementFields {
  onDidDismiss?: <T>() => Promise<T>;
  onWillDismiss?: <T>() => Promise<T>;
  dismiss?: (data: any) => Promise<void>;
  present?: () => Promise<void>;
}

/**
 * Represents a Component that was created by a Controller.
 */
export type HTMLStencilControlledElement<C, E extends HTMLStencilElement> = E & ControlledElementFields & {
  _resolveDismiss: (data) => void;
  _resolveWillDismiss: (data) => void;
  controller: ControllerComponent<C, E>;
};
