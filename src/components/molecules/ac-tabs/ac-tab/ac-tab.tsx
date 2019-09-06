import { Component, Host, Prop, h } from '@stencil/core';

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
  @Prop() compact: boolean;

  render() {
    return (
      <Host
        class={{
        'ac-tab--compact': this.compact
      }}
      >
        <slot/>
      </Host>
    );
  }
}
