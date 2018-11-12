const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const FILE_PATH = path.resolve('./scopeTransform.code.js');

const hasOuterBinding = (path, name) =>
  path.scope.hasBinding(name) && !path.scope.hasOwnBinding(name);

const main = async () => {
  const fileBuffer = await readFile(FILE_PATH);
  const code = fileBuffer.toString();

  const ast = parser.parse(code);

  traverse(ast, {
    Function: {
      enter(path) {
        if (hasOuterBinding(path, 'a')) {
          path.scope.push({
            id: types.identifier('a'),
            init: types.numericLiteral(5),
            kind: 'const',
          });
        }
      }
    }
  });

  const generated = generate(ast, {}, code);

  console.log(generated.code);
}

main();

