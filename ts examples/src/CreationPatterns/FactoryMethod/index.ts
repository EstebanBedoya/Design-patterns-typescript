namespace FactoryMethodClass {
  interface Product {
    operation(): string;
  }

  abstract class Creator {
    public abstract createProduct(): Product;

    public someOperation(): string {
      const product = this.createProduct();
      return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
  }

  class ConcreteCreatorA extends Creator {
    public createProduct(): Product {
      return new ConcreteProductA();
    }
  }

  class ConcreteCreatorB extends Creator {
    public createProduct(): Product {
      return new ConcreteProductB();
    }
  }

  class ConcreteProductA implements Product {
    public operation(): string {
      return "{Result of the ConcreteProductA}";
    }
  }

  class ConcreteProductB implements Product {
    public operation(): string {
      return "{Result of the ConcreteProductB}";
    }
  }

  function clientCode(creator: Creator) {
    console.log(
      "Client: I'm not aware of the creator's class, but it still works."
    );
    console.log(creator.someOperation());
  }

  console.log("App: Launched with the ConcreteCreatorA.");
  clientCode(new ConcreteCreatorA());

  console.log("App: Launched with the ConcreteCreatorB.");
  clientCode(new ConcreteCreatorB());
}
