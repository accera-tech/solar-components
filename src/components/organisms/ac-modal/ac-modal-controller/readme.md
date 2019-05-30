# ac-modal-controller



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                   | Type     | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------- | -------- | ----------- |
| `bound`  | `bound`   | An optional property used to refer the parent element that the component will be attached to. | `string` | `undefined` |


## Methods

### `create(props: ControllerComponentOptions<AcModal & AcOverlay>) => Promise<any>`

Setup a new modal on the screen.

#### Parameters

| Name    | Type                                                                                                                                                  | Description |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `props` | `ComponentFields<AcModal & AcOverlay> & { [key: string]: any; component?: any; componentProps?: any; wrapper?: any; render?: (data: any) => VNode; }` |             |

#### Returns

Type: `Promise<any>`



### `dismiss(data: any) => Promise<any>`

Clear all modals that are displayed.

#### Parameters

| Name   | Type  | Description |
| ------ | ----- | ----------- |
| `data` | `any` |             |

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
