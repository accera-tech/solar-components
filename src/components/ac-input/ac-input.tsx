import { Component, Prop, Element, State, Event, EventEmitter, ComponentInterface } from '@stencil/core';
import { Bind } from '../../helpers';

@Component({
  tag: 'ac-input',
  styleUrl: 'ac-input.scss',
  shadow: true
})
export class AcInput implements ComponentInterface {
  private nativeInput?: HTMLInputElement;

  @Element() host: HTMLDivElement;

  @Prop() label: string;
  @Prop({ mutable: true }) value: any;
  @Prop({ mutable: true }) type: any;

  @Event() onInput: EventEmitter<KeyboardEvent>;
  @Event() onFocus: EventEmitter<void>;
  @Event() onBlur: EventEmitter<void>;

  @State() hasFocus: boolean;
  @State() actionActive: boolean;

  @Bind
  private handleFocus() {
    this.onFocus.emit();
    this.hasFocus = true;

    this.host.classList.add('focus');
  }

  @Bind
  private handleBlur() {
    this.onBlur.emit();
    this.hasFocus = false;

    this.host.classList.remove('focus');
  }

  @Bind
  private handleInput() {
    this.value = this.nativeInput.value;
  }

  @Bind
  private toggleAction() {
    this.actionActive = !this.actionActive;
  }

  render() {

    // @TODO: Add action toggle feature and rename this class to AcInputBase to able AcSelect and AcInput to extend this!
    return [
      <label class={(this.hasFocus || (!!this.value && this.value !== '')) ? 'floating' : ''}>{this.label}</label>,
      <span class="input-container">
        <input ref={input => this.nativeInput = input}
               type={ this.type || 'text' }
               value={this.value}
               onInput={this.handleInput}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
        />
        {this.type === 'password' &&
          <button onClick={this.toggleAction}>
            {this.actionActive ? 'HIDE' : 'SHOW'}
          </button>}
      </span>
    ];
  }
}
