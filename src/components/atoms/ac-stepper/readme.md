# ac-stepper



























































































































































<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                  | Type     | Default     |
| -------- | --------- | -------------------------------------------------------------------------------------------- | -------- | ----------- |
| `done`   | `done`    | The number of concluded steps.                                                               | `number` | `undefined` |
| `steps`  | `steps`   | The count of steps to be displayed. TODO: It mighty support an array of steps in the future. | `number` | `undefined` |


## Events

| Event           | Description                              | Type                              |
| --------------- | ---------------------------------------- | --------------------------------- |
| `stepperChange` | Dispatched when the steps state changes. | `CustomEvent<{ index: number; }>` |


## Methods

### `next() => Promise<void>`

Increments the count of concluded steps.

#### Returns

Type: `Promise<void>`



### `previous() => Promise<void>`

Decrement the count of concluded steps.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
