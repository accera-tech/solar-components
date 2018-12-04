import { Component, Prop, Element, Event, EventEmitter, ComponentInterface, State } from '@stencil/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Bind } from '../../../helpers';
import { AcInputBase } from '../../atoms/ac-input-base/ac-input-base';

@Component({
  tag: 'ac-input',
  styleUrl: 'ac-input.scss',
  shadow: true
})
export class AcInput implements ComponentInterface {
  acInputBase: AcInputBase;

  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop({ mutable: true }) value: any;
  @Prop() type: string;
  @Prop() helperText: string;

  @Event() onInput: EventEmitter<KeyboardEvent>;
  @Event() onFocus: EventEmitter<FocusEvent>;
  @Event() onBlur: EventEmitter<FocusEvent>;

  @State() showPassword: boolean;

  @Bind
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  @Bind
  private handleInput(ev) {
    this.onInput.emit(ev);
    this.value = this.acInputBase.value;
  }

  render() {
    const icon = this.showPassword ? faEyeSlash : faEye;
    return [
      <ac-input-base
        ref={acInputBase => {
          // @ts-ignore
          this.acInputBase = acInputBase;
        }}
        label={this.label}
        value={this.value}
        type={this.showPassword ? 'text' : this.type}
        onInput={this.handleInput}
        onFocus={this.onFocus.emit}
        onBlur={this.onBlur.emit}
      >
        <slot name="item-start" slot="item-start" />
        {this.type === 'password'
          ? <ac-button slot="item-end" theme="primary" onClick={this.togglePassword} icon-only>
              <ac-fa-icon icon={icon} />
            </ac-button>
          : null}
      </ac-input-base>,
      <span class="ac-input__helper-text">
        {this.helperText}
      </span>
    ];
  }
}
