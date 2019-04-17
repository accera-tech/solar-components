import { storiesOf } from '@storybook/html';
import notes from './readme.md';
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";

storiesOf('Header', module)
    .addDecorator(withKnobs)
    .add('Basic Header', () => {
        return `
        <div style="position: relative; width: 460px;">
        <ac-header> Basic Header with Action
        <div slot="actions">
        <ac-button slot="actions" size="small" theme="primary">Action</ac-button>
        </div>
        </ac-header>
        </div>
        `;
    }, { notes }
    )
    .add('Header With Tabs', () => {

        return `
        <ac-header>
    Header with Tabs
    <ac-tabs theme="secondary" slot="sub-header">
    <ac-tab id="tab1">Tab 1</ac-tab>
    <ac-tab id="tab2">Tab 2</ac-tab>
    <ac-tab id="tab3" active>Tab 3</ac-tab>
    <ac-tab id="tab5">Tab 5</ac-tab>
    <ac-tab id="tab6">Tab 6</ac-tab>
    </ac-tabs>
    </ac-header>
        `;
    }, { notes }
    );
