import { storiesOf } from '@storybook/html';
import notes from './readme.md';
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";

storiesOf('Form Field', module)
    .addDecorator(withKnobs)
    .add('Checkbox', () => {

        const innerText = text('innerText', 'Normal');

        const helperText = text('helperText', 'Helper Text');

        const type = radios('Radio', ['radio', 'checkbox'], 'checkbox');

        const disabled = radios('Disabled', ['true', 'false'], 'false');

        return `
        <ac-check label="${innerText}" helper-text="${helperText}" type="${type}" disabled="${disabled}">
        </ac-check>`;
    }, { notes }
    );
