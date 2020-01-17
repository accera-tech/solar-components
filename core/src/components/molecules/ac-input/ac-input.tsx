import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Listen, Method, Prop, State, Watch, h } from '@stencil/core';
import vanillaMasker from 'vanilla-masker';

import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { Bind } from '../../../utils/lang/bind';
import { CustomValidityState, ValidatorFn } from '../../../utils/validations/validations';
import { AcFaIcon } from '../../utils/ac-fa-icon';

/**
 * Accera's full-featured Input Field web-component.
 */
@Component({
  tag: 'ac-input',
  styleUrl: 'ac-input.scss',
})
export class AcInput implements FormFieldComponent {
  private acInputBase: HTMLAcInputBaseElement;

  @Element() host: HTMLAcInputElement;

  /**
   * The FormFieldBehavior instance.
   */
  formFieldBehavior = new FormFieldBehavior(this);

  /**
   * The label text of the this input group.
   */
  @Prop() label: string;

  /**
   * The type of the internal input.
   */
  @Prop() type: string;

  /**
   * The helper text to guide the user.
   */
  @Prop() helperText: string;

  /**
   * Request check validation on each input key event.
   */
  @Prop() validateOnKeyup: boolean;

  /**
   * The value of the internal input.
   */
  @Prop({ mutable: true }) value: any;

  /**
   * Set the component in the error state with a message.
   */
  @Prop({ mutable: true }) error: string | boolean;

  /**
   * Get the last validity state from the checkValidity.
   */
  @Prop({ mutable: true }) validity: CustomValidityState;

  /**
   * The validations that this field need.
   * This validations are checked on:
   * - Blur event
   * - Form submit event
   * - Each keyUp event ONLY IF the validateOnKeyup property is present.
   */
  @Prop({ mutable: true }) validator: ValidatorFn | ValidatorFn[];

  /**
   * The mask of the input.
   */
  @Prop({ reflectToAttr: true }) mask: string;

  /**
   * The HTML input field's name.
   */
  @Prop({ reflectToAttr: true }) name: string;

  /**
   * The disabled mode.
   */
  @Prop({ reflectToAttr: true }) disabled: boolean;

  /**
   * The native HTMLInputElement required attribute.
   */
  @Prop({ reflectToAttr: true }) required: boolean;

  /**
   * The native HTMLInputElement pattern attribute.
   */
  @Prop({ reflectToAttr: true }) pattern: string;

  /**
   * The native HTMLInputElement max attribute.
   */
  @Prop({ reflectToAttr: true }) max: number;

  /**
   * The native HTMLInputElement maxlength attribute.
   */
  @Prop({ reflectToAttr: true }) maxlength: number;

  /**
   * The native HTMLInputElement min attribute.
   */
  @Prop({ reflectToAttr: true }) min: number;

  /**
   * The native HTMLInputElement min attribute.
   */
  @Prop({ reflectToAttr: true }) minlength: number;

  /**
   * The native HTMLInputElement autofocus attribute.
   */
  @Prop({ reflectToAttr: true }) autofocus: boolean;

  /**
   * The native HTMLInputElement autocomplete attribute.
   */
  @Prop({ reflectToAttr: true }) autocomplete: string;

  /**
   * The native HTMLInputElement autocapitalize attribute.
   */
  @Prop({ reflectToAttr: true }) autocapitalize: string;

  /**
   * The native HTMLInputElement placeholder attribute.
   */
  @Prop({ reflectToAttr: true }) placeholder: string;

  /**
   * The native HTMLInputElement step attribute.
   */
  @Prop({ reflectToAttr: true }) step: number;

  /**
   * Used to toggle the password view.
   */
  @State() isShowingPassword: boolean;

  /**
   * Set the error state based on the error prop.
   * @param error An error message.
   */
  @Watch('error')
  errorDidUpdate(error) {
    if (error) {
      if (error === 'true') {
        this.error = true;
      }
      this.acInputBase.error = true;
      this.formFieldBehavior.setInvalid();
    } else {
      this.acInputBase.error = false;
      this.formFieldBehavior.setValid();
    }
  }

