import { Component, Prop, Element } from '@stencil/core';
import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';
import { PortalBehavior, PortalComponent } from "../../../behaviors/portal-behavior";

@Component({
  tag: 'ac-portal',
})
export class AcPortal implements PortalComponent, TransitionComponent {
  portalBehavior = new PortalBehavior(this);
  transitionBehavior = new TransitionBehavior(this);

  @Element() host;
  @Prop() vchildren;


  componentWillLoad() {}
  componentDidUnload() {}
}
