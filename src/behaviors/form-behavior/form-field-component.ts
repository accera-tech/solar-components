import { FormFieldBehavior} from './form-field-behavior';
import { ValidatorFunction } from '../../utils/validations/validations';
import { ComponentBase } from '../../utils/stencil/component-behavior';

/**
 * Represents a Component that implements the FormFieldBehavior structure.
 */
export interface FormFieldComponent extends ComponentBase {

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
   * Provide access to the form field logic.
   * @Prop
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
   * Use the `formFieldBehavior.setValid` and `formFieldBehavior.setInvalid` in it.
   * @param error the actual error message.
   * @Watch('error')
   */
  errorDidUpdate: (error: string) => void;
}
