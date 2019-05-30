import { Component, Element, Method, Prop } from '@stencil/core';

import {
  ControllerBehavior,
  ControllerComponent,
  ControllerComponentOptions
} from '../../../../behaviors/controller-behavior/controller-behavior';
import { AcPopper } from '../../../portals/ac-popper/ac-popper';
import { AcPanel } from '../ac-panel';

/**
 * A controller that creates modal on the screen.
 */
@Component({
  tag: 'ac-panel-controller',
})
export class AcPanelController implements ControllerComponent<AcPanel, HTMLAcPanelElement> {
  /**
   * The instance of the controller behavior that setup the modals on the screen.
   */
  controllerBehavior = new ControllerBehavior(this);

  target = 'ac-panel';

  @Element() host: HTMLElement;

  @Prop() bound: string;

  /**
   * Setup a new modal on the screen.
   */
  @Method()
  async create(props: ControllerComponentOptions<AcPanel & AcPopper>) {
    const { popperPlacement, popperOptions, popperPivot, ...restProps } = props;

    const wrapper = document.createElement('ac-popper') as HTMLAcPopperElement;
    restProps.wrapper = wrapper;

    wrapper.style.zIndex = '1000';
    wrapper.popperPlacement = popperPlacement;
    wrapper.popperPivot = popperPivot;
    wrapper.popperOptions = {
      onCreate: (data: any) => {
        data.instance.popper.style.width = data.offsets.reference.width + 'px';
        data.instance.scheduleUpdate();
      },
      onUpdate: (data: any) => {
        data.instance.popper.style.width = data.offsets.reference.width + 'px';
      },
      modifiers: {
        preventOverflow: {
          boundariesElement: this.controllerBehavior.root,
        },
      },
      ...popperOptions
    };

    return this.controllerBehavior.create(restProps);
  }

  /**
   * Clear all modals that are displayed.
   */
  @Method()
  async dismiss(elt?: HTMLAcPanelElement) {
    if (elt) {
      return elt.remove();
    }
  }

  componentDidUnload() {}
}
