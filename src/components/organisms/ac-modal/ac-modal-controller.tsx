import { Component, Element, Method, Prop } from '@stencil/core';
import { ControllerBehavior, ControllerComponent } from '../../../behaviors/controller-behavior';

@Component({
  tag: 'ac-modal-controller',
})
export class AcModalController implements ControllerComponent<any> {
  controllerBehavior = new ControllerBehavior(this);
  target = 'ac-modal';

  @Element() host: HTMLElement;

  @Prop()
  bound: string;

  @Method()
  set(props: any) {
    return this.controllerBehavior.create(props);
  }
}
