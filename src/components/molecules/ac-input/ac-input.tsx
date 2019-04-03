import { Component, Prop, Element, State, Watch, Method } from '@stencil/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { ValidatorFunction } from '../../../utils/validations/validations';
import { Bind } from '../../../utils/lang/bind';
import { matchPattern } from '../../../utils/validations/matchPattern';
import vanillaMasker from 'vanilla-masker';

/**
 * Accera's full-featured Input Field webcomponent.
 */
@Component({
  tag: 'ac-input',
  styleUrl: 'ac-input.scss',
})
export class AcInput implements FormFieldComponent {
  acInputBase: HTMLAcInputBaseElement;

  @Prop({ mutable: false, reflectToAttr: false }) formFieldBehavior: FormFieldBehavior = new FormFieldBehavior(this);

  @Element() host: HTMLAcInputElement;

  /**
   * The label text of the this input group.
   */
  @Prop() label: string;

  /**
   * The value of the internal input.
   */
  @Prop({ mutable: true }) value: any;

  /**
   * The type of the internal input.
   */
  @Prop() type: string;

  /**
   * The pattern of the input.
   */
  @Prop({ reflectToAttr: true }) pattern: string;

  /**
   * The message displayed if the pattern doesnt match.
   */
  @Prop({ reflectToAttr: true }) patternMessage: string;

  /**
   * The mask of the input.
   */
  @Prop({ reflectToAttr: true }) mask: string;

  /**
   * The helper text to guide the user.
   */
  @Prop() helperText: string;

  @Prop({ mutable: true }) error: string;

  /**
   * The HTML input field's name.
   */
  @Prop() name: string;

  /**
   * The disabled mode.
   */
  @Prop() disabled: boolean;

  /**
   * Set this field as required. A validation error message can be provided as well.
   */
  @Prop({ reflectToAttr: true }) required: string | boolean;

  /**
   * The native HTMLInputElement max attribute.
   */
  @Prop({ reflectToAttr: true }) max: number;

  /**
   * The native HTMLInputElement min attribute.
   */
  @Prop({ reflectToAttr: true }) min: number;

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
   * The validations that this field need.
   * This validations is checked on:
   * - Blur event
   * - Form submit event
   */
  @Prop({ mutable: true }) validator: ValidatorFunction | ValidatorFunction[];

  /**
   * Used to toggle the password view.
   */
  @State() isShowingPassword: boolean;

  componentDidLoad() {
    this.errorDidUpdate(this.error);

    // Add pattern validation to the validation pipeline
    if (this.pattern) {
      if (this.validator instanceof Array)
        this.validator.unshift(matchPattern(this.pattern, this.patternMessage));
      else this.validator = [ matchPattern(this.pattern, this.patternMessage), this.validator ];
    }

    if (this.mask) {
      vanillaMasker(this.acInputBase.querySelector('.ac-input__native')).maskPattern(this.mask);
      // Masking the initial value
      if (this.value)
        this.value = vanillaMasker.toPattern(this.value, this.mask);
    }
  }

  componentDidUnload() {}

  /**
   * Set the error state based on the error prop.
   * @param error
   */
  @Watch('error')
  errorDidUpdate(error: string) {
    this.acInputBase.classList.add(error ? 'ac-input--alert' : 'ac-input--success');
    this.acInputBase.classList.remove(error ? 'ac-input--success' : 'ac-input--alert');

    if (error) this.formFieldBehavior.setInvalid();
    else this.formFieldBehavior.setValid();
  }

  /**
   * Applies transformations when the value update.
   */
  @Watch('value')
  valueDidUpdate() {
    // Masking when value update programmatically
    if (this.mask) {
      this.value = vanillaMasker.toPattern(this.value, this.mask);
    }
  }

  /**
   * Update the value and run validations as if the user change it manually.
   * When to use each:
   * input.value will only update the value, useful to set the initial value of the input.
   * input.setValue is useful to use values that are automatically set by an user's action, setting the unchecked state
   * to the form.
   * @param value
   */
  @Method()
  setValue(value) {
    this.value = value;

    // @TODO: Review how to set the dirty state in the form for programmatically value changes.
    this.formFieldBehavior.setDirty();
    this.formFieldBehavior.validate();
  }

  /**
   * Get the unmasked value.
   * @param type
   */
  @Method()
  getRawValue(type = 'text'){
    if (type === 'text') return this.value.toString().replace(/[^a-z0-9 ]+/ig, "");
    else return vanillaMasker.toNumber(this.value);
  }


  /**
   * Set focus state in the native input.
   */
  @Method()
  setFocus() {
    this.acInputBase.setFocus();
  }

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
    this.formFieldBehavior.validate();
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
        required={!!this.required}
        max={this.max}
        min={this.min}
        autofocus={this.autofocus}
        autocomplete={this.autocomplete}
        autocapitalize={this.autocapitalize}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      >
        <slot name="item-start" slot="item-start" />
        <slot name="input-label" slot="input-label" />
        {this.type === 'password'
          ? <ac-button slot="item-end" onClick={this.togglePassword} icon-only>
              <ac-fa-icon icon={icon} size={14} />
            </ac-button>
          : <slot name="item-end" slot="item-end" />}
      </ac-input-base>,
      this.error || this.helperText
        ? <span class="ac-input__helper-text">
            {this.error || this.helperText}
          </span>
        : null
    ];
  }
}
