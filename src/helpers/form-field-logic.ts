import { isRequired } from './validators/isRequired';

/**
 * Adds form field features to a component, such as validations.
 */
export class FormFieldLogic {
  /**
   * The internal component that this instance is attached.
   */
  private component: FormField;

  /**
   * True if the user has changed this component's value before.
   */
  isDirty: boolean;

  /**
   * True if the value of this component is valid.
   * Note that needs to call `validate` to ensure it.
   */
  isValid: boolean;

  /**
   * True if the user has interacted with this component before.
   */
  isTouched: boolean;

  /**
   * Creates a new FormFieldLogic.
   * @param component The component that will be attached into.
   */
  constructor(component) {
    this.component = component;
  }

  /**
   * Set the component in the dirty state.
   */
  setDirty() {
    this.component.host.classList.add('field--dirty');
    this.isDirty = true;
  }

  /**
   * Set the component in the touched state.
   */
  setTouched() {
    this.component.host.classList.add('field--touched');
    this.isTouched = true;
  }

  /**
   * Set the component in the valid state.
   */
  setValid() {
    this.component.host.classList.add('field--valid');
    this.component.host.classList.remove('field--invalid');

    this.isValid = true;
  }

  /**
   * Set the component in the invalid state
   */
  setInvalid() {
    this.component.host.classList.add('field--invalid');
    this.component.host.classList.remove('field--valid');

    this.isValid = false;
  }

  /**
   * Cleans all the states, error and value of the field.
   */
  cleanup() {
    this.component.host.classList.remove(
      'field--invalid', 'field--valid', 'field--touched', 'field--dirty'
    );
    this.component.value = undefined;
    this.component.error = undefined;
    this.isValid = undefined;
    this.isTouched = undefined;
    this.isDirty = undefined;
  }

  /**
   * Runs the all the validations of the field and sets the error.
   * The Required Field validation runs if the `required` prop of the component is present.
   */
  async validate(): Promise<ValidationError> {
    const { validateFn } = this.component;
    if (!validateFn) {
      this.component.error = null;
      return;
    }

    // Converting to Array
    let validateFns;
    if (validateFn instanceof Array) validateFns = validateFn;
    else validateFns = [ validateFn ];

    if (this.component.required) {
      validateFns.unshift(isRequired(this.component.required));
    }

    // Running all validator functions
    for (const fn of validateFns) {
      const exec = fn(this.component.value);
      let res;
      if (exec instanceof Promise) res = await exec;
      else res = exec;

      if (res) {
        this.component.error = res.message || res;
        return res.message ? res : { message: res };
      }
    }

    this.component.error = null;
  }
}

/**
 * Represents a validator function that will be consumed by the `formField.validate` method.
 */
export type ValidatorFunction = ((value) => ValidationError | string) | ((value) => Promise<ValidationError | string>);

/**
 * Represents a validation error returned by a validation check.
 */
export type ValidationError = { message: string } | void;

/**
 * Represents a Component that implements the FormFieldLogic structure.
 */
export interface FormField {
  /**
   * The main native element from the component.
   * @Element
   */
  host: HTMLElement;

  /**
   * The field value of the component.
   * @Prop
   */
  value: any;

  /**
   * The validators that ensure the field validity.
   * @Prop
   */
  validateFn: ValidatorFunction | ValidatorFunction[];

  /**
   * The form field logic.
   * @Prop
   */
  formField: FormFieldLogic;

  /**
   * The form field name.
   * @Prop
   */
  name: string;

  /**
   * If this field component is required.
   * @Prop
   */
  required: boolean;

  /**
   * If this field is in the disabled state.
   * @Prop
   */
  disabled: boolean;

  /**
   * The actual error message.
   * @Prop
   */
  error?: string;

  /**
   * Watch updates of the `error` property.
   * Use the `formField.setValid` and `formField.setInvalid` in it.
   * @param error the actual error message.
   * @Watch('error')
   */
  errorDidUpdate: (error: string) => void;
}
