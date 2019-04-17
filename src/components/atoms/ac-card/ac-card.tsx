import { Component, Prop } from '@stencil/core';

/**
 * Accera's full-featured FontAwesome SVG Icon webcomponent.
 */
@Component({
  tag: 'ac-card',
  styleUrl: 'ac-card.scss',
})
export class AcCard {
  /**
   * The icon imported from @fortawesome/free-solid-svg-icons.
   */
  @Prop() icon;

  render() {

    return [
      <slot name="header" />,
      <slot name="image" />,
      <slot name="content" />,
      <slot name="actions" />
    ];
  }
}
