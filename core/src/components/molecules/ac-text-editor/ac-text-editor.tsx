import { Component, Element, Host, Prop, State, h } from '@stencil/core';

import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { Bind } from '../../../utils/lang/bind';
import { CustomValidityState, ValidatorFn } from '../../../utils/validations/validations';
import { MEDIUM_EDITOR_CDN } from '../../../vendors-cdn';

@Component({
  tag: 'ac-text-editor',
  styleUrl: 'ac-text-editor.scss'
})
export class AcTextEditor implements FormFieldComponent {
  // @ts-ignore
  private mediumEditor: any;
  private mediumRef: HTMLDivElement;

  @Element() host: HTMLAcTextEditorElement;

  /**
   * The FormFieldBehavior instance.
   */
  formFieldBehavior = new FormFieldBehavior(this);

  /**
   * Get the last validity state from the checkValidity.
   */
  @Prop({ mutable: true }) validity: CustomValidityState;

  /**
   * The validations that this field need.
   * This validations are checked on:
   * - Blur event
   * - Form submit event
   * - Each keyUp event ONLY IF the validateOnKeyup property is present.
   */
  @Prop({ mutable: true }) validator: ValidatorFn | ValidatorFn[];

  /**
   * The native HTMLInputElement required attribute.
   */
  @Prop({ mutable: true }) required: boolean;

  /**
   * The disabled mode.
   */
  @Prop({ mutable: true }) disabled: boolean;

  /**
   * The HTML input field's name.
   */
  @Prop() name: string;

  /**
   * The value of the internal text editor.
   */
  @Prop({ mutable: true }) value = '';

  /**
   * The placeholder of text editor.
   */
  @Prop() placeholder = '';

  @State() hasFocus: boolean;

  componentDidLoad() {
    this.loadMedium().then(res => {
      // @ts-ignore
      this.mediumEditor = new res('.ac-text-editor__editable', {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3']
        },
        placeholder: {
          text: this.placeholder
        },
        anchor: {
          placeholderText: 'Link',
        }
      });

      this.mediumEditor.subscribe('editableInput', () => {
        this.handleChange();
      });
    });

    this.mediumRef.innerHTML = this.value;
  }

  componentDidUnload() {
  }

  private loadMedium() {
    return new Promise(res => {
      const element = document.createElement('script');
      element.setAttribute('type', 'text/javascript');
      element.setAttribute('src', MEDIUM_EDITOR_CDN);
      element.onload = () => res((window as any).MediumEditor);
      (element as any).onreadystatechange = () => res((window as any).MediumEditor);
      document.head.appendChild(element);
    });
  }

  @Bind
  handleFocus() {
    this.hasFocus = true;
  }

  @Bind
  handleBlur() {
    this.hasFocus = false;
  }

  @Bind
  handleChange() {
    this.value = this.mediumRef.innerHTML;
  }

  render() {
    return (
      <Host
        class={{
          'ac-text-editor--focus': this.hasFocus
        }}
      >
        <div
          ref={mediumRef => this.mediumRef = mediumRef as HTMLDivElement}
          class="ac-text-editor__editable"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        <input
          name={this.name}
          value={this.value}
          type="hidden"
        />
      </Host>
    )
  }
}
