import { Component, Element, Method, Prop } from '@stencil/core';
import { ControllerBehavior, ControllerComponent } from '../../../behaviors/controller-behavior';

@Component({
  tag: 'ac-modal-controller',
})
export class AcModalController implements ControllerComponent<any> {
  controllerBehavior = new ControllerBehavior(this);
  target = 'ac-modal';

  modalList: HTMLAcModalElement[] = [];

  @Element() host: HTMLElement;

  @Prop()
  bound: string;

  @Method()
  async set(props: any) {
    const newModal = await this.controllerBehavior.create(props);
    this.modalList.push(newModal);
    return newModal;
  }

  @Method()
  clear() {
    return Promise.all(this.modalList.map(modal => {
      modal.close();
    }));
  }
}
