import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'ac-button',
  styleUrl: 'ac-button.scss',
  shadow: true
})
export class AcButton {
  @Element() host: HTMLButtonElement;

  @Prop() text: string;
  @Prop() type: string;
  @Prop() tooltip: string;

  @Prop({ mutable: true, reflectToAttr: true})
  hostData() {
    return {
      attribute: 'navigation',
      tooltip: this.tooltip,
      type: this.type,
      class: 'ac-button'
    };
  }

  render() {

    return (
      <span class="ac-button">{this.text}</span>
    );
  }
}
