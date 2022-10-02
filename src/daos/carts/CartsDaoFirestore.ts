import ContainerFirestore from "../../containers/ContainerFirestore.js";

class CartsDaoFirestore extends ContainerFirestore {
  constructor() {
    super("carritos");
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }
}

export default CartsDaoFirestore;
