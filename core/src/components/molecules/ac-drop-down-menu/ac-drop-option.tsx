import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ac-drop-option',
  styleUrl: './ac-drop-option.scss'
})
export class AcDropOption {
  /**
   * Label to be display.
   */
  @Prop() label: string;
  /**
   * Value of the option.
   */
  @Prop({ reflectToAttr: true }) value: string;
  /**
   * Image to be display in the left.
   */
  @Prop({ reflectToAttr: true }) image: string;
  /**
   * (Optional) Image description.
   */
  @Prop({ reflectToAttr: true }) imageDescription: string;
  /**
   * Flag that mark the selected option.
   */
  @Prop() selected = false;

  render() {
    return (
    <Host
      class={{
        'ac-list__item': true,
        'ac-drop-down-menu__option': true,
        'ac-drop-down-menu__option--selected': this.selected
        }}
    >
        <span>
          {this.image && <img src={this.image} alt={this.imageDescription} />}
          <slot name="image" />
        </span>
        <span class="ac-drop-option__label">
          {this.label}
          <slot name="label" />
        </span>
    </Host>);
  }
}
