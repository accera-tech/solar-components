import { Config } from '@stencil/core/dist/declarations/config';
import { sass } from '@stencil/sass';
// import stripCode from 'rollup-plugin-strip-code';

export const config: Config = {
  // preamble: '(C) Ionic http://ionicframework.com - MIT License',
  _lifecycleDOMEvents: true, // EXPERIMENTAL FEATURE
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
    },
    {
      type: 'docs-readme',
      strict: true
    },
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
