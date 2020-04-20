import { config } from "./theme-config.doczrc";

export default {
  base: '/solar-components/',
  propsParser: false,
  typescript: true,
  codeSandbox: false,
  themeConfig: config,
  public: '/public',
  indexHtml: './src/index.html',
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
