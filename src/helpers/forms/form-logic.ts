import { Bind } from '../bind';
import { FormFieldLogic } from './form-field-logic';
import { ValidationError } from './validation';

export class FormLogic {
  private form: HTMLFormElement;
  private fields = new Map<string, FormFieldLogic>();

  /**
   * True if this form is valid.
   */
  isValid: boolean;

  /**
   * True if the user has changed any field from the form.
   */
  isUnsaved: boolean;

  /**
   * Attach a listener to 'submit' to the form,
   * preventing the form submission if it is invalid.
   */
  constructor(form: HTMLFormElement) {
    this.form = form;
    this.form.addEventListener('submit', this.handleSubmit);
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
    this.pristinify();
    
    if (!currentValidation || this.isUnsaved) {
      ev.stopImmediatePropagation();
      this.validate().then(errs => {
        const nonUndefinedErrs = errs.filter(err => err);
        if (nonUndefinedErrs.length > 0) {
          // @TODO: Dispatch a custom event that emits the errors.
          this.setInvalid();
        } else {
          this.setValid();
          this.form.dispatchEvent(ev);
          // @TODO: Discover a way to dispatch the submit action in the right way.
          // If this form is a inline HTML form, dispatch the native submit too.
          // this.form.submit();
        }
      });
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
   * Set the form in the unsaved state.
   */
  setUnsaved() {
    this.isUnsaved = true;
    this.form.classList.add('form--unsaved');
  }

  /**
   * Cleans all the states, errors and values of the form.
   */
  cleanup() {
    this.pristinify();
    const fieldsAsArray = Array.from(this.fields.values());
    fieldsAsArray.map(f => f.cleanup());
  }

  /**
   * Set the form in the pristine state, preserving values, removing the validations and unsaved.
   */
  pristinify() {
    this.isValid = false;
    this.isUnsaved = false;
    this.form.classList.remove('form--unsaved');
    this.form.classList.remove('form--valid');
    this.form.classList.remove('form--invalid');
  }

  /**
   * Adds a field to this logic. Note that the field must have a name.
   * @param field
   */
  addField(field: FormFieldLogic) {
    this.fields.set(field.name, field);
  }

  /**
   * Remove a field from this logic.
   * @param field
   */
  removeField(field: FormFieldLogic) {
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
}
