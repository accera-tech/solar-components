import { storiesOf } from '@storybook/html';
import notes from './readme.md';
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";

storiesOf('Form Field', module)
    .addDecorator(withKnobs)
    .add('Basic Input', () => {
        const label = text('Label', 'Example');
        const size = select('Size', ['small', 'large', null], null);
        const type = select('Type', ['number', 'text', 'date', 'password'], 'date');
        const min = text('Min', '0');
        const max = text('Max', '10');
        const disabled = radios('Disabled', ['true', 'false'], 'false');

        return `
        <ac-input-base
            type="${type}"
            max="${max}"
            min="${min}"
            label="${label}"
            value="Value"
            disabled="${disabled}"
            size="${size}"
        >        
        </ac-input-base>
        `;
    }, { notes }
    );
