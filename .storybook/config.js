import { configure } from '@storybook/html';
import { loadStories } from './utils/stencil-loader';

const componentsDefs = require.context('../dist/collection/components', true, /\.js$/);
const componentsNotes = require.context('../src/components', true, /\.md$/);
const componentsDocs = require.context('../src/components', true, /\.mdx$/);

configure(() => loadStories(componentsDefs, componentsNotes, componentsDocs), module);
