const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const FILE_PATH = path.resolve('./constructorTransform.code.js');

// Здесь нужен traverse. Но он должен быть в пределах данной функции. Если зашли в другую, то нужен skip.
const hasReturnStatement = (functionPath) =>
  path.node.body.some(node => types.isReturnStatement(node));

// const isConstructorFunction = (path) => {
// };

const main = async () => {
  const fileBuffer = await readFile(FILE_PATH);
  const sourceCode = fileBuffer.toString();

  const ast = parser.parse(sourceCode, {
    sourceType: 'module',
  });

  traverse(ast, {
    // Здесь будет раздельная логика для FunctionDeclaration и FunctionExpression
    Function: {
      enter(path) {
        if (!hasReturnStatement(path)) {
          console.log('Type: ', path.node.type);
          console.log('Node: ', path.node);
        }
      }
    }
  });

  const generatedCode = generate(ast, {}, sourceCode).code;

  // console.log(generatedCode);
};

main();

