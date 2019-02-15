import { Component } from '@stencil/core';

/**
 * Accera's header webcomponent.
 */
@Component({
  tag: 'ac-header',
  styleUrl: 'ac-header.scss',
})
export class AcHeader {
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