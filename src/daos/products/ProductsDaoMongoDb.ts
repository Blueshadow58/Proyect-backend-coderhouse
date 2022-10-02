import ContainerMongoDb from "../../containers/ContainerMongoDb.js";

class ProductsDaoMongoDb extends ContainerMongoDb {
  constructor() {
    super("productos", {
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: true },
      foto: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProductsDaoMongoDb;
