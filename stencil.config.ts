import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
// import stripCode from 'rollup-plugin-strip-code';

export const config: Config = {
  namespace: 'solar',
  globalStyle: 'src/global/css/main.scss',
  globalScript: 'src/global/solar-global.ts',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'www',
      serviceWorker: null,
    }
  ],
  copy: [
    { src: 'theme', dest: 'scss' },
  ],
  plugins: [
    sass(),
    // stripCode({
    //   start_comment: 'devblock:start',
    //   end_comment: 'devblock:end'
    // })
  ],
};
