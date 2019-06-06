/**
 * Represents a validator function that will be consumed by the `formFieldBehavior.validate` method.
 */
export type ValidatorFn = ((value) => CustomValidityState | null) | ((value) => Promise<CustomValidityState | null>);

/**
 * Represents a validation error returned by a validation check.
 */
export type CustomValidityState = {
  [key in keyof ValidityState | string]: { message?: string } | boolean;
}
