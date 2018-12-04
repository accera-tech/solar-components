import { Component, Prop, Element, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'ac-button',
  styleUrl: 'ac-button.scss',
  shadow: true
})
export class AcButton implements ComponentInterface {
  @Element() host: HTMLButtonElement;

  @Prop() type: string = 'button';
  @Prop() tooltip: string;
  @Prop() theme: string;
  @Prop() size: string;
  @Prop() iconOnly: boolean;


  hostData() {
    const styleModifiers = {};

    if (this.theme) styleModifiers[`ac-button ac-button--${this.theme}`] = true;
    if (this.iconOnly) styleModifiers['ac-button--icon-only'] = true;
    if (this.size) styleModifiers[`ac-button--${this.size}`] = true;

    return {
      attribute: 'button',
      title: this.tooltip,
      'data-type': this.type,
      class: styleModifiers
    };
  }

  render() {

    return (
      <button>
        <slot name="icon-start" />
        <span class="ac-button__text">
          <slot />
        </span>
        <slot name="icon-end" />
      </button>
    );
  }
}
