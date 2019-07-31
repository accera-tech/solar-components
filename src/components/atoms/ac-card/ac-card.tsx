import { Component } from '@stencil/core';

/**
 * Accera's full-featured FontAwesome SVG Icon web-component.
 */
@Component({
  tag: 'ac-card',
  styleUrl: 'ac-card.scss',
})
export class AcCard {

  render() {

    return [
      <slot name="header" />,
      <slot name="image" />,
      <slot name="content" />,
      <slot name="actions" />
    ];
  }
}
