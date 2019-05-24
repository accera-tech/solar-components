import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ac-menu-item',
  styleUrl: 'ac-menu-item.scss'
})
export class AcMenu {

  @Prop() iconOnly: boolean;

  @Prop() href: string;

  hostData() {
    return {
      class: {
        'ac-menu-item--icon-only': this.iconOnly
      }
    };
  }

  render() {
    return (
      <a class="ac-menu-item__native" href={this.href}>
        <span class="ac-menu-item__icon-start">
          <slot name="icon-start" />
        </span>
        <span class="ac-menu-item__text">
          <slot />
        </span>
      </a>
    );
  }
}
