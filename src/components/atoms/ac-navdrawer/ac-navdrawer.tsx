import { Component, Element, Method, Prop } from '@stencil/core';
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
   * In modal mode, it used to control if the drawers is opened.
   */
  @Prop({ mutable: true }) collapsed: boolean;

  whenClickOutside() {
    if (this.collapsed) this.toggle();
  }

  componentDidUnload() {}

  /**
   * Toggle opened state of the modal drawer.
   */
  @Method()
  @Bind
  toggle() {
    this.collapsed = !this.collapsed;
  }

  hostData() {
    return {
      attribute: 'nav',
      class: {
        [`ac-navdrawer--${this.theme}`]: !!this.theme,
        'ac-navdrawer--collapsed': this.collapsed,
      }
    };
  }

  render() {
    return [
      <div class="ac-navdrawer__header">
        <slot name="header-title" />
        <slot name="header-actions" />
      </div>,
      <div class="ac-navdrawer__content">
        <slot name="content" />
      </div>,
    ];
  }
}
