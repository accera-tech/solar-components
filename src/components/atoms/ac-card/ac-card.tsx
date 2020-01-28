import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Accera's full-featured FontAwesome SVG Icon web-component.
 */
@Component({
  tag: 'ac-card',
  styleUrl: 'ac-card.scss',
})
export class AcCard {
  @Prop({ mutable: true, reflect: true }) theme: string;
  @Prop({ mutable: true, reflect: true }) compact: boolean;

  render() {

    return (
      <Host
        class={{
          [`ac-card--${this.theme}`]: this.theme !== undefined,
          'ac-card--compact': !!this.compact,
        }}
      >
        <slot name="icon-start" />
        <div class="ac-card__wrapper">
          <slot name="header" />
          <slot name="image" />
          <slot name="content" />
          <slot name="actions" />
        </div>
      </Host>
    );
  }
}
