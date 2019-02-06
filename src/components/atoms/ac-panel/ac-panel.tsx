import { Component, Element } from '@stencil/core';
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

  componentWillLoad() {}

  render() {
    return (
      <slot />
    );
  }
}
