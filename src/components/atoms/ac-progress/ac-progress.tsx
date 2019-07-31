import { Component, Prop } from '@stencil/core';

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

  hostData() {
    return {
      class: {
        [`ac-progress--${this.theme}`]: !!this.theme
      }
    };
  }

  render() {
    return (
      <div
        class="ac-progress__meter"
        style={{
          width: this.percent + '%',
        }}
      >
      </div>
    );
  }
}
