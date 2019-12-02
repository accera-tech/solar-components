import { Component, Element, Host, Method, Prop, h, Watch } from '@stencil/core';

import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { Bind } from '../../../utils/lang/bind';
import { CustomValidityState, ValidatorFn } from '../../../utils/validations/validations';

/**
 * Accera's full-featured checkbox web-component.
 */
@Component({
  tag: 'ac-check',
  styleUrl: 'ac-check.scss',
})
export class AcCheck implements FormFieldComponent {
  nativeInput: HTMLInputElement;

  @Element() host: HTMLAcCheckElement;

  /**
   * The FormFieldBehavior instance.
   */
  @Prop() formFieldBehavior = new FormFieldBehavior(this);

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
   * Error state and message of this field.
   */
  @Prop({ mutable: true }) error: string;

  /**
   * The validity state.
   */
  @Prop({ mutable: true }) validity: CustomValidityState;

  /**
   * The actual checked state.
   */
  @Prop({ mutable: true, reflectToAttr: true }) checked: boolean;

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
  @Prop({ reflectToAttr: true }) required: boolean;

  componentDidLoad() {
  }

  componentDidUnload() {
  }

  componentWillLoad() {
  }

  @Watch('checked')
  checkedDidUpdate() {
    if (this.checked && this.type === 'radio') {
      Array.from(document.querySelectorAll(`ac-check[name="${this.name}"]`) as NodeListOf<HTMLAcCheckElement>)
        .forEach(e => {
          if (e.value !== this.value && e.checked) {
            e.checked = false;
          }
        });
    }
  }

  @Method()
  async getNativeFormField() {
    return this.nativeInput;
  }

  @Method()
  async getFormFieldBehavior() {
    return this.formFieldBehavior;
  }

  @Bind
  private handleChange() {
    this.checked = this.nativeInput.checked;
    this.formFieldBehavior.setDirty();
    this.formFieldBehavior.checkValidity();
  }

  render() {
    return (
      <Host
        class={{
          [`ac-check--label-${this.direction}`]: this.direction !== undefined,
          [`ac-check--${this.type}`]: this.type !== undefined,
          'ac-check--disabled': this.disabled,
          'ac-check--error': !!this.error,
        }}
      >
        <label class="ac-check__container">
          <input
            ref={nativeInput => this.nativeInput = nativeInput}
            class="ac-check__native"
            type={this.type}
            name={this.name}
            value={this.value}
            onChange={this.handleChange}
            disabled={this.disabled}
            checked={this.checked}
          />
          <div class="ac-check__custom">
          </div>
          {this.label && <div class="ac-check__label">{this.label}</div>}
        </label>
        {
          (this.error && typeof this.error === 'string') || (this.helperText && typeof this.helperText === 'string')
          && <label class="ac-check__helper-text">{this.error || this.helperText}</label>
        }
      </Host>
    );
  }
}
