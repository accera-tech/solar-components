import { Component, Prop, Element, State, Event, EventEmitter, ComponentInterface } from '@stencil/core';
import { Bind } from '../../../helpers';

// @TODO: Implement properties: disabled, max, min, autofocus, autocorrect, autocomplete, autocapitalize, required
// @TODO: Turn it into an abstract class (form-field) for extend it with another input bases (eg radio-group, checkbox, slider)

@Component({
  tag: 'ac-input-base',
  styleUrl: 'ac-input-base.scss',
  shadow: true
})
export class AcInputBase implements ComponentInterface {
  private nativeInput?: HTMLInputElement;

  @Element() host: HTMLAcInputBaseElement;

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
   * Fired when the value of the internal input changes.
   */
  @Event({ bubbles: true }) change: EventEmitter<any>;

  @State() hasFocus: boolean;

  @Bind
  private handleFocus() {
    this.hasFocus = true;
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
        'ac-input--focus': this.hasFocus,
        'ac-input--filled': !!this.value && this.value !== ''
      }
    };
  }

  render() {

    return [
      <slot name="item-start" />,
      <span class="ac-input__input-container">
        <label
          class='ac-input__label'>
          {this.label}
        </label>
        <input
          ref={input => this.nativeInput = input}
          value={this.value}
          type={this.type || 'text'}
          readonly={this.readonly}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </span>,
      <slot name="item-end" />
    ];
  }
}
