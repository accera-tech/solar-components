import { Component, Prop, Element, Event, EventEmitter, ComponentInterface, State, Watch } from '@stencil/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormFieldLogic, FormFieldComponent } from '../../../helpers/forms';
import { ValidatorFunction } from '../../../helpers/forms/validation';
import { Bind } from '../../../helpers/bind';

/**
 * Accera's full-featured Input Field webcomponent.
 */
@Component({
  tag: 'ac-input',
  styleUrl: 'ac-input.scss',
  shadow: true
})
export class AcInput implements ComponentInterface, FormFieldComponent {
  acInputBase: HTMLAcInputBaseElement;

  @Prop({ mutable: false, reflectToAttr: false }) formField: FormFieldLogic = new FormFieldLogic(this);

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
  @Prop() required: string | boolean;

  /**
   * Fired when the value of the internal input changes.
   */
  @Event({ bubbles: true }) change: EventEmitter<any>;

  /**
   * The validations that this field need.
   * This validations is checked on:
   * - Blur event
   * - Form submit event
   */
  @Prop() validateFn: ValidatorFunction | ValidatorFunction[];

  @State() isShowingPassword: boolean;

  componentDidLoad() {
    this.errorDidUpdate(this.error);
    this.formField.attach();
  }

  @Watch('error')
  errorDidUpdate(error) {
    this.acInputBase.classList.add(error ? 'ac-input--alert' : 'ac-input--success');
    this.acInputBase.classList.remove(error ? 'ac-input--success' : 'ac-input--alert');

    if (error) this.formField.setInvalid();
    else this.formField.setValid();
  }

  @Bind
  private togglePassword() {
    this.isShowingPassword = !this.isShowingPassword;
  }

  @Bind
  private handleChange() {
    this.value = this.acInputBase.value;
    this.change.emit(this.value);

    this.formField.setDirty();
    this.formField.validate()
  }

  @Bind
  private handleBlur() {
    this.formField.setTouched();
    this.formField.validate();
  }

  componentDidUnload() {
    this.formField.detach();
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
