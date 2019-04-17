import { Component, Prop, Element } from '@stencil/core';
import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';
import { PortalBehavior, PortalComponent } from "../../../behaviors/portal-behavior";
import { PopperBehavior, PopperComponent } from '../../../behaviors/popper-behavior';
import { Placement, PopperOptions } from "popper.js";

@Component({
  tag: 'ac-popper',
})
export class AcPopper implements PortalComponent, TransitionComponent, PopperComponent {
  portalBehavior = new PortalBehavior(this);
  transitionBehavior = new TransitionBehavior(this);
  popperBehavior = new PopperBehavior(this);

  @Element() host;
  @Prop() vchildren;

  @Prop() popperPivot: string | HTMLElement;
  @Prop() popperPlacement: Placement;
  @Prop() popperOptions: PopperOptions;


  componentWillLoad() {}
  componentDidUnload() {}
}
