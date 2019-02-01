import { Component, Prop, Element, State, Event, EventEmitter, ComponentInterface } from '@stencil/core';
import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's full-featured Input webcomponent.
 * Native Props that's not implemented yet:
 * ```max min autofocus autocorrect autocomplete autocapitalize```
 */
@Component({
  tag: 'ac-input-base',
  styleUrl: 'ac-input-base.scss',
})
export class AcInputBase implements ComponentInterface {
  private nativeInput?: HTMLInputElement;

  @Element() host: HTMLAcInputBaseElement;

  /**
   * The native HTML field name.
   */
  @Prop() name: string;

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
   * Enable readonly.
   */
  @Prop() readonly: boolean;

  /**
   * The HTML disabled mode.
   */
  @Prop() disabled: boolean;

  /**
   * The native HTML required mode.
   */
  @Prop() required: boolean;

  /**
   * Fired when the value of the internal input changes.
   */
  @Event({ bubbles: true }) change: EventEmitter<any>;

  @State() hasFocus: boolean;

  @Bind
  private handleFocus() {
    this.hasFocus = true;
    this.host.dispatchEvent(new (window as any).Event('focus'));
  }

  @Bind
  private handleBlur() {
    this.hasFocus = false;
  }

  @Bind
  private handleChange() {
    this.value = this.nativeInput.value;
    this.change.emit(this.value);
  }

  hostData() {
    return {
      class: {
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
          {this.label}
        </label>
        <input
          ref={input => this.nativeInput = input}
          class="ac-input__native"
          name={this.name}
          value={this.value}
          type={this.type || 'text'}
          readonly={this.readonly}
          disabled={this.disabled}
          required={this.required}
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
