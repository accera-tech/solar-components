# ac-input



















<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                    | Type                                                                                                                                               |
| ------------ | ------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`   | `disabled`    | The disabled mode                              | `boolean`                                                                                                                                          |
| `error`      | `error`       | The actual error message.                      | `string`                                                                                                                                           |
| `formField`  | --            | The form field logic.                          | `FormFieldLogic`                                                                                                                                   |
| `helperText` | `helper-text` | The helper text to guide the user.             | `string`                                                                                                                                           |
| `label`      | `label`       | The label text of the this input group.        | `string`                                                                                                                                           |
| `name`       | `name`        | The HTML input field's name.                   | `string`                                                                                                                                           |
| `required`   | --            | Set this field as required                     | `boolean \| string`                                                                                                                                |
| `type`       | `type`        | The type of the internal input.                | `string`                                                                                                                                           |
| `validateFn` | --            | The validators that ensure the field validity. | `(value: any) => Promise<string \| void \| { message: string; }> \| (value: any) => string \| void \| { message: string; } \| ValidatorFunction[]` |
| `value`      | --            | The value of the internal input.               | `any`                                                                                                                                              |


## Events

| Event    | Detail | Description                                         |
| -------- | ------ | --------------------------------------------------- |
| `change` | any    | Fired when the value of the internal input changes. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
