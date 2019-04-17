import { storiesOf } from '@storybook/html';
import notes from './readme.md';
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";

storiesOf('Nav drawer', module)
    .addDecorator(withKnobs)
    .add('normal', () => {
        return `
        <ac-navdrawer theme="primary">
        <span slot="header-title">Teste</span>
        </ac-navdrawer>
        `;
    }, { notes }
    );





    