const tokens = require('./tokens');
const StyleDictionaryPackage = require('style-dictionary');
const fs = require('fs');
const prettier = require('prettier');

const TAILWIND_DEFAULT_SHADE = '600';

const formats = {
  css: {
    fileStart: ':root {',
    fileEnd: '\n};\n',
    prefix: '\n\t--c',
    postfix: '',
  },
  scss: {
    fileStart: '',
    fileEnd: '',
    prefix: '$c',
    postfix: '\n',
  },
};

const createTheme = (dictionary, type) => {
  const config = formats[type];
  const cache = new Set();

  let theme = '';

  Object.values(dictionary).forEach((dict) => {
    return Object.values(dict)
      .filter((token) => {
        const [category] = token.path || [];

        return category === 'theme';
      })
      .forEach((token) => {
        if (!cache.has(token.name)) {
          cache.add(token.name);

          theme += `${config.prefix}-${token.name.replace('theme-', '')}: `;
          theme += `${token.value};${config.postfix}`;
        }
      });
  });

  return `${config.fileStart}${theme}${config.fileEnd}`;
};

const setValue = (obj = {}, paths = [], value) => {
  const inputObj = obj === null ? {} : { ...obj };

  if (paths.length === 0) {
    return inputObj;
  }

  if (paths.length === 1) {
    const path = paths[0];

    if (path === TAILWIND_DEFAULT_SHADE) {
      // add default value for the color
      // 'bg-primary' === 'bg-primary-600'
      inputObj.DEFAULT = value;
    }

    inputObj[path] = value;

    return { ...inputObj, [path]: value };
  }

  const [path, ...rest] = paths;

  const currentNode = inputObj[path];

  const childNode = setValue(currentNode, rest, value);

  return { ...inputObj, [path]: childNode };
};

/**
 * Create an importable Tailwind CSS theme configuration
 * - remove the 'text' layer
 * - class="text-text-light" => class="text-light"
 */
StyleDictionaryPackage.registerFormat({
  name: 'tailwind/variables',
  formatter({ dictionary }) {
    let config = { colors: {} };

    Object.values(dictionary).forEach((dict) => {
      return Object.values(dict)
        .filter((token) => {
          const [category] = token.path || [];

          return category === 'theme';
        })
        .forEach((token) => {
          const [, ...parts] = token.path || [];

          config = {
            ...setValue(
              config,
              ['colors', ...parts.filter((part) => part !== 'text')],
              token.value,
            ),
          };
        });
    });

    const options = prettier.resolveConfig('./prettier.config.js');

    return prettier.format(`export const theme = ${JSON.stringify(config)}`, options);
  },
});

/**
 * Create the custom css properties for the CSC theme
 * - change the prefix from 'theme' to 'csc'
 */
StyleDictionaryPackage.registerFormat({
  name: 'css/theme/variables',
  formatter({ dictionary }) {
    return createTheme(dictionary, 'css');
  },
});

/**
 * Create the scss variables for the CSC theme
 * - change the prefix from 'theme' to 'csc'
 */
StyleDictionaryPackage.registerFormat({
  name: 'scss/theme/variables',
  formatter({ dictionary }) {
    return createTheme(dictionary, 'scss');
  },
});

StyleDictionaryPackage.registerAction({
  name: 'copy_assets',
  do: function(dictionary, config) {
    config.files.forEach((file) => {
      fs.mkdirSync(config.distPath, { recursive: true })
      fs.copyFileSync(`${config.buildPath}${file.destination}`, `${config.distPath}/${file.destination}`);
    });
    // fs.copySync('src/styles/css', config.buildPath + 'assets');
  }
});

module.exports = {
  source: ['tokens/**/*.json'],

  platforms: {
    // Tailwind CSS theme
    'tailwind/theme': {
      buildPath: `src/styles/tailwind/`,
      distPath: 'dist/tailwind',
      files: [
        {
          destination: `theme.js`,
          format: 'tailwind/variables',
        },
      ],
      actions: ['copy_assets'],
    },

    // Scss theme variables
    'scss/theme/variables': {
      transformGroup: 'scss',
      buildPath: `src/styles/scss/`,
      distPath: 'dist/styles/scss',
      files: [
        {
          destination: '_theme.scss',
          format: 'scss/theme/variables',
          filter: {
            attributes: {
              category: 'theme',
            },
          },
        },
      ],
      actions: ['copy_assets'],
    },

    // Other scss variables
    'scss/category': {
      transformGroup: 'scss',
      buildPath: `src/styles/scss/`,
      // distPath: 'dist/styles/scss',
      files: tokens
        .filter((tokenCategory) => tokenCategory !== 'theme')
        .map((tokenCategory) => ({
          destination: `_${tokenCategory}.scss`,
          format: 'scss/variables',
          filter: {
            attributes: {
              category: tokenCategory,
            },
          },
        })),
      // actions: ['copy_assets'],
    },

    // Css theme variables
    'css/theme': {
      transformGroup: 'css',
      buildPath: `src/styles/css/`,
      distPath: 'dist/styles/css',
      files: [
        {
          destination: `theme.css`,
          format: 'css/theme/variables',
          filter: {
            attributes: {
              category: 'theme',
            },
          },
        },
      ],
      actions: ['copy_assets'],
    },

    // Other css variables
    'css/category': {
      transformGroup: 'css',
      buildPath: `src/styles/css/`,
      // distPath: `dist/styles/css`,
      files: tokens
        .filter((tokenCategory) => tokenCategory !== 'theme')
        .map((tokenCategory) => ({
          destination: `${tokenCategory}.css`,
          format: 'css/variables',
          filter: {
            attributes: {
              category: tokenCategory,
            },
          },
          options: {
            selector: ':host',
          },
        })),
      // actions: ['copy_assets'],
    },

    scss: {
      transformGroup: 'scss',
      buildPath: 'src/styles/',
      prefix: 'csc',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
        },
      ],
    },

    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      prefix: 'csc',
      files: [
        {
          format: 'css/variables',
          destination: 'variables.css',
          options: {
            selector: ':host',
          },
        },
      ],
    },
  },
};
