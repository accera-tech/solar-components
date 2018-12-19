import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'solar',
  globalStyle: 'src/global/css/main.scss',
  outputTargets:[
    {
      type: 'dist',
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  copy: [
    { src: 'theme', dest: 'scss' },
    { src: 'global/js/react', dest: 'react' }
  ],
  plugins: [
    sass()
  ],
};
