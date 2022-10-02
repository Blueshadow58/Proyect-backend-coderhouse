import { promises as fs } from "fs";
import crypto from "crypto";
import config from "../config.js";

class ContainerFileSystem {
  route: string;

  constructor(route: string) {
    this.route = `${config.fileSystem.path}/${route}`;
  }

  // async createId() {
  //   const customId = Date.now().toString();
  //   const hash = crypto.createHash("md5").update(customId).digest("hex");
  //   return hash;
  // }

  async save(obj: any) {
    const objs = await this.getAll();

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }

    const newObj = { id: newId, ...obj };
    objs.push(newObj);

    try {
      await fs.writeFile(this.route, JSON.stringify(objs, null, 2));
      return newObj;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async getById(id: number) {
    const objs = await this.getAll();
    const elem = objs.find((o: { id: number }) => o.id == id);
    return elem;
  }

  async getAll() {
    try {
      const res = await fs.readFile(this.route, "utf-8");
      const obj = await JSON.parse(res);
      return obj;
    } catch (error) {
      return [];
    }
  }

  async update(elem: any) {
    const objs = await this.getAll();
    const index = objs.findIndex((o: { id: number }) => o.id == elem.id);
    if (index == -1) {
      throw new Error(`Error al actualizar: no se encontró el id ${index}`);
    } else {
      objs[index] = elem;
      try {
        await fs.writeFile(this.route, JSON.stringify(objs, null, 2));
      } catch (error) {
        throw new Error(`Error al actualizar: ${error}`);
      }
    }
  }

  async deleteById(id: string) {
    const objs = await this.getAll();
    const index = objs.findIndex((o: { id: string }) => o.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`);
    }

    objs.splice(index, 1);
    try {
      await fs.writeFile(this.route, JSON.stringify(objs, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.route, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }
}

export default ContainerFileSystem;

// import fs from "fs";
// export class Product {
//   id: string;
//   timestamp: string;
//   nombre: string;
//   descripcion: string;
//   codigo: string;
//   foto: string;
//   precio: BigInteger;
//   stock: BigInteger;

//   constructor(
//     nombre: string,
//     descripcion: string,
//     codigo: string,
//     foto: string,
//     precio: BigInteger,
//     stock: BigInteger
//   ) {
//     this.id = Product.createId();
//     this.timestamp = Date().toString();
//     this.nombre = nombre;
//     this.descripcion = descripcion;
//     this.codigo = codigo;
//     this.foto = foto;
//     this.precio = precio;
//     this.stock = stock;
//   }
// }
