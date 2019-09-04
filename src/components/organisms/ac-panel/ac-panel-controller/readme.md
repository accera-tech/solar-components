# ac-panel-controller



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                   | Type     | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------- | -------- | ----------- |
| `bound`  | `bound`   | An optional property used to refer the parent element that the component will be attached to. | `string` | `undefined` |


## Methods

### `create(props: ControllerComponentOptions<AcPanel & AcPopper>) => Promise<any>`

Setup a new modal on the screen.

#### Parameters

| Name    | Type                                                                                                                                          | Description |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `props` | `FieldsOf<AcPanel & AcPopper> & { [key: string]: any; component?: any; componentProps?: any; wrapper?: any; render?: (data: any) => VNode; }` |             |

#### Returns

Type: `Promise<any>`



### `dismiss(elt?: any) => Promise<any>`

Clear all modals that are displayed.

#### Parameters

| Name  | Type  | Description |
| ----- | ----- | ----------- |
| `elt` | `any` |             |

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
