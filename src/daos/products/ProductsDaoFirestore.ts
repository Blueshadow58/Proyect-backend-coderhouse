import ContainerFirestore from "../../containers/ContainerFirestore.js";

class ProductsDaoFirestore extends ContainerFirestore {
  constructor() {
    super("productos");
  }
}

export default ProductsDaoFirestore;
