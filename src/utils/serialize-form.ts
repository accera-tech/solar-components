import { assignByFormDataPath } from './lang/assign-by-form-data-path';

/**
 * The options that can be passed to the serializeForm function.
 */
export interface SerializeFormOptions {
  /**
   * The function will ignore fields that has the disabled property.
   */
  ignoreDisabled?: boolean;
}

/**
 * Serialize a Form element to JSON.
 * @param form The target form element.
 * @param options A set of custom options.
 */
export function serializeForm(form: HTMLFormElement, options: SerializeFormOptions = {}) {
  const obj = {};

  Array.prototype.slice.call(form.querySelectorAll('[name]' + (options.ignoreDisabled ? ':not([disabled])' : '')))
    .forEach(field => {
      if (field.name && ['file', 'reset', 'button'].indexOf(field.type) === -1 && field.tagName.indexOf('-') === -1) {
        switch (field.type) {
          case 'select-multiple':
            const options = [];
            Array.prototype.slice.call(field.options).forEach(option => {
              if (option.selected) { options.push(option.value); }
            });
            assignByFormDataPath(obj, field.name, options);
            break;

          case 'checkbox':
            if (field.checked) { assignByFormDataPath(obj, field.name, true); }
          case 'radio':
            if (field.checked) { assignByFormDataPath(obj, field.name, field.value); }
            break;

          default:
            if (field.value) { assignByFormDataPath(obj, field.name, field.value); }
            break;
        }
      }
    });

  return obj;
}
