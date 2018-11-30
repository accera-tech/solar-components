import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ac-input',
  styleUrl: 'ac-input.scss',
  shadow: true
})
export class AcInput {
  @Prop() label: string;

  render() {

    return (
      <div class="input-container">
        <label>{this.label}</label>
        <input placeholder={this.label} />
      </div>
    );
  }
}
