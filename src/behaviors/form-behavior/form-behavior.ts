import debug from 'debug/src/browser';

import { Bind } from '../../utils/lang/bind';
import { SerializeFormOptions, serializeForm } from '../../utils/serialize-form';
import { ComponentBehavior } from '../../utils/stencil/component-behavior';
import { ValidationError } from '../../utils/validations/validations';

import { FormFieldBehavior } from './form-field-behavior';

const log = debug('solar:FormBehavior');

export class FormBehavior extends ComponentBehavior<any> {
  private fields = new Map<string, FormFieldBehavior>();
  private preventUnsavedIsAttached = false;

  /**
   * True if this formBehavior is valid.
   */
  isValid: boolean;

  /**
   * True if the user has changed any field from the formBehavior.
   */
  isUnchecked: boolean;

  /**
   * Attach a listener to 'submit' to the formBehavior,
   * preventing the formBehavior submission if it is invalid.
   */
  attach() {
    log('Initializing', this);
    this.component.host.addEventListener('submit', this.handleSubmit);
  }

  detach() {
    this.component.host.removeEventListener('submit', this.handleSubmit);
  }

  /**
   * A event listener that runs all validations from formBehavior's fields.
   * If it is valid, propagates the event to other listeners
   */
  @Bind
  handleSubmit() {
    log('Submitting', this);
    // ev.preventDefault();
    const currentValidation = !!this.isValid;

    if (!currentValidation || this.isUnchecked) {
      this.checkValidity()
        .then(() => {
          this.component.host.dispatchEvent(new CustomEvent('formSubmit'));
        })
        .catch(error => {
          this.component.host.dispatchEvent(new CustomEvent('formInvalid', { detail: { error } }));
        });
    }
  }

  /**
   * Set the formBehavior in the valid state.
   */
  setValid() {
    log('Set valid', this);
    this.isValid = true;
    this.component.host.classList.remove('form--invalid');
    this.component.host.classList.add('form--valid');
  }

  /**
   * Set the formBehavior in the invalid state.
   */
  setInvalid() {
    log('Set invalid', this);
    this.isValid = false;
    this.component.host.classList.remove('form--valid');
    this.component.host.classList.add('form--invalid');
  }

  /**
   * Set the formBehavior in the unchecked state.
   */
  setUnchecked() {
    log('Set unchecked', this);
    this.isUnchecked = true;
    this.isValid = false;
    this.component.host.classList.remove('form--valid', 'form--invalid');
    this.component.host.classList.add('form--unchecked');

    // Prevent close the page with unsaved changes.
    if (!this.preventUnsavedIsAttached &&
      (this.component.preventUnsaved || this.component.preventUnsaved === '')) {
      log('Preventing Unsaved');
      window.addEventListener('beforeunload', e => {
        if (this.isUnchecked) {
          const confirmationMessage = this.component.preventUnsaved;

          (e || window.event).returnValue = confirmationMessage; // Gecko + IE
          return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
        }
      });
      this.preventUnsavedIsAttached = true;
    }
  }

  /**
   * Set the formBehavior in the checked state.
   */
  setChecked() {
    log('Set checked', this);
    this.isUnchecked = false;
    this.component.host.classList.remove('form--unchecked');
  }

  /**
   * Cleans all the states, errors and values of the formBehavior.
   */
  cleanup() {
    log('Cleaning', this);
    this.pristine();
    const fieldsAsArray = Array.from(this.fields.values());
    fieldsAsArray.map(f => f.cleanup());
  }

  /**
   * Set the formBehavior in the pristine state, preserving values, removing the validations and unchecked.
   */
  pristine() {
    log('Set pristine', this);
    this.isValid = false;
    this.isUnchecked = false;
    this.component.host.classList.remove('form--unchecked', 'form--valid', 'form--invalid');
  }

  /**
   * Adds a field to this logic. Note that the field must have a name.
   * @param field A component's FormFieldBehavior
   */
  addField(field: FormFieldBehavior) {
    this.fields.set(field.name, field);
  }

  /**
   * Remove a field from this logic.
   * @param field A component's FormFieldBehavior
   */
  removeField(field: FormFieldBehavior) {
    this.fields.delete(field.name);
  }

  /**
   * Runs all field validations from the formBehavior.
   */
  async validate(): Promise<ValidationError[]> {
    log('Validating formBehavior', this);
    const fieldsAsArray = Array.from(this.fields.values());
    const errors = await Promise.all(fieldsAsArray
      .map(f => f.validate()
        .then(err => {
          if (err) {
            return {
              message: err.message || err.toString(),
              field: f.name,
            };
          }
        })
      ));

    return errors.filter(err => !!err);
  }

  /**
   * Check the validation state of the field.
   */
  checkValidity(): Promise<ValidationError[]> {
    this.setChecked();

    return this.validate().then(errs => {
      if (errs.length > 0) {
        this.setInvalid();
        throw new FormValidationError(errs);
      } else {
        this.setValid();
      }

      return errs;
    });
  }

  serialize(options?: SerializeFormOptions) {
    log('Serializing', this.component.host, serializeForm(this.component.host, options));
    return serializeForm(this.component.host, options);
  }
}

/**
 * Represents an error of formBehavior validation.
 */
export class FormValidationError extends Error {
  errs: ValidationError[];

  constructor(errs: ValidationError[]) {
    super('This formBehavior is invalid');
    this.errs = errs;
  }
}
