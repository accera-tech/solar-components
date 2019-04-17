import { Component, Element, Method, Prop } from '@stencil/core';
import { ControllerBehavior, ControllerComponent, ControllerProps } from '../../../../behaviors/controller-behavior/controller-behavior';
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
   * @param props
   */
  @Method()
  async create(props: ControllerProps<AcPanel>) {
    const { popperOptions, popperPivot, ...restProps } = props as any;

    const portal = document.createElement('ac-popper') as HTMLAcPopperElement;
    portal.style.zIndex = '1000';
    portal.popperPivot = popperPivot;
    portal.popperOptions = {
      onCreate: (data: any) => {
        data.instance.popper.style.width = data.offsets.reference.width + 'px';
        data.instance.scheduleUpdate();
      },
      onUpdate: (data: any) => {
        data.instance.popper.style.width = data.offsets.reference.width + 'px';
      },
      ...popperOptions
    };

    return await this.controllerBehavior.create({ portal, ...restProps});
  }

  /**
   * Clear all modals that are displayed.
   */
  @Method()
  async dismiss(elt?: HTMLAcPanelElement) {
    if (elt) {
      elt.remove();
    }
  }


  componentDidUnload() {}
}
