import { Component, Prop } from '@stencil/core';
import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's full-featured checkbox webcomponent.
 */
@Component({
  tag: 'ac-check',
  styleUrl: 'ac-check.scss',
  shadow: true
})
export class AcCheck {

  /**
   * The textual label of this field.
   */
  @Prop() label: string;

  /**
   * The helper text to guide the user.
   */
  @Prop() helperText: string;

  /**
   * The HTML field name.
   */
  @Prop() name: string;

  /**
   * Set the label to the left of checkbox.
   */
  @Prop() labelLeft: boolean;

  /**
   * The actual checked state.
   */
  @Prop({ mutable: true }) checked: boolean;

  /**
   * The native disabled mode.
   */
  @Prop() disabled: boolean;

  hostData() {
    return {
      attribute: 'input',
      class: {
        'ac-check--checked': this.checked,
        'ac-check--disabled': this.disabled,
        'ac-check--label-left': this.labelLeft,
      }
    };
  }

  @Bind
  handleChange() {
    this.checked = !this.checked;
  }

  render() {

    return [
      <div class="ac-check__container">
        <input
          id={this.name}
          class="ac-check__native"
          type="checkbox"
          name={this.name}
          onChange={this.handleChange}
          disabled={this.disabled}
        />
        { this.label && <label class="ac-check__label" onClick={this.handleChange}>{this.label}</label> }
      </div>,
      this.helperText && <span class="ac-check__helper-text" onClick={this.handleChange}>{ this.helperText }</span>
    ]
  }
}
