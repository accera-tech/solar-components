const { watch, src, dest } = require('gulp');
const inject = require('gulp-inject-string');
const flatten = require('gulp-flatten');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const ghpages = require('gh-pages');

const docsDest = 'docs/src/pages/components';
const mdxSrcGlob = 'core/src/**/*.{md,mdx}';
const mdxLoader =
`import { Playground } from 'docz';
import { defineCustomElements } from '@accera/solar-components.core/dist/loader';
defineCustomElements(window);

`;

/**
 * Copy all mdx files to docs package.
 * @param glob The glob rule to run.
 * @returns {*}
 */
function docsCopy(glob) {
  return src(glob)
    .pipe(replace(
      /^````html(.+?(?=````))````$/gms,
      '<Playground>$1</Playground>',
      { logs: { enabled: false } })
    )
    .pipe(inject.after('\n---\n', mdxLoader))
    .pipe(flatten({ includeParents: -1 }))
    .pipe(rename(path => {
      path.basename = 'code';
      path.extname = '.mdx'
    }))
    .pipe(dest(docsDest));
}

function docsPublish() {
  return new Promise(res => {
    ghpages.publish('docs/.docz/dist', res);
  });
}

exports.docsCopy = () => docsCopy(mdxSrcGlob);
exports.docsPublish = docsPublish;
exports.docsWatch = () => {
  const watcher = watch(mdxSrcGlob);

  watcher.on('change', path => docsCopy(path));
  watcher.on('add', path => docsCopy(path));

  return watcher;
};
