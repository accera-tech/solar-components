import { h } from '@stencil/core';
import { FunctionalComponent, VNode } from '@stencil/core/dist/declarations/vdom';

import { ControlledElementFields, ControllerComponentOptions } from './controller-behavior';

/**
 * Used to create a Component that dispatch a ControllerComponent#set directly from a render tree.
 * This will pass the vchildren as a render function to the controller to render it through the portal.
 * @param controllerRef The reference of the controller element to dispatch.
 */
export function createControllerPortal<C>(controllerRef)
  : FunctionalComponent<ControllerComponentOptions<C> & ControlledElementFields> {

  // Controls the host created by the controller.
  let portal;
  let TargetTag;

  return (props: ControllerComponentOptions<C> & ControlledElementFields | any, children: VNode | VNode[]) => {
    const { ref: refCallback, reset, onDidDismiss, ...restProps } = props;

    if (!portal && !reset) {
      controllerRef.create({
          ...props,
          render: ({ ref, Tag }) => {
            TargetTag = Tag;
            return <TargetTag {...restProps} ref={ref}>{children}</TargetTag>;
          }
        })
        .then(elt => {
          if (refCallback) { refCallback(elt); }
          portal = elt.parentElement;
        });
    } else if (!reset) {
      portal.vchildren = <TargetTag {...restProps}>{children}</TargetTag>;
      portal.forceUpdate();
    } else {
      // Clears the host if the reset prop is true
      if (portal) {
        if (onDidDismiss) {
          onDidDismiss();
        }
        portal.remove();
        portal = null;
      }
    }

    // void component
    return null;
  };
}
