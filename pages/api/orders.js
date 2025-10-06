import initFirebase from '../../../server/initFirebase';
const admin = initFirebase();
const db = admin.firestore();
import Razorpay from 'razorpay';

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const { items } = req.body;
  const total = items.reduce((s,i)=>s + (i.price * i.qty), 0);
  const orderRef = await db.collection('orders').add({items, total, status:'created', createdAt: admin.firestore.FieldValue.serverTimestamp()});
  const orderId = orderRef.id;

  // Create Razorpay order in test mode (server needs env keys)
  try{
    const rz = new Razorpay({key_id: process.env.RZ_KEY_ID, key_secret: process.env.RZ_KEY_SECRET});
    const rpOrder = await rz.orders.create({amount: Math.round(total*100), currency:'INR', receipt: orderId, payment_capture:1});
    await orderRef.update({razorpayOrderId: rpOrder.id});
    return res.status(200).json({orderId, razorpayOrderId: rpOrder.id});
  }catch(e){
    // If Razorpay not configured, return order created info without payment
    return res.status(200).json({orderId});
  }
}
