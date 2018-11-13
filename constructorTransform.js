const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const FILE_PATH = path.resolve('./constructorTransform.code.js');

const main = async () => {
  const fileBuffer = await readFile(FILE_PATH);
  const sourceCode = fileBuffer.toString();

  const ast = parser.parse(sourceCode);

  traverse(ast, {
    Function: {
      enter(path) {
        console.log(path.node.type, path.node.id);
      }
    }
  });

  const generatedCode = generate(ast, {}, sourceCode).code;

  // console.log(generatedCode);
};

main();

