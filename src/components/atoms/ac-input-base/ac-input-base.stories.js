import { storiesOf } from '@storybook/html';
import notes from './readme.md';
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";

storiesOf('Form Field', module)
    .addDecorator(withKnobs)
    .add('Basic Input', () => {
        const label = text('Label', 'Example');
        const type = select('Type', ['number', 'text', 'date', 'password'], 'date');
        const min = text('Min', '0');
        const max = text('Max', '10');
        const disabled = radios('Disabled', ['true', 'false'], 'false');
        return `
        <ac-input-base type="${type}" max="${max}" min="${min}" id="inputExample" label="${label}" value="Value" disabled="${disabled}">        
        </ac-input-base>
        `;
    }, { notes }
    );
