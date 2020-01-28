# Solar Components

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
[![version](https://img.shields.io/npm/v/@accera/solar-components.core/latest.svg)](https://www.npmjs.com/package/@accera/solar-components.core) 

This is an implementation of [Accera's Design System](https://design.accera.com.br) in WebComponents.


## Packages 📦

| Project | Package | Doc |
| ------- | ------- |:-----:|
| **Core** | [`@accera/solar-components.core`](https://www.npmjs.com/package/@accera/solar-components.core) | [`README.md`](core/README.md)
| **Angular** | [`@accera/solar-components.angular`](https://www.npmjs.com/package/@accera/solar-components.angular) | [`README.md`](angular/README.md)
| **React** | [`@accera/solar-components.react`](https://www.npmjs.com/package/@accera/solar-components.react) | [`README.md`](react/README.md)


## Getting Started 🔌

### With JS

#### Pure JS & HTML

Put a script tag similar to this in the `head` of your `index.html`:
```html
<script src='https://unpkg.com/@accera/solar-components.core/dist/solar.js'></script>
``` 


#### With Bundlers and Transpilers

In your project, run `npm install @accera/solar-components.core --save`
```js
import { applyPolyfills, defineCustomElements } from '@accera/solar-components.core/dist/loader';
applyPolyfills().then(() => {
  defineCustomElements(window);
});
```

### With Angular

> Coming Soon

### With React

> Coming Soon

### Theming 💅

We use CSS variables to work with themes. You can customize colors declaring it in a `:root` block in your main CSS file:
```css
:root {
  --color-primary-normal: #FF5E00;
  --color-primary-normal-rgb: 255, 94, 0;
  --color-primary-dark: #cc4b00;
  --color-primary-dark-rgb: 204, 75.2, 0;
  --color-primary-light: #ff7e33;
  --color-primary-light-rgb: 255, 126.2, 51;
  --color-secondary-normal: #0080FF;
  --color-secondary-normal-rgb: 0, 128, 255;
  --color-secondary-dark: #0066cc;
  --color-secondary-dark-rgb: 0, 102.4, 204;
  --color-secondary-light: #3399ff;
  --color-secondary-light-rgb: 51, 153.4, 255;
}
```
Check out the [_default.theme.scss](/core/src/theme/_default.theme.scss) to discover all the theme variables that you can customize.

Note that you need to define the `--color-<color-name>-<brightness>-rgb` for each color that you customize.


### Extending your Style 👌

Optionally, you can apply the global style of Solar in your application putting this code in the `head` of your `index.html`.
```html
<link rel="stylesheet" href="/node_modules/@accera/solar-components.core/dist/solar.css">
```
Or import it in your CSS/SCSS using:
```scss
@import "node_modules/@accera/solar-components.core/dist/solar.css";
```

This will add some features like:
- CSS Reset
- Webkit scrollbar styles
- [Bootstrap 4's Layout tools](https://getbootstrap.com.br/docs/4.1/layout/overview/)
- [Animations](/core/src/global/css/_animations.scss)
- [Skeletons](/core/src/global/css/_skeletons.scss)

You can also use the variables defined in this lib in your SCSS:
```scss
@import "node_modules/@accera/solar-components.core/collection/scss/variables";
```


## Contributing 👋

Thanks for your interest in contributing ✨! Read up on our guidelines for [contributing](/.github/CONTRIBUTING.md) to know how help us 😄.