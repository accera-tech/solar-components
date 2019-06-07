/**
 * Represents a validator function that will be consumed by the `formFieldBehavior.validate` method.
 */
import { FormBehavior, FormFieldBehavior } from '../../behaviors/form-behavior';

export type ValidatorFn = (value, field: FormFieldBehavior, form: FormBehavior) =>
  CustomValidityState | Promise<CustomValidityState | null> | null;

/**
 * Represents a validation error returned by a validation check.
 */
export type CustomValidityState = {
  [key in keyof ValidityState | string]: { message?: string } | boolean;
}
