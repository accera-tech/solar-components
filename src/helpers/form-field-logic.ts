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

  setValid(valid: boolean) {
    this.component.host.classList.add(valid ? 'field--valid' : 'field--invalid');
    this.component.host.classList.remove(valid ? 'field--invalid' : 'field--valid');

    this.isValid = valid;
  }

  async validate(): Promise<ValidationError> {
    const { validateFn } = this.component;
    if (!validateFn) {
      this.component.errorMessage = null;
      return this.setValid(true);
    }

    // Converting to Array
    let validateFns;
    if (validateFn instanceof Array) validateFns = validateFn;
    else validateFns = [ validateFn ];

    // Running all validator functions
    for (const fn of validateFns) {
      const exec = fn(this.component.value);
      let res;
      if (exec instanceof Promise) res = await exec;
      else res = exec;

      if (res) {
        this.component.errorMessage = res.message || res;
        this.setValid(false);
        return res;
      }
    }

    this.component.errorMessage = null;
    return this.setValid(true);
  }
}

export type ValidatorFunction = ((value) => ValidationError) | ((value) => Promise<ValidationError>);
export type ValidationError = { message: string } | string | void;

export interface FormField {
  // @Element
  host: HTMLElement;

  // @Prop
  value: any;

  // @Prop
  validateFn: ValidatorFunction | ValidatorFunction[];

  // @Prop
  formField: FormFieldLogic;

  // @State
  errorMessage?: string;
}
