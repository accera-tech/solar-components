# ac-modal-controller



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                   | Type     | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------- | -------- | ----------- |
| `bound`  | `bound`   | An optional property used to refer the parent element that the component will be attached to. | `string` | `undefined` |


## Methods

### `create(props: ControllerComponentOptions<AcModal & AcOverlay>) => Promise<any>`

Setup a new modal on the screen.

#### Returns

Type: `Promise<any>`



### `dismiss(data: any) => Promise<any>`

Clear all modals that are displayed.

#### Returns

Type: `Promise<any>`




## Dependencies

### Depends on

- [ac-overlay](../../../portals/ac-overlay)

### Graph
```mermaid
graph TD;
  ac-modal-controller --> ac-overlay
  style ac-modal-controller fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
