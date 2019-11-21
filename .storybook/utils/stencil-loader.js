import path from 'path';
import { storiesOf } from '@storybook/html';
import * as knobs from '@storybook/addon-knobs';

/**
 * Map used to convert TS native types to Storybook's knobs.
 */
const STENCIL_KNOBS_MAP = {
  'string': knobs.text,
  'number': knobs.number,
  'boolean': knobs.boolean,
};

/**
 * Fix Stencil's generated markdown issues.
 */
function cleanNotes(notes) {
  if (notes) {
    // replaces "\|" with "` `" so property tables to break
    return notes.replace(/\\\|/g, '` `');
  }
}

/**
 * Extract the named Component declaration from module's exports.
 * @param _module Module context loaded from Webpack.
 * @returns {*} Component declaration.
 */
function getComponentFromExports(_module) {
  const key = Object.keys(_module).find(exportKey => {
    const _export = _module[exportKey];
    // It is a Stencil Component Declaration?
    return !!_export.is && !!_export.properties;
  });

  return _module[key];
}

/**
 * Find a module by component key and load the file as string.
 * @param dirName Module key from require context
 * @param _module Module context loaded from Webpack.
 * @returns {*} File as string.
 */
function loadModuleByDirName(dirName, _module) {
  const key = _module.keys().find(x => x.indexOf(dirName) > -1);
  return !!key ? _module(key).default : null;
}

/**
 * Create the metadata used to create component's story.
 * @param componentsDefs Components context loaded from Webpack (.js).
 * @param componentsNotes Notes context loaded from Webpack (.md).
 * @param componentsDocs Docs context loaded from Webpack (.mdx).
 * @returns {*}
 */
function buildComponentsMetadata(componentsDefs, componentsNotes, componentsDocs) {
  const componentKeys = componentsDefs.keys();
  return componentKeys
    .map(key => {
      const _module = componentsDefs(key);
      const componentDef = getComponentFromExports(_module);

      // Get the component dir name (eg: my-component/)
      const componentDirName = '/' + path.basename(path.dirname(key)) + '/';
      const notes = loadModuleByDirName(componentDirName, componentsNotes);
      const docs = loadModuleByDirName(componentDirName, componentsDocs);
      if (componentDef) {
        return {
          componentDef,
          key,
          notes: cleanNotes(notes),
          docs
        }
      }
    })
    .filter(x => !!x);
}

function buildKnobs(cmpProperties) {
  const cmpKnobs = {};
  // All components have innerHTML knob by default.
  cmpKnobs['innerHTML'] = knobs.text('innerHTML', '');

  // Create a knob for each available prop.
  return Object.keys(cmpProperties)
    .filter(propKey => cmpProperties[propKey].type !== 'unknown' && STENCIL_KNOBS_MAP[cmpProperties[propKey].type])
    .reduce((knobsMap, propKey) => {
      const propDef = cmpProperties[propKey];
      const defaultValue = propDef.defaultValue ? propDef.defaultValue.replace(/["'\s]/g, '') : null;

      if (propDef.type !== propDef.complexType.original) {
        // If the property's type is an union:
        const complexTypes = propDef.complexType.resolved.split(/\|/g).map(x => x.replace(/["'\s]/g, ''));
        knobsMap[propKey] = complexTypes.length > 4
            ? knobs.select(propKey, complexTypes, defaultValue) // Use Select if have more than 4 options
            : knobs.radios(propKey, complexTypes, defaultValue) // Use Radios if dont.
      } else {
        // If the property's type is a native type:
        knobsMap[propKey] = STENCIL_KNOBS_MAP[propDef.type](propKey, defaultValue);
      }
      return knobsMap;
    }, cmpKnobs);
}

/**
 * Generate a story for each component.
 * @param stories Main story object.
 * @returns {Function} Story generator function.
 */
function createStoryFor(stories) {
  return (componentMetadata) => {
    stories.add(
      componentMetadata.componentDef.name,
      () => {
        const elt = document.createElement(componentMetadata.componentDef.is);
        const cmpKnobs = buildKnobs(componentMetadata.componentDef.properties);
        Object.keys(cmpKnobs).forEach(key => {
          elt[key] = cmpKnobs[key];
        });

        return elt;
      },
      {
        notes: componentMetadata.notes,
        docs: componentMetadata.docs,
      }
    )
  };
}

/**
 * Generate stories for Stencil Components.
 */
export function loadStories(componentsDefs, componentsNotes, componentsDocs) {
  const stories = storiesOf('Components', module);
  stories.addDecorator(knobs.withKnobs);
  const componentsMetadata = buildComponentsMetadata(componentsDefs, componentsNotes, componentsDocs);
  console.log(componentsMetadata);
  componentsMetadata.forEach(createStoryFor(stories));
}
