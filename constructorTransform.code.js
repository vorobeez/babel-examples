function FirstConstructor(firstParam, secondParam) {
  this.first = firstParam;
  this.second = second;
}

function firstUtilFunction(firstParam, secondParam) {
  return firstParam + secondParam;
}

function secondUtilFunction({ firstParam, secondParam }) {
  const result = firstUtilFunction(firstParam, secondParam);

  return result + 42;
}

function SecondConstructor({ firstParam, secondParam }) {
  this.third = firstParam + secondParam;
  this.getThird = () => this.thrid;
}

SecondConstructor.prototype.getSomeInfo = function () {
  return {
    info: {},
  };
}

SecondConstructor.prototype.getSomeMeta = function getSomeMeta() {
  return {
    meta: {},
  };
}

