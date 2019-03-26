import { Component, Element, Method, Prop, State } from '@stencil/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { OverlayBehavior, OverlayComponent } from '../../../behaviors/overlay-behavior';
import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's Sidebar webcomponent.
 */
@Component({
  tag: 'ac-navdrawer',
  styleUrl: 'ac-navdrawer.scss',
  shadow: true
})
export class AcNavdrawer implements OverlayComponent {
  @Element() host: HTMLAcNavdrawerElement;
  overlayBehavior = new OverlayBehavior(this);

  /**
   * The color theme.
   */
  @Prop() theme: string;

  /**
   * Show it as an absolute drawer.
   */
  @Prop() modal: boolean;

  /**
   * In modal mode, it used to control if the drawers is opened.
   */
  @State() isOpened: boolean;

  whenClickOutside() {
    if (this.isOpened) this.toggle();
  }

  componentDidUnload() {}

  /**
   * Toggle opened state of the modal drawer.
   */
  @Method()
  @Bind
  toggle() {
    this.isOpened = !this.isOpened;
  }

  hostData() {
    return {
      attribute: 'nav',
      class: {
        [`ac-navdrawer--${this.theme}`]: !!this.theme,
        'ac-navdrawer--modal': !!this.modal,
        'ac-navdrawer--opened': this.isOpened,
      }
    };
  }

  render() {
    return [
      <div class="ac-navdrawer__header">
        <slot name="header-title" />
        <slot name="header-actions" />
        { this.modal ?
          <ac-button
            onClick={this.toggle}
            fill="clear"
            theme="primary"
            icon-only>
            <ac-fa-icon icon={faTimes} />
          </ac-button> : null
        }
      </div>,
      <div class="ac-navdrawer__content">
        <slot name="content" />
      </div>,
    ];
  }
}
