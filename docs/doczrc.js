import { config } from './theme-config.doczrc';

export default {
  // Comment this line when using docz serve!!!
  base: '/solar-components/',
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
}
