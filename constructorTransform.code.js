export function FirstConstructor(firstParam, secondParam) {
  this.first = firstParam;
  this.second = second;
}

export function firstUtilFunction(firstParam, secondParam) {
  return firstParam + secondParam;
}

export function secondUtilFunction({ firstParam, secondParam }) {
  const result = firstUtilFunction(firstParam, secondParam);

  return result + 42;
}

export const SecondConstructor = function ({ firstParam, secondParam }) {
  this.third = firstParam + secondParam;
  this.fourth = firstParam * secondParam;
  this.getThird = () => this.thrid;
  this.setThird = (third) => this.third = third;
  this.getFourth = () => this.fourth;
  this.setFourth = (fourth) => this.fourth = fourth;
};

SecondConstructor.prototype.getProps = function () {
  return {
    third: this.third,
    fourth: this.fourth,
  };
};

SecondConstructor.prototype.setProps = function setProps({ third, fourth }) {
  this.setThird(third);
  this.setFourth(fourth);
};

