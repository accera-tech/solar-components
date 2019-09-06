import { Component, Element, Prop, h } from '@stencil/core';
import { Placement, PopperOptions } from 'popper.js';

import { PopperBehavior, PopperComponent } from '../../../behaviors/popper-behavior';
import { PortalBehavior, PortalComponent } from '../../../behaviors/portal-behavior';
import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';

@Component({
  tag: 'ac-popper',
})
export class AcPopper implements PortalComponent, TransitionComponent, PopperComponent {
  portalBehavior = new PortalBehavior(this);
  transitionBehavior = new TransitionBehavior(this);
  popperBehavior = new PopperBehavior(this);

  @Element() host;
  @Prop({ mutable: true }) vchildren;

  @Prop() popperPivot: string | HTMLElement;
  @Prop() popperPlacement: Placement;
  @Prop() popperOptions: PopperOptions;

  componentWillLoad() {}
  componentDidUnload() {}

  render() {
    return [
      <slot />
    ];
  }
}
