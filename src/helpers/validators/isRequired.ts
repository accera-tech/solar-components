export function isRequired(errorMessage) {
  return value => !value || value == '' ? (typeof errorMessage == 'string' ? errorMessage : 'This field is required') : null
}
