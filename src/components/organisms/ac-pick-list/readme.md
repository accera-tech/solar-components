# ac-pick-list



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type               | Default        |
| ---------------- | ------------------ | ----------- | ------------------ | -------------- |
| `addAllLabel`    | `add-all-label`    |             | `string`           | `'Add all'`    |
| `addLabel`       | `add-label`        |             | `string`           | `'Add'`        |
| `availableLabel` | `available-label`  |             | `string`           | `undefined`    |
| `noResultsLabel` | `no-results-label` |             | `string`           | `undefined`    |
| `options`        | --                 |             | `ListOption<{}>[]` | `undefined`    |
| `removeAllLabel` | `remove-all-label` |             | `string`           | `'Remove All'` |
| `removeLabel`    | `remove-label`     |             | `string`           | `'Remove'`     |
| `searchLabel`    | `search-label`     |             | `string`           | `undefined`    |
| `selectedLabel`  | `selected-label`   |             | `string`           | `undefined`    |


## Dependencies

### Depends on

- [ac-list](../../molecules/ac-list)
- [ac-button](../../atoms/ac-button)

### Graph
```mermaid
graph TD;
  ac-pick-list --> ac-list
  ac-pick-list --> ac-button
  ac-list --> ac-input-base
  ac-list --> ac-button
  ac-list --> ac-check
  style ac-pick-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
