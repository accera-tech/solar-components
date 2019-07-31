import { Component, Prop } from '@stencil/core';

/**
 * Accera's tab webcomponent. Used within AcTabs.
 */
@Component({
  tag: 'ac-tab',
  styleUrl: 'ac-tab.scss',
})
export class AcTab {
  /**
   * If true, mark this tab as a selected tab.
   */
  @Prop({ reflectToAttr: true }) active: boolean;

  /**
   * Set this tab in compact mode.
   */
  @Prop({ mutable: true }) compact: boolean;

  render() {
    return (
      <slot/>
    );
  }
}
