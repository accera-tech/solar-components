import { ComponentBase } from '../../utils/stencil/component-behavior';
import { CustomValidityState, ValidatorFn } from '../../utils/validations/validations';

import { FormFieldBehavior } from './form-field-behavior';

/**
 * Represents a Component that implements the FormFieldBehavior structure.
 */
export interface FormFieldComponent extends ComponentBase {

  getNativeFormField?: () => Promise<HTMLInputElement | HTMLFieldSetElement | HTMLSelectElement | HTMLTextAreaElement>;

  /**
   * The field value of the component.
   * @Prop
   */
  value: any;

  /**
   * The validators that ensure the field validity.
   * @Prop
   */
  validator: ValidatorFn | ValidatorFn[];

  /**
   * Provide access to the form field logic.
   */
  formFieldBehavior: FormFieldBehavior;

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
  error?: string | boolean;

  /**
   * Watch updates of the `error` property.
   * Use the `formFieldBehavior.setValid` and `formFieldBehavior.setInvalid` in it.
   * @param error the actual error message.
   * @Watch('error')
   */
  errorDidUpdate?: (error: string) => void;

  /**
   * The validity state of the FormField.
   */
  validity: CustomValidityState;

  /**
   * Used to provide access to the FormField instance.
   * @Method
   */
  getFormFieldBehavior?: () => Promise<FormFieldBehavior>
}
