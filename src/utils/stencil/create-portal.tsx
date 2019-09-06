import { FunctionalComponent } from '@stencil/core/dist/client/declarations/stencil.core';
import { VNode } from '@stencil/core/dist/declarations';
import { h } from '@stencil/core';

/**
 * Used to render hyperscript in a domPortal component.
 * @param domPortal A component that implements the portal behavior.
 * @param ComponentTag The target component that will be rendered.
 */
export function createPortal<C>(domPortal, ComponentTag): FunctionalComponent<C> {
  return (props: C | any, children: VNode | VNode[]) => {
    domPortal.vchildren = <ComponentTag {...props}>{children}</ComponentTag>;
    return null;
  };
}
