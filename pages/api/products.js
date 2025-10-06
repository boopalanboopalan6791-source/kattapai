import initFirebase from '../../../server/initFirebase';
const admin = initFirebase();
const db = admin.firestore();

export default async function handler(req, res){
  if(req.method === 'GET'){
    const snap = await db.collection('products').get();
    const products = snap.docs.map(d=>({id:d.id, ...d.data()}));
    return res.status(200).json(products);
  }
  if(req.method === 'POST'){
    const { product } = req.body;
    const doc = await db.collection('products').add({
      name: product.name,
      price: Number(product.price),
      img: product.img || '',
      stock: Number(product.stock) || 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    return res.status(200).json({id: doc.id});
  }
  if(req.method === 'DELETE'){
    const { id } = req.query;
    await db.collection('products').doc(id).delete();
    return res.status(200).json({ok:true});
  }
  res.status(405).end();
}
