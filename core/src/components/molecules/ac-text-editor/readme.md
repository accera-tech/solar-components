---
name: Text Editor
menu: Componentes
---


# ac-text-editor

````html
<ac-text-editor text="<p>Hello World!</p>"></ac-text-editor>
````

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                 | Type                                                                                                                                   | Default     |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `disabled`    | `disabled`    | The disabled mode.                                                                                                                                                          | `boolean`                                                                                                                              | `undefined` |
| `name`        | `name`        | The HTML input field's name.                                                                                                                                                | `string`                                                                                                                               | `undefined` |
| `placeholder` | `placeholder` | The placeholder of text editor.                                                                                                                                             | `string`                                                                                                                               | `''`        |
| `required`    | `required`    | The native HTMLInputElement required attribute.                                                                                                                             | `boolean`                                                                                                                              | `undefined` |
| `validator`   | --            | The validations that this field need. This validations are checked on: - Blur event - Form submit event - Each keyUp event ONLY IF the validateOnKeyup property is present. | `((value: any, field: FormFieldBehavior, form: FormBehavior) => CustomValidityState \| Promise<CustomValidityState>) \| ValidatorFn[]` | `undefined` |
| `validity`    | --            | Get the last validity state from the checkValidity.                                                                                                                         | `{ [x: string]: boolean \| { message?: string; }; }`                                                                                   | `undefined` |
| `value`       | `value`       | The value of the internal text editor.                                                                                                                                      | `string`                                                                                                                               | `''`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
