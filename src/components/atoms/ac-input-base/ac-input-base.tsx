import { Component, Prop, Element, State, ComponentInterface, Method } from '@stencil/core';
import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's full-featured Input webcomponent.
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
   * The render mode of the input.
   */
  @Prop() mode: 'compact';

  /**
   * The value of the internal input.
   */
  @Prop({ mutable: true }) value: any;

  /**
   * The type of the internal input.
   */
  @Prop() type: string;

  /**
   * The native HTMLInputElement pattern attribute.
   */
  @Prop({ reflectToAttr: true }) pattern: string;

  /**
   * Enable readonly.
   */
  @Prop() readonly: boolean;

  /**
   * The HTMLInputElement disabled attribute.
   */
  @Prop() disabled: boolean;

  /**
   * The native HTMLInputElement required attribute.
   */
  @Prop({ reflectToAttr: true }) required: boolean;

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

  @State() hasFocus: boolean;

  /**
   * Set focus state in the native input.
   */
  @Method()
  setFocus() {
    this.nativeInput.focus();
  }

  @Bind
  private handleFocus() {
    this.hasFocus = true;
    this.host.dispatchEvent(new (window as any).Event('focus'));
  }

  @Bind
  private handleBlur() {
    this.hasFocus = false;
    this.host.dispatchEvent(new (window as any).Event('blur'));
  }

  @Bind
  private handleChange() {
    this.value = this.nativeInput.value;
  }

  hostData() {
    return {
      class: {
        [`ac-input--${this.mode}`]: !!this.mode,
        'ac-input--disabled': this.disabled,
        'ac-input--focus': this.hasFocus,
        'ac-input--filled': !!this.value && this.value !== '',
      }
    };
  }

  render() {

    return [
      <div class="ac-input__item-start">
        <slot name="item-start" />
      </div>,
      <span class="ac-input__input-container">
        <label
          class='ac-input__label'>
          <slot name="input-label" /> {this.label}
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
          autofocus={this.autofocus}
          autocomplete={this.autocomplete}
          autocapitalize={this.autocapitalize}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </span>,
      <div class="ac-input__item-end">
        <slot name="item-end"/>
      </div>
    ];
  }
}
