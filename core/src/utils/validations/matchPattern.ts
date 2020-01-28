/**
 * A Form field validation that check if the field match with desired pattern.
 * @param pattern The custom error message. Commonly used for i18n.
 * @param patternMessage The custom error message. Commonly used for i18n.
 */
export function matchPattern(pattern, patternMessage) {
  return value => !(new RegExp(pattern).test(value)) ?
    (typeof patternMessage === 'string' ? patternMessage : 'This field is does not match the required pattern')
    : null;
}
