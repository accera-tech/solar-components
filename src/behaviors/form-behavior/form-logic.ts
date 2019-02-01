import { Bind } from '../../utils/lang/bind';
import { ValidationError } from '../../utils/validations/validations';
import { serializeForm } from '../../utils/serialize-form';

import { FormFieldBehavior } from './form-field-behavior';

import debug from 'debug/src/browser';
const log = debug('solar:FormLogic');

/**
 * Adds new features to a HTMLFormElement, useful to handle forms operations, like validation.
 */
export class FormLogic {
  private readonly form: HTMLFormElement;
  private fields = new Map<string, FormFieldBehavior>();

  /**
   * True if this form is valid.
   */
  isValid: boolean;

  /**
   * True if the user has changed any field from the form.
   */
  isUnchecked: boolean;

  /**
   * Attach a listener to 'submit' to the form,
   * preventing the form submission if it is invalid.
   */
  constructor(form: HTMLFormElement) {
    log('Initializing', form);
    this.form = form;
    this.form.addEventListener('submit', this.handleSubmit);

    if (this.form.dataset.preventUnsaved || this.form.dataset.preventUnsaved == "") {
      log('Preventing Unsaved');
      window.addEventListener('beforeunload', (e) => {
        if (this.isUnchecked) {
          const confirmationMessage = this.form.dataset.preventUnsaved;

          (e || window.event).returnValue = confirmationMessage; //Gecko + IE
          return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        }
      });
    }
    document.dispatchEvent(new Event('formBootstrap'));
  }

  /**
   * A event listener that runs all validations from form's fields.
   * If it is valid, propagates the event to other listeners
   * @param ev
   */
  @Bind
  handleSubmit(ev: Event) {
    ev.preventDefault();
    const currentValidation = !!this.isValid;

    if (!currentValidation || this.isUnchecked) {
      ev.stopImmediatePropagation();
      this.checkValidity()
        .then(() => {
          this.form.dispatchEvent(ev);
        })
    }
  }

  /**
   * Set the form in the valid state.
   */
  setValid() {
    this.isValid = true;
    this.form.classList.remove('form--invalid');
    this.form.classList.add('form--valid');
  }

  /**
   * Set the form in the invalid state.
   */
  setInvalid() {
    this.isValid = false;
    this.form.classList.remove('form--valid');
    this.form.classList.add('form--invalid');
  }

  /**
   * Set the form in the unchecked state.
   */
  setUnchecked() {
    this.isUnchecked = true;
    this.isValid = false;
    this.form.classList.remove('form--valid', 'form--invalid');
    this.form.classList.add('form--unchecked');
  }

  /**
   * Set the form in the checked state.
   */
  setChecked() {
    this.isUnchecked = false;
    this.form.classList.remove('form--unchecked');
  }

  /**
   * Cleans all the states, errors and values of the form.
   */
  cleanup() {
    this.pristine();
    const fieldsAsArray = Array.from(this.fields.values());
    fieldsAsArray.map(f => f.cleanup());
  }

  /**
   * Set the form in the pristine state, preserving values, removing the validations and unchecked.
   */
  pristine() {
    this.isValid = false;
    this.isUnchecked = false;
    this.form.classList.remove('form--unchecked', 'form--valid', 'form--invalid');
  }

  /**
   * Adds a field to this logic. Note that the field must have a name.
   * @param field
   */
  addField(field: FormFieldBehavior) {
    this.fields.set(field.name, field);
  }

  /**
   * Remove a field from this logic.
   * @param field
   */
  removeField(field: FormFieldBehavior) {
    this.fields.delete(field.name);
  }

  /**
   * Runs all field validations from the form.
   */
  validate(): Promise<ValidationError[]> {
    const fieldsAsArray = Array.from(this.fields.values());
    return Promise.all(fieldsAsArray
      .map(f => f.validate()
        .then(err => {
          if (err) {
            err.field = f.name;
            return err;
          }
        })
      ));
  }

  /**
   * Check the validation state of the field.
   */
  checkValidity(): Promise<void> {
    this.setChecked();

    return this.validate().then(errs => {
      const nonUndefinedErrs = errs.filter(err => err);
      if (nonUndefinedErrs.length > 0) {
        this.setInvalid();
        throw new FormValidationError(errs);
      } else {
        this.setValid();
      }
    });
  }

  serialize() {
    return serializeForm(this.form);
  }
}

/**
 * Represents an error of form validation.
 */
export class FormValidationError extends Error {
  errs: ValidationError[];
  
  constructor(errs: ValidationError[]) {
    super('This form is invalid');
    this.errs = errs;
  }
}
