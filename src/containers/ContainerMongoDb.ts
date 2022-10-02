import mongoose from "mongoose";
import config from "../config.js";

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

  async save(newElem: any) {
    try {
      let doc = await this.collection.create(newElem);
      //   doc = asPOJO(doc);
      //   renameField(doc, "_id", "id");
      //   removeField(doc, "__v");
      return doc;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
}

export default ContainerMongoDb;
