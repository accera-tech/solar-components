import { configure } from '@storybook/html';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// https://github.com/storybookjs/storybook/issues/4229
if (module.hot) {
  const currentLocationHref = window.location.href;
  module.hot.accept(req.id, () => {
    window.history.pushState(null, null, currentLocationHref);
    location.reload();
  });
}

configure(loadStories, module);
