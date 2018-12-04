import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ac-fa-icon',
  shadow: true
})
export class AcFaIcon {
  @Prop() icon: any;
  @Prop() size = 16;

  // @Watch('icon')
  // animate(newProp, lastProp) {}

  render() {
    const { icon } = this.icon;

    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${icon[0]} ${icon[1]}`} height={this.size}>
        <path d={icon[4]} />
      </svg>
    );
  }
}
