import { ComponentInterface } from '@stencil/core';
import { FormFieldLogic} from './form-field-logic';
import { ValidatorFunction } from './validation';

/**
 * Represents a Component that implements the FormFieldLogic structure.
 */
export interface FormFieldComponent extends ComponentInterface {
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
  required: string | boolean;

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

  /**
   * The Stencil's lifecycle hook that needs to run the
   * `this.formField.attach()` to bind this field to the form.
   */
  componentDidLoad: () => void;

  /**
   * The Stencil's lifecycle hook that needs to run the
   * `this.formField.detach()` to remove this field from the form.
   */
  componentDidUnload: () => void;
}
