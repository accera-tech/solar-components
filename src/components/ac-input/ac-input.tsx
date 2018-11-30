import { Component, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'ac-input',
  styleUrl: 'ac-input.scss',
  shadow: true
})
export class AcInput {
  @Element() host: HTMLDivElement;

  @Prop() label: string;

  @State() hasFocus: boolean;

  handleFocus() {
    this.hasFocus = true;
  }

  handleBlur() {
    this.hasFocus = false;
  }

  render() {

    return (
      <div class="input-container">
        <label class={this.hasFocus ? 'floating' : ''}>{this.label}</label>
        <input type="text"
               onFocus={() => this.handleFocus()}
               onBlur={() => this.handleBlur()}
        />
      </div>
    );
  }
}
