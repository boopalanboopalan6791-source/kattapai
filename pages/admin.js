import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin(){
  const [products,setProducts]=useState([]);
  const [area,setArea]=useState('');
  const [form,setForm]=useState({name:'',price:'',img:'',stock:''});

  useEffect(()=>{ fetchData(); },[]);

  async function fetchData(){
    const res = await axios.get('/api/products');
    setProducts(res.data);
    const a = await axios.get('/api/area');
    setArea(a.data.area || '');
  }

  async function saveArea(){ await axios.post('/api/area', {area}); alert('Saved'); }
  async function saveProd(){
    await axios.post('/api/products', {product: form});
    setForm({name:'',price:'',img:'',stock:''}); fetchData(); alert('Saved');
  }
  async function del(id){ if(!confirm('Delete?')) return; await axios.delete('/api/products?id='+id); fetchData(); }

  return (
    <div className="container">
      <h1>Admin — Katta Pai</h1>
      <section style={{display:'flex',gap:20}}>
        <div style={{flex:1}}>
          <h3>Products</h3>
          {products.map(p=>(
            <div key={p.id} style={{borderBottom:'1px solid #eee',padding:8,display:'flex',justifyContent:'space-between'}}>
              <div><strong>{p.name}</strong><div>₹{p.price} • stock {p.stock}</div></div>
              <div><button onClick={()=>del(p.id)} style={{background:'#ef4444'}}>Delete</button></div>
            </div>
          ))}
          <h3>Add Product</h3>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input placeholder="Image URL" value={form.img} onChange={e=>setForm({...form,img:e.target.value})} />
          <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
          <input placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} />
          <div><button onClick={saveProd}>Save</button></div>
        </div>
        <aside style={{width:320}}>
          <h3>Settings</h3>
          <div>Delivery area</div>
          <input value={area} onChange={e=>setArea(e.target.value)} />
          <div><button onClick={saveArea}>Save Area</button></div>
          <h3 style={{marginTop:20}}>Orders (demo)</h3>
          <div id="orders"></div>
        </aside>
      </section>
      <style jsx>{`
        input{display:block;margin:8px 0;padding:8px;width:100%}
        button{background:#1f8a3d;color:#fff;padding:8px 12px;border-radius:6px;border:0}
      `}</style>
    </div>
  )
}
