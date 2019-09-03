import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ac-badge',
  styleUrl: 'ac-badge.scss',
})

export class AcBadge {
  @Prop() theme: 'alert' | 'warning' | 'success' | 'info';

  @Prop() floating: boolean;

  hostData() {
    return {
      attribute: 'badge',
      class: {
        [`ac-badge--${this.theme}`]: this.theme !== undefined,
        'ac-badge--floating': this.floating,
      }
    };
  }
  render() {
    return [
      <a class="ac-badge__native">
        <slot />
      </a>
    ]
  }
}
