interface Product {
  operation(): string;
}

type CreatorFunction = () => Product;

function someOperation(creator: CreatorFunction): string {
  const product = creator();
  return `Creator: The same creator's code has just worked with ${product.operation()}`;
}

function createProductA(): Product {
  return {
    operation() {
      return "{Result of the ConcreteProductA}";
    },
  };
}

function createProductB(): Product {
  return {
    operation() {
      return "{Result of the ConcreteProductB}";
    },
  };
}

function clientCodeFn(creator: CreatorFunction) {
  console.log(
    "Client: I'm not aware of the creator's class, but it still works."
  );
  console.log(someOperation(creator));
}

console.log("App: Launched with the ConcreteCreatorA.");
clientCodeFn(createProductA);

console.log("App: Launched with the ConcreteCreatorB.");
clientCodeFn(createProductB);
