import { Component, ComponentInterface, Element, Host, Method, Prop, State, h } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's full-featured Input web-component.
 */
@Component({
  tag: 'ac-input-base',
  styleUrl: 'ac-input-base.scss',
})
export class AcInputBase implements ComponentInterface {
  private nativeInput?: HTMLInputElement;

  @Element() host: HTMLAcInputBaseElement;

  /**
   * The native HTMLInputElement name attribute.
   */
  @Prop() name: string;

  /**
   * The label text of the this input group.
   */
  @Prop() label: string;

  /**
   * Error mode.
   */
  @Prop({ reflectToAttr: true }) error: boolean;

  /**
   * The theme color defined in the color palette.
   */
  @Prop() theme = 'primary';

  /**
   * The input's size.
   */
  @Prop() size?: 'small' | 'large';

  /**
   * The value of the internal input.
   */
  @Prop({ mutable: true }) value: any;

  /**
   * The type of the internal input.
   */
  @Prop({ reflectToAttr: true }) type: string;

  /**
   * The native HTMLInputElement pattern attribute.
   */
  @Prop({ reflectToAttr: true }) pattern: string;

  /**
   * Enable readonly.
   */
  @Prop({ reflectToAttr: true }) readonly: boolean;

  /**
   * The HTMLInputElement disabled attribute.
   */
  @Prop({ reflectToAttr: true }) disabled: boolean;

  /**
   * The native HTMLInputElement required attribute.
   */
  @Prop({ reflectToAttr: true }) required: boolean;

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

  @State() hasFocus: boolean;

  @Method()
  async getNativeInput() {
    return this.nativeInput;
  }

  /**
   * Set focus state in the native input.
   */
  @Method()
  async setFocus() {
    this.nativeInput.focus();
  }

  @Bind
  private handleFocus() {
    // @TODO: Check why events handled by stencil dont propagate itself. So, create a decorator that wrapper this line.
    this.host.dispatchEvent(new Event('focus'));
    this.hasFocus = true;
  }

  @Bind
  private handleBlur() {
    this.hasFocus = false;
  }

  @Bind
  private handleChange() {
    this.value = this.nativeInput.value;
  }

  render() {

    return (
      <Host
        class={{
          [`ac-input-base--${this.theme}`]: !!this.theme,
          [`ac-input-base--${this.size}`]: !!this.size,
          'ac-input-base--filled': !!this.value && this.value !== '',
          'ac-input-base--no-label': !this.label,
          'ac-input-base--disabled': this.disabled,
          'ac-input-base--error': this.error,
          'ac-input-base--focus': this.hasFocus,
        }}
      >
        <div class="ac-input__item-start">
          <slot name="item-start"/>
        </div>
        <span class="ac-input__input-container">
        <label
          class="ac-input__label"
        >
          <slot name="input-label"/>
          {this.label}
        </label>
        <input
          ref={input => this.nativeInput = input}
          class="ac-input__native"
          name={this.name}
          value={this.value}
          type={this.type || 'text'}
          pattern={this.pattern}
          readonly={this.readonly}
          disabled={this.disabled}
          required={this.required}
          max={this.max}
          min={this.min}
          maxlength={this.maxlength}
          minlength={this.minlength}
          autofocus={this.autofocus}
          autocomplete={this.autocomplete}
          autocapitalize={this.autocapitalize}
          placeholder={this.placeholder}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          step={this.type === 'number' ? this.step || '0.00000000000001' : undefined}
        />
      </span>
        <div class="ac-input__item-end">
          <slot name="item-end"/>
        </div>
      </Host>
    );
  }
}
