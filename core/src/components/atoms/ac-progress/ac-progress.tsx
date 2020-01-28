import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ac-progress',
  styleUrl: 'ac-progress.scss',
  shadow: false
})
export class AcProgress {

  /**
   * Set the theme color.
   */
  @Prop({ reflectToAttr: true }) theme = 'primary';

  /**
   * Set the bar's percentage.
   */
  @Prop({ reflectToAttr: true, mutable: true }) percent: number;

  render() {
    return (
      <Host
        class={{
          [`ac-progress--${this.theme}`]: !!this.theme
        }}
      >
        <div
          class="ac-progress__meter"
          style={{
            width: this.percent + '%',
          }}
        >
        </div>
      </Host>
    );
  }
}
