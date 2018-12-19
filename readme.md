# Solar Components
![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

This is a implementation of [Accera's Design System](https://design.accera.com.br) in WebComponents.

## Why Stencil?

Stencil is a compiler for building Web Components with ease.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

To start developing new components in this lib, clone this repo to a new directory:

and run:

```bash
npm install
npm start
```

Follow [Stencil docs](https://stenciljs.com/docs/my-first-component) to create your component.

This lib is build based on the [Atomic Design](http://atomicdesign.bradfrost.com/), taking advantage of it modularity approach.

To build this lib for production, run:

```bash
npm run build
```

### Components Guidelines

* **Naming:** All components should start with `ac` prefix;

## Using this Library

### With any application
- In your project, run `npm install @accera/solar-components@beta --save`
- Put a script tag similar to this in the `head` of your `index.html`:
```html
<script src='node_modules/@accera/solar-components/dist/solar.js'></script>
``` 
- Then you can use an Solar element anywhere in your template, JSX, html etc
- Note that your project needs to support [NPM packages](https://docs.npmjs.com/cli/init)

### With React

- In your project, run `npm install @accera/solar-components@beta --save`
- In the main script of your application, update the code to something like:

```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// test-component is the name of our made up Web Component that we have
// published to npm:
import { defineCustomElements } from '@accera/solar-components/dist/loader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
defineCustomElements(window);
```

- Anytime you want to use a web component from this library, you use:

```jsx harmony
import { SolarComponent } from '@accera/solar-components/dist/collection/react';

export function Example (props) {
  return (
    <SolarComponent
      componet="ac-input"
      type="password"
      helperText="This is your password"
      onChange={this.handleChange}
    />
  );
}
```

### Theming

This library use CSS variables to work with themes. You can customize colors declaring it in your main CSS file:
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
Check out the [_default.theme.scss](https://github.com/accera-tech/solar-components/blob/master/src/theme/_default.theme.scss) to discover all the theme variables that you can customize.

### Extending your Style

Also, you can apply the global style of Solar in your application putting this code in the `head` of your `index.html`.
```html
<link rel="stylesheet" href="@import "node_modules/@accera/solar-components/dist/solar.css">
```
Or import it in your CSS/SCSS using:
```scss
@import "node_modules/@accera/solar-components/dist/solar.css";
```

This will add some features like:
- Typography Styles (`h1 h2 p...`)
- Webkit scrollbar styles
- Tooltip util

You can also use the variables defined in this lib in your SCSS:
```scss
@import "node_modules/@accera/solar-components/dist/theme/variables";
```
