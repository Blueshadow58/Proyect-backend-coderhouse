import ContainerMongoDb from "../../containers/ContainerMongoDb.js";

class CartsDaoMongoDb extends ContainerMongoDb {
  constructor() {
    super("carritos", {
      productos: { type: [], required: true },
    });
  }
  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }
}

export default CartsDaoMongoDb;
