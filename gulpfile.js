const { watch, src, dest, series } = require('gulp');
const inject = require('gulp-inject-string');
const flatten = require('gulp-flatten');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const docsDest = 'docs/src/pages/components';
const mdxSrcGlob = 'core/src/**/*.{md,mdx}';
const mdxLoader =
  `import { Playground } from 'docz';
import { JSCodeBlock } from '@components/JSCodeBlock';
import { defineCustomElements } from '@accera/solar-components.core/dist/loader';
defineCustomElements(window);

`;

/**
 * Copy all mdx files to docs package.
 * @param glob The glob rule to run.
 * @param [customDest] The dest path.
 * @returns {*}
 */
function docsCopy(glob, customDest) {
  return src(glob)
    .pipe(replace(
      /^````html(.+?(?=````))````$/gms,
      '<Playground>$1</Playground>',
      { logs: { enabled: false } })
    )
    .pipe(replace(
      /^````js(.+?(?=````))````$/gms,
      '<JSXCodeBlock>{`$1`}</JSXCodeBlock>',
      { logs: { enabled: false } })
    )
    .pipe(inject.after('\n---\n', mdxLoader))
    .pipe(flatten({ includeParents: -1 }))
    .pipe(rename(path => {
      path.basename = 'code';
      path.extname = '.mdx'
    }))
    .pipe(dest(customDest || docsDest));
}

function docsWatch() {
  const watcher = watch(mdxSrcGlob);

  watcher.on('change', docsCopyFromPath);
  watcher.on('add', docsCopyFromPath);

  return watcher;
}

function docsCopyAll() {
  return docsCopy(mdxSrcGlob);
}

function docsCopyFromPath(path) {
  const splittedPath = path.split('/');
  return docsCopy(path, docsDest + '/', splittedPath[splittedPath.length - 2])
}

exports.docsCopy = docsCopyAll;
exports.docsWatch = series(docsCopyAll, docsWatch);
