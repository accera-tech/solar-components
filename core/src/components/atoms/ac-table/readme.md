# ac-table



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type                                                                                                                            | Default                                                                                                                                         |
| ---------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `fetch`          | `fetch`            |             | `any`                                                                                                                           | `undefined`                                                                                                                                     |
| `loading`        | `loading`          |             | `boolean`                                                                                                                       | `undefined`                                                                                                                                     |
| `noResultsLabel` | `no-results-label` |             | `string`                                                                                                                        | `undefined`                                                                                                                                     |
| `options`        | --                 |             | `Options`                                                                                                                       | `undefined`                                                                                                                                     |
| `params`         | --                 |             | `{ ordering: string; property: string; selected: number; filters: { limitRows: string; totalRows: string; search: string; }; }` | `{     ordering: 'asc',     property: '',     selected: 1,     filters: {       limitRows: '',       totalRows: '',       search: ''     }   }` |
| `selectRow`      | `select-row`       |             | `any`                                                                                                                           | `undefined`                                                                                                                                     |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `changeOrder` |             | `CustomEvent<any>` |
| `tableChange` |             | `CustomEvent<any>` |


## Methods

### `update() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
