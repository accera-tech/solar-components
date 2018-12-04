import { Component, Prop, Element, State, Event, EventEmitter, ComponentInterface } from '@stencil/core';
import { Bind } from '../../../helpers';

@Component({
  tag: 'ac-input-base',
  styleUrl: 'ac-input-base.scss',
  shadow: true
})
export class AcInputBase implements ComponentInterface {
  private nativeInput?: HTMLInputElement;

  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop({ mutable: true }) value: any;
  @Prop() type: string;

  @Event({ eventName: 'change', bubbles: true }) onChange: EventEmitter<Event>;
  @Event() onFocus: EventEmitter<FocusEvent>;
  @Event() onBlur: EventEmitter<FocusEvent>;

  @State() hasFocus: boolean;

  @Bind
  private handleFocus(ev) {
    this.onFocus.emit(ev);
    this.hasFocus = true;

    this.host.classList.add('ac-input--focus');
  }

  @Bind
  private handleBlur(ev) {
    this.onBlur.emit(ev);
    this.hasFocus = false;

    this.host.classList.remove('ac-input--focus');
  }

  @Bind
  private handleChange(ev) {
    this.onChange.emit(ev);
    console.log(ev);
    this.value = this.nativeInput.value;
  }

  render() {

    return [
      <slot name="item-start" />,
      <span class="ac-input__input-container">
        <label
          class={
            'ac-input__label ' +
            ((this.hasFocus || (!!this.value && this.value !== '')) ? 'ac-input__label--floating' : '')
          }>
          {this.label}
        </label>
        <input
          ref={input => this.nativeInput = input}
          value={this.value}
          type={ this.type || 'text' }
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </span>,
      <slot name="item-end" />
    ];
  }
}
