interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

const createConcreteFactory1: () => AbstractFactory = () => ({
  createProductA: () => createConcreteProductA1(),
  createProductB: () => createConcreteProductB1(),
});

const createConcreteFactory2: () => AbstractFactory = () => ({
  createProductA: () => createConcreteProductA2(),
  createProductB: () => createConcreteProductB2(),
});

interface AbstractProductA {
  usefulFunctionA(): string;
}

const createConcreteProductA1: () => AbstractProductA = () => ({
  usefulFunctionA: () => "The result of the product A1.",
});

const createConcreteProductA2: () => AbstractProductA = () => ({
  usefulFunctionA: () => "The result of the product A2.",
});

interface AbstractProductB {
  usefulFunctionB(): string;
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

const createConcreteProductB1: () => AbstractProductB = () => ({
  usefulFunctionB: () => "The result of the product B1.",
  anotherUsefulFunctionB: (collaborator: AbstractProductA) => {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with the (${result})`;
  },
});

const createConcreteProductB2: () => AbstractProductB = () => ({
  usefulFunctionB: () => "The result of the product B2.",
  anotherUsefulFunctionB: (collaborator: AbstractProductA) => {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  },
});

function clientCodeFn(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productA.usefulFunctionA());
  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

clientCodeFn(createConcreteFactory1());
