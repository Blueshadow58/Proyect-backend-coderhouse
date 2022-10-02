import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(JSON.stringify(config.firebase))
  ),
});

const db = admin.firestore();

class ContainerFirestore {
  collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

  constructor(nameCollection: string) {
    this.collection = db.collection(nameCollection);
  }

  async getById(id: string) {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Error get by id: doc not found`);
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (error) {
      throw new Error(`Error get by id: not found ${error}`);
    }
  }

  async getAll() {
    try {
      const res: { id: string }[] = [];
      const snapshot = await this.collection.get();
      snapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() });
      });
      return res;
    } catch (error) {
      throw new Error(`Error get all: ${error}`);
    }
  }

  async save(newElem: any) {
    try {
      const saved = await this.collection.add(newElem);
      return { ...newElem, id: saved.id };
    } catch (error) {
      throw new Error(`Error in save: ${error}`);
    }
  }

  async update(newElem: any) {
    try {
      const updated = await this.collection.doc(newElem.id).set(newElem);
      return updated;
    } catch (error) {
      throw new Error(`Error in update: ${error}`);
    }
  }

  async deleteById(id: string) {
    try {
      const item = await this.collection.doc(id).delete();
      return item;
    } catch (error) {
      throw new Error(`Error in delete by id: ${error}`);
    }
  }

  async deleteAll() {
    const batch = db.batch();
    this.collection.listDocuments().then((val) => {
      val.map((val) => {
        batch.delete(val);
      });
      batch.commit();
    });
  }
}

export default ContainerFirestore;
