# ac-toggle



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                             | Type                                                                                                                                   | Default     |
| ----------- | ----------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `checked`   | `checked`   | The actual checked state.               | `boolean`                                                                                                                              | `false`     |
| `direction` | `direction` | Set the label direction.                | `"left" \| "right"`                                                                                                                    | `'right'`   |
| `disabled`  | `disabled`  | If this field is in the disabled state. | `boolean`                                                                                                                              | `undefined` |
| `error`     | `error`     | The actual error message.               | `string`                                                                                                                               | `undefined` |
| `label`     | `label`     |                                         | `string`                                                                                                                               | `undefined` |
| `name`      | `name`      | The form field name.                    | `string`                                                                                                                               | `undefined` |
| `required`  | `required`  | Mark this field as required.            | `boolean`                                                                                                                              | `undefined` |
| `validator` | --          | Validation pipeline for this field.     | `((value: any, field: FormFieldBehavior, form: FormBehavior) => CustomValidityState \| Promise<CustomValidityState>) \| ValidatorFn[]` | `undefined` |
| `validity`  | --          | The validity state.                     | `{ [x: string]: boolean \| { message?: string; }; }`                                                                                   | `undefined` |
| `value`     | `value`     | The field value of the component.       | `string`                                                                                                                               | `undefined` |


## Methods

### `getFormFieldBehavior() => Promise<any>`

Used to provide access to the FormField instance.

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
