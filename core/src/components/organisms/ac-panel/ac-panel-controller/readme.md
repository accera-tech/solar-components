# ac-panel-controller



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                   | Type     | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------- | -------- | ----------- |
| `bound`  | `bound`   | An optional property used to refer the parent element that the component will be attached to. | `string` | `undefined` |


## Methods

### `create(props: ControllerComponentOptions<AcPanel & AcPopper>) => Promise<any>`

Setup a new modal on the screen.

#### Returns

Type: `Promise<any>`



### `dismiss(elt?: any) => Promise<any>`

Clear all modals that are displayed.

#### Returns

Type: `Promise<any>`




## Dependencies

### Depends on

- [ac-popper](../../../portals/ac-popper)

### Graph
```mermaid
graph TD;
  ac-panel-controller --> ac-popper
  style ac-panel-controller fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
