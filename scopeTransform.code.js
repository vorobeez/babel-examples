const a = 1;

function firstScope() {
  const a = 2;

  function thirdScope() {
    return a;
  }

  return thirdScope;
}

const b = firstScope();

