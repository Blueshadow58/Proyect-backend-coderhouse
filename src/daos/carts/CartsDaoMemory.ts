import ContainerMemory from "../../containers/ContainerMemory.js";

class CartsDaoMemory extends ContainerMemory {
  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }
}

export default CartsDaoMemory;
