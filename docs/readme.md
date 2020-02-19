# Solar Components Docs

The [Solar Components Docs](https://accera-tech.github.io/solar-components) is the main site of Solar Component documentation.

## Contributing

### Documenting Components
Built with [docz](https://docz.site/) v1, we document components using the stencil's generated documents.
Each component in the [core](https://github.com/accera-tech/solar-components/tree/master/core/src/components) package have a
`readme.md` file. We use the markdown code tags (with ````html) to create examples with docz's Playground.

#### How it works
All these files are copied into `src/pages` folder and renamed to `code.mdx`. That process is required because docz can only read the `src` folder to
build the documentation site. So, these files are ignored because they are part of the generation process. Check the [gulpfile.js](/gulpfile.js) to
know how this pipeline works.

## Related links

- [Carbon Design System](https://www.carbondesignsystem.com/): An example of what we want to achieve.
- [Docz v1 Documentation](https://github.com/doczjs/docz-website/blob/v1/src/docs/documentation/references/project-configuration.mdx)
- [Docz v1 Theme](https://github.com/doczjs/docz/tree/v1.2.0/core/docz-theme-default/src)
- [Docz v1 customization example](https://github.com/doczjs/docz-website/tree/v1/src/theme)
