import { Component, Host, Prop, h } from '@stencil/core';

import { AcNeogridShape } from '../../utils/ac-neogrid-shape';

@Component({
  tag: 'ac-gauge',
  styleUrl: 'ac-gauge.scss',
  shadow: false
})
export class AcGauge {

  @Prop({ reflectToAttr: true }) theme = 'primary';

  @Prop({ reflectToAttr: true, mutable: true }) percent: number;

  @Prop() size: number;

  render() {
    const offset = 272 - (this.percent / 100) * 272;
    return (
      <Host
        class={{
          [`ac-gauge--${this.theme}`]: this.theme !== undefined,
          'ac-gauge--void': !this.percent || this.percent === 0
        }}
      >
        <AcNeogridShape
          class="ac-gauge__meter"
          style={{
            strokeDashoffset: offset + '%',
            width: `${this.size ? this.size : 100}px`,
          }}
        />
        <AcNeogridShape
          class="ac-gauge__bg"
          style={{ width: `${this.size ? this.size : 100}px` }}
        />
        <div class="ac-gauge__inner">
          <slot name="icon"/>
        </div>
      </Host>
    );
  }
}
