# ac-modal-controller



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                   | Type     | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------- | -------- | ----------- |
| `bound`  | `bound`   | An optional property used to refer the parent element that the component will be attached to. | `string` | `undefined` |


## Methods

### `create(props: ControllerProps<AcModal>) => Promise<any>`

Setup a new modal on the screen.

#### Parameters

| Name    | Type                                                                                                                                                  | Description |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `props` | `{ transitionBehavior?: any; host?: any; title?: any; closeEv?: any; componentWillLoad?: any; componentDidUnload?: any; close?: any; render?: any; }` |             |

#### Returns

Type: `Promise<any>`



### `dismiss(elt: any) => Promise<any>`

Clear all modals that are displayed.

#### Parameters

| Name  | Type  | Description |
| ----- | ----- | ----------- |
| `elt` | `any` |             |

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
