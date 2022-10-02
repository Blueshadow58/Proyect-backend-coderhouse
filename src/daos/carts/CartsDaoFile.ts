import ContainerFileSystem from "../../containers/ContainerFileSystem.js";

class CarstDaoFile extends ContainerFileSystem {
  constructor() {
    super("carritos.json");
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }
}

export default CarstDaoFile;
