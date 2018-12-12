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

  /**
   * Fired when the value of the internal input changes.
   */
  @Event({ bubbles: true }) change: EventEmitter<any>;

  @State() isShowingPassword: boolean;

  @Bind
  private togglePassword() {
    this.isShowingPassword = !this.isShowingPassword;
  }

  @Bind
  private handleChange() {
    this.value = this.acInputBase.value;
    this.change.emit(this.value);
  }

  render() {
    const icon = this.isShowingPassword ? faEyeSlash : faEye;
    return [
      <ac-input-base
        ref={acInputBase => {
          this.acInputBase = acInputBase as any;
        }}
        label={this.label}
        value={this.value}
        type={this.isShowingPassword ? 'text' : this.type}
        onChange={this.handleChange}
      >
        <slot name="item-start" slot="item-start" />
        {this.type === 'password'
          ? <ac-button slot="item-end" theme="secondary" onClick={this.togglePassword} icon-only fill="flat">
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
