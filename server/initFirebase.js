import admin from 'firebase-admin';

let cached = global._firebaseAdmin;

export default function initFirebase(){
  if(cached) return cached;
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}');
  if(!admin.apps.length){
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  }
  cached = admin;
  global._firebaseAdmin = cached;
  return cached;
}
