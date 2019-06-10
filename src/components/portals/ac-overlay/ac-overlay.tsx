import { Component, Element, Event, EventEmitter, Method, Prop } from '@stencil/core';

import { PortalBehavior, PortalComponent } from '../../../behaviors/portal-behavior';
import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';
import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's Panel webcomponent used as a menu.
 */
@Component({
  tag: 'ac-overlay',
  styleUrl: 'ac-overlay.scss',
})
export class AcOverlay implements PortalComponent, TransitionComponent {
  portalBehavior = new PortalBehavior(this);
  transitionBehavior = new TransitionBehavior(this);

  @Element() host: HTMLAcOverlayElement;

  @Prop({ mutable: true }) vchildren;

  /**
   * The backdrop theme.
   */
  @Prop() backdrop: 'dark' | 'light' = 'dark';

  /**
   * Content position based on flex layout.
   */
  @Prop() position:
    'start start' | 'start center' | 'start end' |
    'center start' | 'center center' | 'center end' |
    'end start' | 'end center' | 'end end' = 'center center';

  @Prop() disableClose: boolean;

  @Event({ eventName: 'backDropClick' }) backDropClick: EventEmitter<void>;

  componentWillLoad() {}

  componentDidUnload() {}

  @Bind
  @Method()
  handleBackDropClick() {
    this.backDropClick.emit();
  }

  hostData() {
    return {
      class: {
        [`ac-overlay--backdrop-${this.backdrop}`]: !!this.backdrop,
      },
      style: {
        justifyContent: this.position.split(' ')[0],
        alignItems: this.position.split(' ')[1],
      }
    };
  }

  render() {
    return [
      <div class="ac-overlay--layer" onClick={this.handleBackDropClick}/>,
      <slot />
    ];
  }
}
