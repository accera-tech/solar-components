import { Component, Element, Prop } from '@stencil/core';

/**
 * Accera's Sidebar webcomponent.
 */
@Component({
  tag: 'ac-navdrawer',
  styleUrl: 'ac-navdrawer.scss',
  shadow: true
})
export class AcNavdrawer {
  @Element() host: HTMLAcNavdrawerElement;

  /**
   * The color theme.
   */
  @Prop() theme: string;

  componentDidUnload() {}

  hostData() {
    return {
      attribute: 'nav',
      class: {
        [`ac-navdrawer--${this.theme}`]: !!this.theme,
      }
    };
  }

  render() {
    return [
      <div class="ac-navdrawer__header">
        <slot name="header-title" />
        <slot name="header-actions" />
      </div>,
      <nav class="ac-navdrawer__content">
        <slot name="content" />
      </nav>,
    ];
  }
}
