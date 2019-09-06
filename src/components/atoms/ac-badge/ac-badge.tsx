import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ac-badge',
  styleUrl: 'ac-badge.scss',
})

export class AcBadge {
  @Prop() theme: 'alert' | 'warning' | 'success' | 'info';

  @Prop() floating: boolean;

  render() {
    return (
      <Host
        class={{
          [`ac-badge--${this.theme}`]: this.theme !== undefined,
          'ac-badge--floating': this.floating,
        }}
      >
        <a class="ac-badge__native">
          <slot/>
        </a>
      </Host>
    )
  }
}
