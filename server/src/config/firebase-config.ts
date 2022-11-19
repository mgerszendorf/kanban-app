import admin from "firebase-admin";
import firebaseAccountCredentials from "./serviceAccount.json";

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
