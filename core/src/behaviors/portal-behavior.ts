import { VNode } from '@stencil/core/dist/declarations';

import { extendMethod } from '../utils/lang/extend-method';
import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';

/**
 * Implements a Portal logic, used to transfer VNode to a custom element by property.
 * This behavior will extend the default component's render function, rendering the VNode passed by the vchildren prop.
 */
export class PortalBehavior extends ComponentBehavior<PortalComponent> {
  constructor(component) {
    super(component);
    extendMethod(component, 'render', original => {
      return component.customRender ? component.customRender(component.vchildren) : component.vchildren || original();
    });
  }
}

/**
 * Represents a component that implements the Portal logic.
 */
export interface PortalComponent extends ComponentBase {
  /**
   * The portalBehavior instance.
   */
  portalBehavior: PortalBehavior;

  /**
   * Used to pass the custom children to the portal.
   * @Prop
   */
  vchildren: VNode | VNode[];

  /**
   * A custom vchildren render function to use instead the default.
   */
  customRender?: (vchildren) => VNode | VNode[];
}
