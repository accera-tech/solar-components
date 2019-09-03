import debug from 'debug/src/browser';

import { Bind } from '../../utils/lang/bind';
import { dashToCamelCase } from '../../utils/lang/string';
import { toArray } from '../../utils/lang/to-array';
import { ComponentBehavior } from '../../utils/stencil/component-behavior';
import { CustomValidityState, ValidatorFn } from '../../utils/validations/validations';

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

    this.component.host.addEventListener('invalid', this.checkValidity);
  }

  /**
   * Removes this field from FormLogic, to ignore it validations.
   */
  detach() {
    if (this.formAttached) {
      log('Detaching', this.name, this.formAttached);
      this.formAttached.formBehavior.removeField(this);
    }

    this.component.host.removeEventListener('invalid', this.checkValidity);
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
  @Bind
  async checkValidity(value?: any): Promise<CustomValidityState> {
    const valueToAssert = value || this.component.value || '';
    log('Validating', this.name, '=', valueToAssert);

    let validityState: CustomValidityState = { valid: true };
    const validators = toArray(this.component.validator);

    const nativeFormField = this.component.getNativeFormField ? await this.component.getNativeFormField() : null;
    if (nativeFormField) {
      const nativeValidity = nativeFormField.validity;
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
    const formBehavior = this.formAttached ? this.formAttached.formBehavior : null;
    for (const fn of validators) {
      let state;
      try {
        const exec = fn(valueToAssert, this, formBehavior);
        state = exec instanceof Promise ? await exec : exec;
      } catch (err) {
        log('Error in validator function', fn.name, err);
      }

      if (state) {
        // Assign the custom validity tokens.
        validityState = { ...validityState, ...state };

        // If in the last verification it still valid
        // so we gonna check the overall state again.
        const { valid: stillValid, ...validityTokens } = validityState;
        if (stillValid) {
          validityState.valid = !Object.values(validityTokens)
            .find(hasError => !!hasError);
        }
      }
    }

    if (validityState.valid) {
      this.component.error = null;
      this.setValid();
    } else {
      this.component.error = this.buildErrorMessageByValidityState(validityState) || true;
      this.setInvalid();
      this.component.host.dispatchEvent(
        new CustomEvent('formFieldInvalid', { detail: validityState })
      );
    }

    this.component.validity = validityState;

    return validityState;
  }

  /**
   * Add a validator to the validation pipeline.
   * @param validator The validation function.
   */
  addValidator(validator: ValidatorFn) {
    if (!this.component.validator) {
      this.component.validator = [];
    } else if (!(this.component.validator instanceof Array)) {
      this.component.validator = [ this.component.validator ];
    }
    this.component.validator.push(validator);

    return this;
  }

  getCustomErrorMessagesFromInlineAttrs() {
    const attrs = this.component.host.attributes;

    return Object.keys(attrs)
      .map(key => attrs[key].name)
      .filter(key => key.indexOf('-message') > -1)
      .reduce((acc, key) => {
        acc[dashToCamelCase(key)] = attrs[key].value;
        return acc;
      }, {});
  }

  getErrorMessages() {
    return this.getCustomErrorMessagesFromInlineAttrs();
  }

  buildErrorMessageByValidityState(validityState: CustomValidityState) {
    const messages = this.getErrorMessages();

    for (const token in validityState) {
      if (validityState[token] && token !== 'valid') {
        if (typeof validityState[token] === 'string') {
          return validityState[token];
        } else {
          return messages[token + 'Message'];
        }
      }
    }
  }
}
