import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
// import stripCode from 'rollup-plugin-strip-code';

export const config: Config = {
  // preamble: '(C) Ionic http://ionicframework.com - MIT License',
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
    {
      type: 'angular',
      componentCorePackage: '@accera/solar-components',
      directivesProxyFile: './angular/components/proxies.generated.ts',
      directivesUtilsFile: './angular/components/proxies-utils.ts',
      directivesArrayFile: './angular/components/index.ts',
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
