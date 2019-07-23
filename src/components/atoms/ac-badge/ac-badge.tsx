import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ac-badge',
  styleUrl: 'ac-badge.scss',
})

export class AcBadge {
  @Prop() type: 'alert' | 'warning' | 'success';

  @Prop() text: string;

  @Prop() upperCase: boolean;
  hostData() {
    return {
      attribute: 'badge',
      class: {
        [`ac-badge--${this.type}`]: this.type !== undefined,
      }
    };
  }
  render() {
    return [
      <div class="ac-badge-background">{this.upperCase ? this.text.toUpperCase() : this.text }</div>
    ]
  }
}
