const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;

const code = `
  const a = 1;
  const b = 2;

  console.log(
    a === b
  );
`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: 'a'})) {
      path.replaceWith(
        types.identifier('foo'),
      );
    }

    if (path.isIdentifier({ name: 'b'})) {
      path.replaceWith(
        types.identifier('bar'),
      );
    }
  }
});

const output = generate(ast, {}, code);

console.log(output.code);

