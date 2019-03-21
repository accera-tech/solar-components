import { storiesOf } from '@storybook/html';
import notes from './readme.md';

storiesOf('Buttons', module)
  .add('Normal', () => '<ac-button>Normal</ac-button>', { notes });
