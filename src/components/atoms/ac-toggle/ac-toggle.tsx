import { Component, Element, Host, Prop, h } from '@stencil/core';
import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { Bind } from '../../../utils/lang/bind';
import { CustomValidityState, ValidatorFn } from '../../../utils/validations/validations';

@Component({
  tag: 'ac-toggle',
  styleUrl: 'ac-toggle.scss'
})

export class AcToggle implements FormFieldComponent {
  nativeInput: HTMLInputElement;

  @Prop() formFieldBehavior = new FormFieldBehavior(this);

  @Element() host: HTMLAcToggleElement;

  @Prop() label: string;

  @Prop() name: string;

  @Prop({ mutable: true }) error: string;
  /**
   * The validity state.
   */
  @Prop({ mutable: true }) validity: CustomValidityState;
  /**
   * The actual checked state.
   */
  @Prop({ mutable: true, reflectToAttr: true }) checked = false;
  /**
   * Validation pipeline for this field.
   */
  @Prop({ mutable: true }) validator: ValidatorFn | ValidatorFn[];

  @Prop() value: string;

  @Prop({ reflectToAttr: true }) disabled: boolean;
  /**
   * Mark this field as required.
   */
  @Prop({ reflectToAttr: true }) required: boolean;

  @Bind
  private handleChange() {
    this.checked = !this.checked;
  }

  componentDidLoad() {
  }

  componentDidUnload() {
  }

  componentWillLoad() {
  }

  render() {
    return (
      <Host
        class={{
          'ac-toggle--disabled': this.disabled
        }}
      >
        <label
          class="ac-toggle__container"
        >
          <input
            ref={nativeInput => this.nativeInput = nativeInput}
            class="ac-toggle__native"
            type="checkbox"
            name={this.name}
            value={this.value}
            disabled={this.disabled}
            onChange={this.handleChange}
            checked={this.checked}
          />
          <div class="ac-toggle__custom" />
          {this.label && <div class="ac-toggle__label">{this.label}</div>}
        </label>
      </Host>
    )
  }
}
