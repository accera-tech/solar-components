import { Component, Element, Method, Prop } from '@stencil/core';

import {
  ControllerBehavior,
  ControllerComponent,
  ControllerComponentOptions, HTMLStencilControlledElement,
} from '../../../../behaviors/controller-behavior/controller-behavior';
import { ScrollManager } from '../../../../utils/scroll-manager';
import { AcOverlay } from '../../../portals/ac-overlay/ac-overlay';
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
  modalList: HTMLStencilControlledElement<AcModal, HTMLAcModalElement>[] = [];

  @Element() host: HTMLElement;

  @Prop() bound: string;

  /**
   * Setup a new modal on the screen.
   */
  @Method()
  async create(props: ControllerComponentOptions<AcModal & AcOverlay>) {
    const wrapper = document.createElement('ac-overlay') as HTMLAcOverlayElement;
    props.wrapper = wrapper;

    const modal =
      await this.controllerBehavior.create(props);

    wrapper.addEventListener('backDropClick', () => {
      modal.remove();
    });

    modal.addEventListener('close', () => {
      wrapper.remove();
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
  async dismiss(data) {
    const topModal = this.modalList.pop();
    return topModal.dismiss(data);
  }

  componentDidUnload() {}
}
