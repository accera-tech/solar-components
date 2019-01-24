import { ComponentInterface } from '@stencil/core';
import { extendMethod } from '../lang/extend-method';

/**
 * Represents a Component that implements a Behavior Modification API.
 */
export interface ComponentBase extends ComponentInterface {
  /**
   * The main native element from the component.
   * @Element
   */
  host: HTMLElement;
}

/**
 * Represents a Component's Behavior Modification.
 */
export abstract class ComponentBehavior<T extends ComponentBase> {
  /**
   * The internal component that this instance is attached.
   */
  component: T;

  /**
   * A hook called after the component load.
   */
  abstract attach(): void;

  /**
   * A hook called before the component destroy.
   */
  abstract detach(): Promise<any> | void;

  constructor(component: T) {
    this.component = component;

    extendMethod(this.component, 'componentDidLoad', componentDidLoad => {
      if (componentDidLoad) componentDidLoad();
      this.attach();
    });

    extendMethod(this.component, 'componentDidUnload', componentDidUnload => {
      if (componentDidUnload) componentDidUnload();
      this.detach();
    })
  }
}
