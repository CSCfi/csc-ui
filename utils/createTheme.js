const setValue = require('./setValue');

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

          theme += `${config.prefix}-${token.name.replace('theme-', '')}: `;
          theme += `${token.value};${config.postfix}`;
        }
      });
  });

  return `${config.fileStart}${theme}${config.fileEnd}`;
};
