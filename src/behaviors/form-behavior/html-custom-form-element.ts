import { FormLogic } from './form-logic';

/**
 * Represents a HTMLFormElement that implements a Form Logic in it.
 */
export interface HTMLCustomFormElement extends HTMLFormElement {
  form: FormLogic
}