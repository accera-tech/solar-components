import { Component, Prop, Element, Event, EventEmitter, State, Watch } from '@stencil/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { ValidatorFunction } from '../../../utils/validations/validations';
import { Bind } from '../../../utils/lang/bind';

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
   * The helper text to guide the user.
   */
  @Prop() helperText: string;

  @Prop({ mutable: true }) error: string;

  /**
   * The HTML input field's name.
   */
  @Prop() name: string;

  /**
   * The disabled mode
   */
  @Prop() disabled: boolean;

  /**
   * Set this field as required
   */
  @Prop({ reflectToAttr: true }) required: string | boolean;

  /**
   * The validations that this field need.
   * This validations is checked on:
   * - Blur event
   * - Form submit event
   */
  @Prop() validateFn: ValidatorFunction | ValidatorFunction[];

  /**
   * Fired when the value of the internal input changes.
   */
  @Event({ bubbles: true }) change: EventEmitter<any>;

  @State() isShowingPassword: boolean;

  componentDidLoad() {
    this.errorDidUpdate(this.error);
  }

  @Watch('error')
  errorDidUpdate(error) {
    this.acInputBase.classList.add(error ? 'ac-input--alert' : 'ac-input--success');
    this.acInputBase.classList.remove(error ? 'ac-input--success' : 'ac-input--alert');

    if (error) this.formFieldBehavior.setInvalid();
    else this.formFieldBehavior.setValid();
  }

  @Bind
  private togglePassword() {
    this.isShowingPassword = !this.isShowingPassword;
  }

  @Bind
  private handleChange() {
    this.value = this.acInputBase.value;
    this.change.emit(this.value);

    this.formFieldBehavior.setDirty();
    this.formFieldBehavior.validate()
  }

  @Bind
  private handleBlur() {
    this.formFieldBehavior.setTouched();
    this.formFieldBehavior.validate();
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
        value={this.value}
        disabled={this.disabled}
        required={!!this.required}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      >
        <slot name="item-start" slot="item-start" />
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
