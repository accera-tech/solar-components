import { Component, Element, Method, Prop } from '@stencil/core';

import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { Bind } from '../../../utils/lang/bind';
import { CustomValidityState, ValidatorFn } from '../../../utils/validations/validations';

/**
 * Accera's full-featured checkbox webcomponent.
 */
@Component({
  tag: 'ac-check',
  styleUrl: 'ac-check.scss',
})
export class AcCheck implements FormFieldComponent {
  nativeInput: HTMLInputElement;

  formFieldBehavior = new FormFieldBehavior(this);

  @Element() host: HTMLAcCheckElement;

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
   * Set the label direction.
   */
  @Prop() direction: 'left' | 'right' = 'right';

  /**
   * The actual checked state.
   */
  @Prop({ mutable: true }) checked: boolean;

  /**
   * Error state and message of this field.
   */
  @Prop({ mutable: true }) error: string;

  /**
   * The validity state.
   */
  @Prop({ mutable: true }) validity: CustomValidityState;

  /**
   * Validation pipeline for this field.
   */
  @Prop({ mutable: true }) validator: ValidatorFn | ValidatorFn[];

  /**
   * The type of this field.
   */
  @Prop({ reflectToAttr: true }) type: 'radio' | 'checkbox' = 'checkbox';

  /**
   * The native disabled mode.
   */
  @Prop({ reflectToAttr: true }) disabled: boolean;

  /**
   * Mark this field as required.
   */
  @Prop({ reflectToAttr: true }) required: string | boolean;

  componentDidLoad() {}
  componentDidUnload() {}
  componentWillLoad() {}

  @Method()
  async getNativeFormField() {
    return this.nativeInput;
  }

  @Bind
  private handleChange() {
    this.checked = !this.checked;
  }

  hostData() {
    return {
      attribute: 'input',
      class: {
        [`ac-check--label-${this.direction}`]: this.direction !== undefined,
        [`ac-check--${this.type}`]: this.type !== undefined,
        'ac-check--disabled': this.disabled,
        'ac-check--error': !!this.error,
      }
    };
  }

  render() {
    const nativeInputId = this.name + '_' + this.value;

    return [
      <div class="ac-check__container">
        <input
          ref={nativeInput => this.nativeInput = nativeInput}
          id={nativeInputId}
          class="ac-check__native"
          type={this.type}
          name={this.name}
          value={this.value}
          onChange={this.handleChange}
          disabled={this.disabled}
          checked={this.checked}
        />
        <label class="ac-check__custom" htmlFor={nativeInputId}>
        </label>
        {this.label && <label class="ac-check__label" htmlFor={nativeInputId}>{this.label}</label>}
      </div>,
      (this.error || this.helperText) && <label class="ac-check__helper-text" htmlFor={nativeInputId}>{this.error || this.helperText}</label>
    ];
  }
}
