import { FormBehavior } from './form-behavior';

/**
 * Represents a HTMLFormElement that implements a Form Behavior in it.
 */
export interface HTMLCustomFormElement extends HTMLFormElement {
  formBehavior: FormBehavior;
}
