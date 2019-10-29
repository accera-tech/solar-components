# ac-toggle



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                             | Type                                                                                                                                   | Default                       |
| ------------------- | --------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `checked`           | `checked`             | The actual checked state.               | `boolean`                                                                                                                              | `false`                       |
| `disabled`          | `disabled`            | If this field is in the disabled state. | `boolean`                                                                                                                              | `undefined`                   |
| `error`             | `error`               | The actual error message.               | `string`                                                                                                                               | `undefined`                   |
| `formFieldBehavior` | `form-field-behavior` | Provide access to the form field logic. | `any`                                                                                                                                  | `new FormFieldBehavior(this)` |
| `label`             | `label`               |                                         | `string`                                                                                                                               | `undefined`                   |
| `name`              | `name`                | The form field name.                    | `string`                                                                                                                               | `undefined`                   |
| `required`          | `required`            | Mark this field as required.            | `boolean`                                                                                                                              | `undefined`                   |
| `validator`         | --                    | Validation pipeline for this field.     | `((value: any, field: FormFieldBehavior, form: FormBehavior) => CustomValidityState \| Promise<CustomValidityState>) \| ValidatorFn[]` | `undefined`                   |
| `validity`          | --                    | The validity state.                     | `{ [x: string]: boolean \| { message?: string; }; }`                                                                                   | `undefined`                   |
| `value`             | `value`               | The field value of the component.       | `string`                                                                                                                               | `undefined`                   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
