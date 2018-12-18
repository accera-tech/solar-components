import { isRequired } from './validators/isRequired';

export class FormFieldLogic {
  private component: FormField;

  isDirty: boolean;
  isValid: boolean;
  isTouched: boolean;

  constructor(component) {
    this.component = component;
  }

  setDirty() {
    this.component.host.classList.add('field--dirty');
    this.isDirty = true;
  }

  setTouched() {
    this.component.host.classList.add('field--touched');
    this.isTouched = true;
  }

  setValid() {
    this.component.host.classList.add('field--valid');
    this.component.host.classList.remove('field--invalid');

    this.isValid = true;
  }

  setInvalid() {
    this.component.host.classList.add('field--invalid');
    this.component.host.classList.remove('field--valid');

    this.isValid = false;
  }

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

export type ValidatorFunction = ((value) => ValidationError | string) | ((value) => Promise<ValidationError | string>);
export type ValidationError = { message: string } | void;

export interface FormField {
  // @Element
  host: HTMLElement;

  // @Prop
  value: any;

  // @Prop
  validateFn: ValidatorFunction | ValidatorFunction[];

  // @Prop
  formField: FormFieldLogic;

  // @Prop
  name: string;

  // @Prop
  required: boolean;

  // @Prop
  disabled: boolean;

  // @Prop
  error?: string;

  // @Watch('error')
  errorDidUpdate: (error: string) => void;
}
