import { storiesOf } from '@storybook/html';
import notes from './readme.md';
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";

storiesOf('Form Field', module)
    .addDecorator(withKnobs)
    .add('Input', () => {

        const type = select('Type', ['text', 'password'], 'text');
        const mask = text('Mask', null);
        const pattern = text('Pattern', null)
        return `
        <ac-input name="user[${type}]" label="${type}" type="${type}" required="The ${type} is Required"
        ${mask ? `mask="${mask}"`: ''} ${pattern ? `pattern="${pattern}"`: ''}>
        <i class="fas fa-lock" slot="item-start"></i>
        </ac-input>
        `;
    }, { notes }
    );
