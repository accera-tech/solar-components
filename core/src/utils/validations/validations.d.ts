/**
 * Represents a validator function that will be consumed by the `formFieldBehavior.validate` method.
 */
import { FormBehavior, FormFieldBehavior } from '../../behaviors/form-behavior';
import { Writeable } from '../lang/types';

export type ValidatorFn = (value, field: FormFieldBehavior, form: FormBehavior) =>
  CustomValidityState | Promise<CustomValidityState | null> | null;

/**
 * Represents a validation error returned by a validation check.
 */
export type CustomValidityState = {
  [key in keyof Writeable<ValidityState, string> | string]: { message?: string } | boolean;
}

export interface ValidationMessagesConfig {
  badInputMessage?: string;
  customErrorMessage?: string;
  patternMismatchMessage?: string;
  rangeOverflowMessage?: string;
  rangeUnderflowMessage?: string;
  stepMismatchMessage?: string;
  tooLongMessage?: string;
  tooShortMessage?: string;
  typeMismatchMessage?: string;
  validMessage?: string;
  valueMissingMessage?: string;

  [key: string]: string
}
