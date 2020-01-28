import { Component, Element, Method, Prop } from '@stencil/core';

import {
  ControllerBehavior,
  ControllerComponent,
  ControllerComponentOptions, HTMLStencilControlledElement,
} from '../../../../behaviors/controller-behavior/controller-behavior';
import { AcToast } from '../ac-toast';

@Component({
  tag: 'ac-toast-controller',
})

export class AcToastController implements ControllerComponent<AcToast, HTMLAcToastElement> {
  controllerBehavior = new ControllerBehavior(this);

  target = 'ac-toast';

  toastList: HTMLStencilControlledElement<AcToast, HTMLAcToastElement>[] = [];

  @Element() host: HTMLElement;

  @Prop() bound: string;

  @Method()
  async create(props: ControllerComponentOptions<AcToast>) {
    const wrapper = document.createElement('ac-overlay') as any;
    wrapper.noLayer = true;
    wrapper.position = 'flex-end flex-end';
    props.wrapper = wrapper;

    const toast = await this.controllerBehavior.create(props);

    toast.addEventListener('close', () => {
      wrapper.remove();
    });

    this.toastList.push(toast);

    setTimeout(() => {
      wrapper.remove()
    }, props.time || 3000);

    return toast;
  }

  @Method()
  async dismiss(data) {
    const topToast = this.toastList.pop();
    return topToast.dismiss(data);
  }

  componentDidUnload() {
  }

}
