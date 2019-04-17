import { Component, Element, Method, Prop } from '@stencil/core';
import { ControllerBehavior, ControllerComponent, ControllerProps } from '../../../../behaviors/controller-behavior/controller-behavior';
import { ScrollManager } from '../../../../utils/scroll-manager';
import { AcModal } from '../ac-modal';

/**
 * A controller that creates modal on the screen.
 */
@Component({
  tag: 'ac-modal-controller',
})
export class AcModalController implements ControllerComponent<AcModal, HTMLAcModalElement> {
  /**
   * The instance of the controller behavior that setup the modals on the screen.
   */
  controllerBehavior = new ControllerBehavior(this);

  target = 'ac-modal';

  /**
   * The list of modals that are displayed.
   */
  modalList: HTMLAcModalElement[] = [];

  @Element() host: HTMLElement;

  @Prop() bound: string;

  /**
   * Setup a new modal on the screen.
   * @param props
   */
  @Method()
  async create(props: ControllerProps<AcModal>) {
    const portal = document.createElement('ac-overlay') as HTMLAcOverlayElement;

    const modal = await this.controllerBehavior.create({ portal, ...props });

    portal.addEventListener('backDropClick', () => {
      modal.close();
    });

    modal.addEventListener('close', () => {
      portal.remove();
      ScrollManager.enable();
    });

    this.modalList.push(modal);
    ScrollManager.disable();
    return modal;
  }

  /**
   * Clear all modals that are displayed.
   */
  @Method()
  async dismiss(elt) {
    if (elt) {
      return await elt.close();
    }
    return await Promise.all(this.modalList.map(modal => modal.close()));
  }

  componentDidUnload() {}
}
