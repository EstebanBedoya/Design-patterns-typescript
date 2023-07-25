interface Product1 {
  parts: string[];
  listParts(): void;
}

interface Builder {
  buildPartA(): void;
  buildPartB(): void;
  buildPartC(): void;
  getProduct(): Product1;
}

const createProduct1 = (parts: string[]): Product1 => ({
  parts,
  listParts() {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  },
});

const createConcreteBuilder1 = (): Builder => {
  let parts: string[] = [];

  return {
    buildPartA: () => {
      parts.push("PartA1");
    },
    buildPartB: () => {
      parts.push("PartB1");
    },
    buildPartC: () => {
      parts.push("PartC1");
    },
    getProduct: () => {
      const result = createProduct1(parts);
      parts = [];
      return result;
    },
  };
};

const createDirector = () => {
  let builder: Builder;

  return {
    setBuilder: (newBuilder: Builder) => {
      builder = newBuilder;
    },
    buildMinimalViableProduct: () => {
      builder.buildPartA();
    },
    buildFullFeaturedProduct: () => {
      builder.buildPartA();
      builder.buildPartB();
      builder.buildPartC();
    },
  };
};

function clientCodeFn(director: ReturnType<typeof createDirector>) {
  const builder = createConcreteBuilder1();
  director.setBuilder(builder);

  console.log("Standard basic product:");
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log("Standard full featured product:");
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  console.log("Custom product:");
  builder.buildPartA();
  builder.buildPartC();
  builder.getProduct().listParts();
}

const directorFn = createDirector();
clientCodeFn(directorFn);
