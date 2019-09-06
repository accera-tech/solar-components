import { Component, Element, Event, EventEmitter, Host, Method, Prop, h } from '@stencil/core';

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

  @Prop() noLayer: boolean;

  /**
   * Content position based on flex layout.
   */
  @Prop() position:
    'start start' | 'start center' | 'start flex-end' |
    'center start' | 'center center' | 'center flex-end' |
    'flex-end start' | 'flex-end center' | 'flex-end flex-end' = 'center center';

  @Prop() disableClose: boolean;

  @Event({ eventName: 'backDropClick' }) backDropClick: EventEmitter<void>;

  componentWillLoad() {
  }

  componentDidUnload() {
  }

  @Bind
  @Method()
  async handleBackDropClick() {
    this.backDropClick.emit();
  }

  render() {
    return (
      <Host
        class={{
          [`ac-overlay--backdrop-${this.backdrop}`]: !!this.backdrop,
          'ac-overlay--no-layer': this.noLayer,
        }}
        style={{
          justifyContent: this.position.split(' ')[0],
          alignItems: this.position.split(' ')[1],
        }}
      >
        {!this.noLayer && <div class="ac-overlay--layer" onClick={this.handleBackDropClick}/>}
        <slot/>
      </Host>
    );
  }
}
