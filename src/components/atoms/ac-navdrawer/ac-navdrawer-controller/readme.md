# ac-navdrawer-controller



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                   | Type     | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------- | -------- | ----------- |
| `bound`  | `bound`   | An optional property used to refer the parent element that the component will be attached to. | `string` | `undefined` |


## Methods

### `create(props: ControllerComponentOptions<AcNavdrawer & AcOverlay>) => Promise<any>`

Setup a new navdrawer on the screen.

#### Returns

Type: `Promise<any>`



### `dismiss() => Promise<void>`

Clear all modals that are displayed.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [ac-overlay](../../../portals/ac-overlay)

### Graph
```mermaid
graph TD;
  ac-navdrawer-controller --> ac-overlay
  style ac-navdrawer-controller fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
