import { config } from "./theme-config.doczrc";
import path from "path";

export default {
  base: '/solar-components/',
  propsParser: false,
  typescript: true,
  codeSandbox: false,
  themeConfig: config,
  indexHtml: './src/index.html'
}
