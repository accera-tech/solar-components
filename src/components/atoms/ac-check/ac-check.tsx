import { Component, Prop } from '@stencil/core';
import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's full-featured checkbox webcomponent.
 */
@Component({
  tag: 'ac-check',
  styleUrl: 'ac-check.scss',
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
   * The HTML field value.
   */
  @Prop() value: string;

  /**
   * Set the label to the left of checkbox.
   */
  @Prop() labelLeft: boolean;

  /**
   * The actual checked state.
   */
  @Prop({ mutable: true }) checked: boolean;

  /**
   * The type of this field.
   */
  @Prop() type: 'radio' | 'checkbox' = 'checkbox';

  /**
   * The native disabled mode.
   */
  @Prop() disabled: boolean;

  hostData() {
    return {
      attribute: 'input',
      class: {
        'ac-check--disabled': this.disabled,
        'ac-check--label-left': this.labelLeft,
        [`ac-check--${this.type}`]: this.type,
      }
    };
  }

  @Bind
  handleChange() {
    this.checked = !this.checked;
  }

  render() {
    const nativeInputId = this.name + '_' + this.value;

    return [
      <div class="ac-check__container">
        <input
          id={nativeInputId}
          class="ac-check__native"
          type={this.type}
          name={this.name}
          value={this.value}
          onChange={this.handleChange}
          disabled={this.disabled}
        />
        <label class="ac-check__custom" htmlFor={nativeInputId}>
        </label>
        { this.label && <label class="ac-check__label" htmlFor={nativeInputId}>{this.label}</label> }
      </div>,
      this.helperText && <label class="ac-check__helper-text" htmlFor={nativeInputId}>{ this.helperText }</label>
    ]
  }
}
