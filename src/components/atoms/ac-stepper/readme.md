# ac-stepper



























































































































































<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                  | Type     | Default     |
| -------- | --------- | -------------------------------------------------------------------------------------------- | -------- | ----------- |
| `done`   | `done`    | The number of concluded steps.                                                               | `number` | `undefined` |
| `steps`  | `steps`   | The count of steps to be displayed. TODO: It mighty support an array of steps in the future. | `number` | `undefined` |


## Events

| Event    | Description                              | Type                             |
| -------- | ---------------------------------------- | -------------------------------- |
| `change` | Dispatched when the steps state changes. | `CustomEvent<{ index: number }>` |


## Methods

### `next() => void`

Increments the count of concluded steps.

#### Returns

Type: `void`



### `previous() => void`

Decrement the count of concluded steps.

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
