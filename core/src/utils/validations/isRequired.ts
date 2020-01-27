/**
 * A Form field validation that check if the field is filled.
 * @param errorMessage The custom error message. Commonly used for i18n.
 */
export function isRequired(errorMessage) {
  return value => !value || value === '' ?
    (typeof errorMessage === 'string' ? errorMessage : 'This field is required')
    : null;
}
