const setValue = require('./setValue');
const getRgbValue = require('./getRgbValue');

const formats = {
  css: {
    fileStart: ':root,\n:host {',
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

const baseColor = '600';

module.exports = (dictionary, type) => {
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

          const isBaseValue = (name) => {
            const baseValues = [baseColor, 'white', 'black']

            return baseValues.some(value => name.endsWith(value));
          };

          const name = token.name.replace('theme-', '');

          theme += `${config.prefix}-${name}: `;
          theme += `${token.value};${config.postfix}`;

          if (isBaseValue(name)) {
            theme += `${config.prefix}-${name.replace(`-${baseColor}`, '')}-rgb: `;
            theme += `${getRgbValue(token.value)};${config.postfix}`;
          }
        }
      });
  });

  return `${config.fileStart}${theme}${config.fileEnd}`;
};
