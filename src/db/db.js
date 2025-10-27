const admin = require("firebase-admin");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });

  const db = admin.firestore(); // or admin.database() for Realtime DB
  console.log(colors.yellow.bold("Firebase connected successfully"));

  module.exports = db;
} catch (err) {
  console.error(colors.red.bold("Firebase connection error:"), err);
}
