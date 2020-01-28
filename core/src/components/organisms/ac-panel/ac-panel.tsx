import { Component, Element, Event, EventEmitter, h } from '@stencil/core';

import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';

/**
 * Accera's Panel webcomponent used as a menu.
 */
@Component({
  tag: 'ac-panel',
  styleUrl: 'ac-panel.scss',
})
export class AcPanel implements TransitionComponent {
  transitionBehavior = new TransitionBehavior(this);
  @Element() host: HTMLAcPanelElement;

  /**
   * Dispatched when the modal closes.
   */
  @Event({ eventName: 'close' }) closeEv: EventEmitter<void>;

  componentWillLoad() {}
  componentDidUnload() {
    this.closeEv.emit();
  }

  render() {
    return [
      <slot name="item-top" />,
      <slot />,
      <slot name="item-bottom" />
    ];
  }
}
