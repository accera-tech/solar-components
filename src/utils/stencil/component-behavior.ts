import { ComponentInterface } from '@stencil/core';
import { extendMethod } from '../lang/extend-method';

/**
 * Represents a Component that implements a Behavior Modification API.
 */
export interface ComponentBase extends ComponentInterface {
  /**
   * The main native nativeElement from the component.
   * @Element
   */
  host: HTMLElement;

  /**
   * The unload lifecycle hook.
   * Note that Stencil only calls componentDidUnload if it is declared in the component.
   */
  componentDidUnload: () => void;
}

/**
 * Represents a Component's Behavior Modification.
 */
export class ComponentBehavior<T extends ComponentBase> {
  /**
   * The internal component that this instance is attached.
   */
  component: T;

  /**
   * A hook called before the component load.
   */
  beforeAttach?(): Promise<any> | void;

  /**
   * A hook called after the component load.
   */
  attach?(): void;

  /**
   * A hook called before the component destroy.
   */
  detach?(): Promise<any> | void;

  constructor(component: T) {
    this.component = component;
    if (this.beforeAttach) this.beforeAttach();

    extendMethod(this.component, 'componentDidLoad', componentDidLoad => {
      if (componentDidLoad) componentDidLoad();
      if (this.attach) this.attach();
    });

    extendMethod(this.component, 'componentDidUnload', componentDidUnload => {
      if (componentDidUnload) componentDidUnload();
      if (this.detach) this.detach();
    });
  }
}
