import { Component, Listen, Prop } from '@stencil/core';

/**
 * Accera's header webcomponent.
 */
@Component({
  tag: 'ac-header',
  styleUrl: 'ac-header.scss',
  shadow: false,
})
export class AcHeader {

  @Prop({ reflectToAttr: true, mutable: true }) scrolled: boolean;

  @Listen('window:contentScroll')
  handleLayoutContentScroll(ev) {
    this.scrolled = ev.detail.top > 0;
  }

  hostData() {
    return {
      class: {
        'ac-header--scrolled': this.scrolled,
      }
    };
  }

  render() {
    return [
      <header class="ac-header__header-container">
        <div class="ac-header__content">
          <slot />
        </div>
        <div class="ac-header__actions">
          <slot name="actions" />
        </div>
      </header>,
      <slot name="sub-header" />
    ];
  }
}
