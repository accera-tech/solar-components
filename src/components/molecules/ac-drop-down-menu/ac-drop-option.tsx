import { Component, Prop, h, Host } from '@stencil/core';



@Component({
  tag: 'ac-drop-option',
  styleUrl: './ac-drop-item.scss'
})
export class AcDropOption {

  @Prop() label: string;
  @Prop({ reflectToAttr: true }) value: string;
  @Prop({ reflectToAttr: true }) image: string;
  @Prop({ reflectToAttr: true }) imageDescription: string;
  @Prop() selected: boolean = false;

  render() {
    return <Host
      class={{
        "ac-list__item": true,
        "ac-drop-down-menu__item": true,
        "ac-drop-down-menu__item--selected": this.selected
      }}>
        {this.image && <img  src={this.image} alt={this.imageDescription} />}
        {this.label}
        <slot />
    </Host>
  }
}