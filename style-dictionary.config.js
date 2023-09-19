const tokens = require('./tokens');
const StyleDictionaryPackage = require('style-dictionary');
const fs = require('fs');
const prettier = require('prettier');
const createTheme = require('./utils/createTheme');
const setValue = require('./utils/setValue');

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
              category: 'c',
              // category: tokenCategory,
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
              // category: tokenCategory,
              category: 'c',
            },
          },
          options: {
            selector: ':host, :root',
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
