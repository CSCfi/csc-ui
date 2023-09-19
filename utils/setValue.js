const TAILWIND_DEFAULT_SHADE = '600';

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

module.exports = setValue;
