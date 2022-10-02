import mongoose from "mongoose";
import config from "../config.js";
import { asPOJO, removeField, renameField } from "../utils/objectUtils.js";

const url = config.mongodb.cnxStr;
const connectionParams = config.mongodb.options;

await mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the Mongo database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

class ContainerMongoDb {
  collection: mongoose.Model<any>;
  constructor(nameCollection: string, scheme: any) {
    this.collection = mongoose.model(nameCollection, scheme);
  }

  async getById(id: string) {
    try {
      const docs = await this.collection.find({ _id: id }, { __v: 0 });
      if (docs.length == 0) {
        throw new Error("Error when getting by id: not found");
      } else {
        const result = renameField(asPOJO(docs[0]), "_id", "id");
        return result;
      }
    } catch (error) {
      throw new Error(`Error when getting by id: ${error}`);
    }
  }

  async getAll() {
    try {
      let docs = await this.collection.find({}, { __v: 0 }).lean();
      docs = docs.map(asPOJO);
      docs = docs.map((d) => renameField(d, "_id", "id"));
      return docs;
    } catch (error) {
      throw new Error(`Error when getting all: ${error}`);
    }
  }

  async save(newElem: any) {
    try {
      let doc = await this.collection.create(newElem);
      doc = asPOJO(doc);
      renameField(doc, "_id", "id");
      removeField(doc, "__v");
      return doc;
    } catch (error) {
      throw new Error(`Error in save: ${error}`);
    }
  }

  async update(newElem: any) {
    try {
      renameField(newElem, "id", "_id");
      const { n, nModified } = await (<any>(
        this.collection.replaceOne({ _id: newElem._id }, newElem)
      ));
      if (n == 0 || nModified == 0) {
        throw new Error("Error in update: not found");
      } else {
        renameField(newElem, "_id", "id");
        removeField(newElem, "__v");
        return asPOJO(newElem);
      }
    } catch (error) {
      throw new Error(`Error in update: ${error}`);
    }
  }

  async deleteById(id: string) {
    try {
      const { n, nDeleted } = await (<any>(
        this.collection.deleteOne({ _id: id })
      ));
      if (n == 0 || nDeleted == 0) {
        throw new Error("Error in delete: not found");
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
    } catch (error) {
      throw new Error(`Error in delete All: ${error}`);
    }
  }
}

export default ContainerMongoDb;
