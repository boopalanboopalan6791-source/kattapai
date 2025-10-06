import initFirebase from '../../../server/initFirebase';
const admin = initFirebase();
const db = admin.firestore();

export default async function handler(req,res){
  if(req.method==='GET'){
    const doc = await db.collection('meta').doc('site').get();
    const area = doc.exists ? doc.data().area : '';
    return res.status(200).json({area});
  }
  if(req.method==='POST'){
    const { area } = req.body;
    await db.collection('meta').doc('site').set({area},{merge:true});
    return res.status(200).json({ok:true});
  }
  res.status(405).end();
}
