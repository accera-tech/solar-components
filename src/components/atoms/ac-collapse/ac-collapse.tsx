import { Component } from '@stencil/core';

/**
 * Accera's Collapse webcomponent.
 */
@Component({
  tag: 'ac-collapse',
  styleUrl: 'ac-collapse.scss',
  shadow: true
})
export class AcCollapse {
  render() {
    return (
      <slot />
    );
  }
}
