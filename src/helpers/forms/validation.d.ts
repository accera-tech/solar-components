/**
 * Represents a validator function that will be consumed by the `formField.validate` method.
 */
export type ValidatorFunction = ((value) => ValidationError | string) | ((value) => Promise<ValidationError | string>);

/**
 * Represents a validation error returned by a validation check.
 */
export type ValidationError = { message: string; field?: string } | void;