  /**
   * Applies transformations when the value update.
   */
  @Watch('value')
  valueDidUpdate() {
    // Masking when value update programmatically
    if (this.value && this.mask) {
      this.value = vanillaMasker.toPattern(this.value, this.mask);
    }
  }

  /**
   * Applies transformations when the mask update.
   */
  @Watch('mask')
  async maskDidUpdate() {
    // Masking when value update programmatically
    if (this.value) {
      this.value = this.mask ? vanillaMasker.toPattern(this.value, this.mask) : await this.getRawValue(this.type);
    }
  }

  @Listen('keyup')
  async handleKeyup() {
    if (this.validateOnKeyup) {
      this.formFieldBehavior.checkValidity((await this.getNativeFormField()).value);
    }
  }

  /**
   * Update the value and run validations as if the user change it manually.
   * When to use each:
   * input.value will only update the value, useful to set the initial value of the input.
   * input.setValue is useful to use values that are automatically set by an user's action, setting the unchecked state
   * to the form.
   */
  @Method()
  async setValue(value) {
    this.value = value;

    // @TODO: Review how to set the dirty state in the form for programmatically value changes.
    this.formFieldBehavior.setDirty();
    this.formFieldBehavior.checkValidity();
  }

  /**
   * Get the unmasked value.
   */
  @Method()
  async getRawValue(type = 'text') {
    const value = (await this.acInputBase.getNativeInput()).value || this.value;
    if (!value) { return null; }
    if (type === 'text') {
      return value.toString().replace(/[^a-z0-9 ]+/ig, '');
    } else {
      return vanillaMasker.toNumber(value);
    }
  }

  /**
   * Set focus state in the native input.
   */
  @Method()
  async setFocus() {
    return this.acInputBase.setFocus();
  }

  @Method()
  async getNativeFormField() {
    return this.acInputBase.getNativeInput();
  }

  @Method()
  async getFormFieldBehavior() {
    return this.formFieldBehavior;
  }

  async componentDidLoad() {
    this.errorDidUpdate(this.error);
    if (this.mask) {
      vanillaMasker(await this.acInputBase.getNativeInput()).maskPattern(this.mask);
      // Masking the initial value
      if (this.value) {
        this.value = vanillaMasker.toPattern(this.value, this.mask);
      }
    }
  }

  componentDidUnload() {}

  /**
   * Toggle the password view.
   */
  @Bind
  private togglePassword() {
    this.isShowingPassword = !this.isShowingPassword;
  }

  /**
   * Used as a listener to the change event. Dispatch form field validations.
   */
  @Bind
  private handleChange() {
    this.value = this.acInputBase.value;

    this.formFieldBehavior.setDirty();
    this.formFieldBehavior.checkValidity();
  }

  /**
   * Used as a listener to the blur event. Dispatch form field validations.
   */
  @Bind
  private handleBlur() {
    this.formFieldBehavior.setTouched();
  }

  render() {
    const icon = this.isShowingPassword ? faEyeSlash : faEye;
    return [
      <ac-input-base
        ref={acInputBase => {
          this.acInputBase = acInputBase as any;
        }}
        label={this.label}
        name={this.name}
        type={this.isShowingPassword ? 'text' : this.type}
        pattern={this.pattern}
        value={this.value}
        disabled={this.disabled}
        required={this.required}
        max={this.max}
        min={this.min}
        maxlength={this.maxlength}
        minlength={this.minlength}
        step={this.step}
        autofocus={this.autofocus}
        autocomplete={this.autocomplete}
        autocapitalize={this.autocapitalize}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        placeholder={this.placeholder}
      >
        <slot name="item-start" slot="item-start" />
        <slot name="input-label" slot="input-label" />
        {this.type === 'password'
          ? <ac-button slot="item-end" onClick={this.togglePassword} icon-only fill="flat">
              <AcFaIcon icon={icon} size={14} />
            </ac-button>
          : <slot name="item-end" slot="item-end" />}
      </ac-input-base>,

      // Only present message if it is a string. Preventing unnecessary margin effect.
      (this.error && typeof this.error === 'string') || (this.helperText && typeof this.helperText === 'string')
        ? <span class="ac-input__helper-text">
            {this.error || this.helperText}
          </span>
        : null
    ];
  }
}
