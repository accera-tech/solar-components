import { Component, Element, Method, Prop } from '@stencil/core';

import {
  ControllerBehavior,
  ControllerComponent,
  ControllerComponentOptions,
} from '../../../../behaviors/controller-behavior/controller-behavior';
import { ScrollManager } from '../../../../utils/scroll-manager';
import { AcOverlay } from '../../../portals/ac-overlay/ac-overlay';
import { AcNavdrawer } from '../ac-navdrawer';

/**
 * A controller that creates navdrawer on the screen.
 */
@Component({
  tag: 'ac-navdrawer-controller',
})
export class AcModalController implements ControllerComponent<AcNavdrawer, HTMLAcNavdrawerElement> {
  /**
   * The instance of the controller behavior that setup the modals on the screen.
   */
  controllerBehavior = new ControllerBehavior(this);

  target = 'ac-navdrawer';

  @Element() host: HTMLElement;

  @Prop() bound: string;


  /**
   * Setup a new navdrawer on the screen.
   */
  @Method()
  async create(props: ControllerComponentOptions<AcNavdrawer & AcOverlay>) {
    const wrapper = document.createElement('ac-overlay') as HTMLAcOverlayElement;
    wrapper.backdrop = 'light';
    wrapper.position = props.position;
    props.wrapper = wrapper;
    const navDrawer = await this.controllerBehavior.create({...props, showToggle: false});

    wrapper.addEventListener('backDropClick', () => {
      navDrawer.remove();
    });

    navDrawer.addEventListener('close', () => {
      wrapper.remove();
      ScrollManager.enable();
    });
    ScrollManager.disable();
    return navDrawer;
  }

  /**
   * Clear all modals that are displayed.
   */
  @Method()
  async dismiss() {
    return;
  }

  componentDidUnload() {}
}
