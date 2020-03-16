---
name: Toast
menu: Componentes
---


# ac-toast

````html
<ac-toast theme="alert" title="teste" message="Teste"></ac-toast>
<ac-toast-controller></ac-toast-controller>
````



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                                          | Default     |
| --------- | --------- | ----------- | --------------------------------------------- | ----------- |
| `message` | `message` |             | `string`                                      | `undefined` |
| `title`   | `title`   |             | `string`                                      | `undefined` |
| `type`    | `type`    |             | `"alert" \| "info" \| "success" \| "warning"` | `undefined` |


## Events

| Event   | Description | Type                |
| ------- | ----------- | ------------------- |
| `close` |             | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
