let productsDao: any;
let cartsDao: any;
import * as dotenv from "dotenv";
dotenv.config();

switch (process.env.PERS) {
  case "json":
    const { default: ProductsDaoFile } = await import(
      "./products/ProductsDaoFile.js"
    );
    const { default: CartsDaoFile } = await import("./carts/CartsDaoFile.js");
    productsDao = new ProductsDaoFile();
    cartsDao = new CartsDaoFile();
    break;
  case "mongodb":
    const { default: ProductsDaoMongoDb } = await import(
      "./products/ProductsDaoMongoDb.js"
    );
    const { default: CartsDaoMongoDb } = await import(
      "./carts/CartsDaoMongoDb.js"
    );
    productsDao = new ProductsDaoMongoDb();
    cartsDao = new CartsDaoMongoDb();
    break;
  case "firebase":
    const { default: ProductsDaoFirestore } = await import(
      "./products/ProductsDaoFirestore.js"
    );
    const { default: CartsDaoFirestore } = await import(
      "./carts/CartsDaoFirestore.js"
    );

    productsDao = new ProductsDaoFirestore();
    cartsDao = new CartsDaoFirestore();
    break;
  default:
    const { default: ProductsDaoMemory } = await import(
      "./products/ProductsDaoMemory.js"
    );
    const { default: CartsDaoMemory } = await import(
      "./carts/CartsDaoMemory.js"
    );
    productsDao = new ProductsDaoMemory();
    cartsDao = new CartsDaoMemory();
    break;
}

export { productsDao, cartsDao };
