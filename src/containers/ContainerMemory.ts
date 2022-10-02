class ContainerMemory {
  elements: any;

  constructor() {
    this.elements = [];
  }

  getById(id: number) {
    const elem = this.elements.find((elem: { id: number }) => elem.id == id);
    if (!elem) {
      throw new Error(`Error al listar: elemento no encontrado`);
    } else {
      return elem;
    }
  }

  getAll() {
    return [...this.elements];
  }

  save(elem: any) {
    let newId;
    if (this.elements.length == 0) {
      newId = 1;
    } else {
      newId = this.elements[this.elements.length - 1].id + 1;
    }

    const newElem = { ...elem, id: newId };
    this.elements.push(newElem);
    return newElem;
  }

  update(elem: { id: any }) {
    const index = this.elements.findIndex(
      (p: { id: number }) => p.id == elem.id
    );
    if (index == -1) {
      throw new Error(`Error al actualizar: elemento no encontrado`);
    } else {
      this.elements[index] = elem;
      return elem;
    }
  }

  deleteById(id: number) {
    const index = this.elements.findIndex(
      (elem: { id: number }) => elem.id == id
    );
    if (index == -1) {
      throw new Error(`Error al borrar: elemento no encontrado`);
    } else {
      return this.elements.splice(index, 1);
    }
  }

  deleteAll() {
    this.elements = [];
  }
}

export default ContainerMemory;
