import { Component, Element, Method, Prop } from '@stencil/core';
import { ControllerBehavior, ControllerComponent } from '../../../behaviors/controller-behavior';
import { ScrollManager } from '../../../utils/scroll-manager';

/**
 * A controller that creates modal on the screen.
 */
@Component({
  tag: 'ac-modal-controller',
})
export class AcModalController implements ControllerComponent<any> {
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
  async set(props: any) {
    const newModal = await this.controllerBehavior.create(props);

    newModal.addEventListener('close', () => {
      ScrollManager.enable();
    });

    this.modalList.push(newModal);
    ScrollManager.disable();
    return newModal;
  }

  /**
   * Clear all modals that are displayed.
   */
  @Method()
  clear() {
    return Promise.all(this.modalList.map(modal => {
      modal.close();
    }));
  }

  componentDidUnload() {}
}
