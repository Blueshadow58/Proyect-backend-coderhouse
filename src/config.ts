const mongoKey = process.env.Mongo_key;
const firestorePrivateKeyId = process.env.Firebase_private_key_id;
const firebasePrivateKey = process.env.Firebase_private_key;
const firebaseProjectId = process.env.Firebase_proyect_id;
const firebaseClientEmail = process.env.Firebase_client_email;
export default {
  fileSystem: {
    path: "./DB",
  },
  mongodb: {
    cnxStr: `${mongoKey}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {
    type: "service_account",
    project_id: `${firebaseProjectId}`,
    private_key_id: `${firestorePrivateKeyId}`,
    private_key: `${firebasePrivateKey}`,
    client_email: `${firebaseClientEmail}`,
    client_id: "100892174437230252676",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2o4nz%40db-ecommerce-8fca5.iam.gserviceaccount.com",
  },
};
