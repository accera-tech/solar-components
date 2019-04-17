import { FunctionalComponent } from '@stencil/core/dist/client/declarations/stencil.core';
import { ControllerProps} from './controller-behavior';
import { VNode } from '@stencil/core/dist/declarations';

/**
 * Used to create a Component that dispatch a ControllerComponent#set directly from a render tree.
 * This will pass the vchildren as a render function to the controller to render it through the portal.
 * @param controllerRef The reference of the controller element to dispatch.
 */
export function createControllerPortal<C>(controllerRef): FunctionalComponent<ControllerProps<C>> {
  // Controls the host created by the controller.
  let portal;
  let TargetTag;

  return (props: ControllerProps<C> | any, children: VNode | VNode[]) => {
    const { ref: refCallback, reset, onDismiss, ...restProps } = props;

    if (!portal && !reset) {
      controllerRef.create({
          ...props,
          render: ({ ref, Tag }) => {
            TargetTag = Tag;
            return <TargetTag {...restProps} ref={ref}>{children}</TargetTag>
          }
        })
        .then(elt => {
          if (refCallback) refCallback(elt);
          portal = elt.parentElement;
        });
    } else {

      if (!reset) portal.vchildren = <TargetTag {...restProps}>{children}</TargetTag>;
      else {
        // Clears the host if the reset prop is true
        if (portal) controllerRef.dismiss(portal.children[0])
          .then(() => {
            if (onDismiss) onDismiss();
            portal.remove();
            portal = null;
          });
      }
    }

    // void component
    return null;
  };
}
