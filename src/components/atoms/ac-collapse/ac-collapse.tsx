import { Component, Prop } from '@stencil/core';

/**
 * Accera's Collapse webcomponent.
 */
@Component({
  tag: 'ac-collapse',
  styleUrl: 'ac-collapse.scss',
  shadow: true
})
export class AcCollapse {

  /**
   * If this collapse is opened.
   */
  @Prop() open: boolean;

  hostData() {
    return {
      class: {
        'ac-collapse--open': this.open
      }
    }
  }

  render() {
    return (
      <slot />
    );
  }
}
