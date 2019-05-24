import { storiesOf } from '@storybook/html';
import notes from './readme.md';
import { withKnobs, text, select, radios } from "@storybook/addon-knobs";

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .add('Normal', () => {
      const theme = select(
        'theme',
        ['primary', 'secondary', 'white', 'info', 'success', 'warning', 'alert', 'light', 'black'],
        'white'
      );
      const innerText = text('innerText', 'Normal');
      const fill = radios('fill', ['flat', 'solid', 'clear'], 'solid');
      const size = radios('size', ['small', 'big', 'normal'], 'normal');

      return `
        <ac-button theme="${theme}" fill="${fill}" size="${size}">
          ${innerText}
        </ac-button>
      `;
    }, {notes}
  );
