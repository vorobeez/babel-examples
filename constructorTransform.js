'use strict';

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const FILE_PATH = path.resolve('./constructorTransform.code.js');

const UPPERCASE_PATTERN = /^[A-Z]/;

const isUpperCase = (str) => UPPERCASE_PATTERN.test(str);

const hasReturnStatement = (functionPath) => {
  let returnStatementFound = false;

  functionPath.traverse({
    Function(path) {
      path.skip();
    },
    ReturnStatement(path) {
      returnStatementFound = true;
      path.stop();
    }
  });

  return returnStatementFound;
};

const getFunctionIdentifier = (functionPath) => {
  if (functionPath.isFunctionDeclaration()) {
    return functionPath.node.id;
  }

  if (functionPath.isFunctionExpression() && types.isVariableDeclarator(functionPath.parent)) {
    return functionPath.parent.id;
  }

  return null;
};

const hasUpperCaseIdentifierName = (functionPath) => {
  const identifier = getFunctionIdentifier(functionPath);

  return identifier && isUpperCase(identifier.name);
};

const isFunctionConstructor = (functionPath) => 
  !hasReturnStatement(functionPath) && hasUpperCaseIdentifierName(functionPath);

const buildClassDeclarationFromFunctionConstructor = (functionPath) => {
  const identifier = getFunctionIdentifier(functionPath);

  const classConstructor = types.classMethod(
    'constructor',
    types.identifier('constructor'),
    functionPath.node.params,
    functionPath.node.body,
  );

  const classBody = types.classBody([
    classConstructor,
  ]);

  const classDeclaration = types.classDeclaration(
    identifier,
    null,
    classBody,
  );

  return classDeclaration;
};

const replaceFunctionWithClassDeclaration = (functionPath, classDeclaration) => {
  if (functionPath.isFunctionDeclaration()) {
    functionPath.replaceWith(classDeclaration);
    return;
  }

  functionPath.parentPath.replaceWith(classDeclaration);
};

const main = async () => {
  const fileBuffer = await readFile(FILE_PATH);
  const sourceCode = fileBuffer.toString();

  const ast = parser.parse(sourceCode, {
    sourceType: 'module',
  });

  traverse(ast, {
    "FunctionDeclaration|FunctionExpression": {
      enter(path) {
        if (isFunctionConstructor(path)) {
          const classDeclaration = buildClassDeclarationFromFunctionConstructor(path);
          replaceFunctionWithClassDeclaration(path, classDeclaration);
        }
      }
    }
  });

  const generatedCode = generate(ast, {}, sourceCode).code;

  console.log(generatedCode);
};

main();

