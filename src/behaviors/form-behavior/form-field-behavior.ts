import debug from 'debug/src/browser';

import { toArray } from '../../utils/lang/to-array';
import { ComponentBehavior } from '../../utils/stencil/component-behavior';
import { CustomValidityState } from '../../utils/validations/validations';

import { FormBehavior } from './form-behavior';
import { FormFieldComponent } from './form-field-component';
import { HTMLCustomFormElement } from './html-custom-form-element';
const log = debug('solar:FormFieldBehavior');

/**
 * Adds form field features to a component, such as validations.
 */
export class FormFieldBehavior extends ComponentBehavior<FormFieldComponent> {

  /**
   * The form that this field is attached
   */
  private formAttached?: HTMLCustomFormElement;

  /**
   * The name of the field to use in the form.
   */
  name: string;

  /**
   * True if the value of this field is valid.
   * Note that needs to call `validate` to ensure it.
   */
  isValid: boolean;

  /**
   * True if the user has interacted with this field before.
   */
  isTouched: boolean;

  /**
   * True if the user has changed this field's value before.
   */
  isDirty: boolean;

  /**
   * If this field is in a form, attach to it and initialize the FormLogic.
   */
  attach() {
    this.name = this.component.name;
    this.formAttached = this.component.host.closest('form') as HTMLCustomFormElement;

    if (this.formAttached) {
      log('Attaching', this.name, this.formAttached);
      if (!this.formAttached.formBehavior) {
        this.formAttached.formBehavior = FormBehavior.forNative(this.formAttached);
      }
      this.formAttached.formBehavior.addField(this);
    }
  }

  /**
   * Removes this field from FormLogic, to ignore it validations.
   */
  detach() {
    if (this.formAttached) {
      log('Detaching', this.name, this.formAttached);
      this.formAttached.formBehavior.removeField(this);
    }
  }

  /**
   * Set the field in the dirty state.
   */
  setDirty() {
    log('Set dirty', this.name, this.formAttached);
    this.component.host.classList.add('form-field--dirty');
    this.isDirty = true;

    if (this.formAttached) { this.formAttached.formBehavior.setUnchecked(); }
  }

  /**
   * Set the field in the touched state.
   */
  setTouched() {
    log('Set touched', this.name);
    this.component.host.classList.add('form-field--touched');
    this.isTouched = true;
  }

  /**
   * Set the field in the valid state.
   */
  setValid() {
    log('Set valid', this.name);
    this.component.host.classList.add('form-field--valid');
    this.component.host.classList.remove('form-field--invalid');

    this.isValid = true;
  }

  /**
   * Set the field in the invalid state
   */
  setInvalid() {
    log('Set invalid', this.name);
    this.component.host.classList.add('form-field--invalid');
    this.component.host.classList.remove('form-field--valid');

    this.isValid = false;
  }

  /**
   * Cleans all the states, error and value of the field.
   */
  cleanup() {
    log('Cleaning up', this.name);
    this.component.host.classList.remove(
      'form-field--invalid', 'form-field--valid', 'form-field--touched', 'form-field--dirty'
    );
    this.component.value = undefined;
    this.component.error = undefined;
    this.isValid = undefined;
    this.isTouched = undefined;
    this.isDirty = undefined;
  }

  /**
   * Runs the all the validations of the field and sets the component's validity.
   */
  async checkValidity(value?: any): Promise<CustomValidityState> {
    log('Validating', this.name);

    let validityState: CustomValidityState = { valid: true };
    const validators = toArray(this.component.validator);
    const valueToAssert = value || this.component.value;

    if (this.component.getNativeFormField) {
      const nativeValidity = (await this.component.getNativeFormField()).validity;
      validityState.badInput = nativeValidity.badInput;
      validityState.customError = nativeValidity.customError;
      validityState.patternMismatch = nativeValidity.patternMismatch;
      validityState.rangeOverflow = nativeValidity.rangeOverflow;
      validityState.rangeUnderflow = nativeValidity.rangeUnderflow;
      validityState.stepMismatch = nativeValidity.stepMismatch;
      validityState.tooLong = nativeValidity.tooLong;
      validityState.tooShort = nativeValidity.tooShort;
      validityState.typeMismatch = nativeValidity.typeMismatch;
      validityState.valid = nativeValidity.valid;
      validityState.valueMissing = nativeValidity.valueMissing;
    }

    // Running all validator functions
    for (const fn of validators) {
      const exec = fn(valueToAssert, this, this.formAttached);
      const state = exec instanceof Promise ? await exec : exec;

      if (state) {
        validityState = { ...validityState, ...state };
        validityState.valid = !Object.values(state).find(a => !!a);
      }
    }

    if (validityState.valid) {
      this.component.error = false;
      this.setValid();
    } else {
      this.component.error = true;
      this.setInvalid();
      this.component.host.dispatchEvent(
        new CustomEvent('formFieldInvalid', { detail: validityState })
      );
    }

    this.component.validity = validityState;

    return validityState;
  }
}
