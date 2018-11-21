'use strict';

module.exports = function (babel) {
  const { types } = babel;

  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        if (name === 'a') {
          path.replaceWith(
            types.identifier('foo'),
          );
        }

        if (name === 'b') {
          path.replaceWith(
            types.identifier('bar'),
          );
        }
      },
    },
  }; 
};

