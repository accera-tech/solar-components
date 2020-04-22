import fs from 'fs';
import { dirname } from 'path';
import { createPlugin } from 'docz-core';
import glob from 'glob';
import { config } from './theme-config.doczrc';

export default {
  base: '/solar-components/',
  files: '.docz/pages/**/*.{md,mdx}',
  propsParser: false,
  typescript: true,
  codeSandbox: false,
  themeConfig: config,
  public: '/public',
  indexHtml: './src/index.html',
  onCreateWebpackChain: config => {
    config.resolve.alias
      .set('@components', `src/components`);
    return config
  },
  // theme: 'src/theme/index',
  // modifyBundlerConfig: (config) => {
  //   config.module.rules.push({
  //     test: /\.css$/i,
  //     use: ['style-loader', 'css-loader']
  //   });
  //
  //   return config
  // },
  plugins: [
    createPlugin({
      modifyFiles: doczFiles => {
        const files = glob.sync('src/pages/**/*.{md,mdx}');
        files.forEach(file => {
          const mdContent = fs
            .readFileSync(file, { encoding: 'utf8' })
            .split('---');

          mdContent[2] = [
            "",
            "",
            "import { Playground } from 'docz';",
            "import { AdobeXDPreview } from '@components/AdobeXDPreview';",
            "import { JSCodeBlock } from '@components/JSCodeBlock';",
            "import { defineCustomElements } from '@accera/solar-components.core/dist/loader';",
            "defineCustomElements(window);",
            "",
          ].join('\n') + mdContent[2];

          const mdContentString = mdContent.join('---');
          mdContentString.replace(/^````html(.+?(?=````))````$/gms, '<Playground>$1</Playground>');
          mdContentString.replace(/^````js(.+?(?=````))````$/gms, '<JSCodeBlock>$1</JSCodeBlock>');
          mdContentString.replace(/^\[View in AdobeXD]\((.)\)$/gms, '<AdobeXDPreview url={"$1"}/>');

          const destPath = file.replace('src', '.docz');
          if (!fs.existsSync(dirname(destPath))) {
            fs.mkdirSync(dirname(destPath), { recursive: true } );
          }
          fs.writeFileSync(file.replace('src', '.docz'), mdContentString);
        });
        return doczFiles;
      }
    }),
  ]
}
