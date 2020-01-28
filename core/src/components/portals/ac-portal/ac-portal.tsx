import { Component, Element, Prop } from '@stencil/core';

import { PortalBehavior, PortalComponent } from '../../../behaviors/portal-behavior';
import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';

@Component({
  tag: 'ac-portal',
})
export class AcPortal implements PortalComponent, TransitionComponent {
  portalBehavior = new PortalBehavior(this);
  transitionBehavior = new TransitionBehavior(this);

  @Element() host;
  @Prop({ mutable: true }) vchildren;

  componentWillLoad() {}
  componentDidUnload() {}
}
