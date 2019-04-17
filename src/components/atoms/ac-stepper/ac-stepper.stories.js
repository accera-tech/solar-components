import { storiesOf } from '@storybook/html';
import notes from './readme.md';
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";

storiesOf('Stepper', module)
    .addDecorator(withKnobs)
    .add('Stepper', () => {

        const steps = text('Steps', 3);
        const done = text('done', 2)
        return `
        <ac-stepper steps="${steps}" done="${done}"></ac-stepper>
        `;
    }, { notes }
    );
