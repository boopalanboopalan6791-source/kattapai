import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=>{ fetchProducts(); const c = JSON.parse(localStorage.getItem('kp_cart')||'[]'); setCart(c); },[]);

  async function fetchProducts(){ const res = await axios.get('/api/products'); setProducts(res.data); }
  function addToCart(p){
    const c = JSON.parse(localStorage.getItem('kp_cart')||'[]');
    const item = c.find(i=>i.id===p.id);
    if(item) item.qty += 1; else c.push({id:p.id, name:p.name, price:p.price, qty:1});
    localStorage.setItem('kp_cart', JSON.stringify(c)); setCart(c);
    alert('Added to cart');
  }

  async function placeOrder(){
    if(cart.length===0){ alert('Cart empty'); return; }
    const res = await axios.post('/api/orders', {items: cart});
    if(res.data && res.data.razorpayOrderId){
      // Redirect to mock payment page with order id (server will return orderId)
      const orderId = res.data.orderId;
      alert('Order created (demo). Admin panel shows orders. Order ID: ' + orderId);
      localStorage.removeItem('kp_cart'); setCart([]);
    } else {
      alert('Order placed (demo).');
      localStorage.removeItem('kp_cart'); setCart([]);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src="/assets/logo.png" alt="Katta Pai" className="logo"/>
        <div>
          <h1>Katta Pai</h1>
          <div className="tag">LOCAL DELIVERY</div>
        </div>
      </header>

      <main>
        <h2>Products</h2>
        <div className="grid">
          {products.map(p=>(
            <div className="card" key={p.id}>
              <img src={p.img||'/assets/placeholder.png'} alt={p.name} />
              <h3>{p.name}</h3>
              <div className="price">₹{p.price}</div>
              <button onClick={()=>addToCart(p)}>Add</button>
            </div>
          ))}
        </div>

        <aside className="cart">
          <h3>Cart</h3>
          {cart.length===0 && <div>No items</div>}
          {cart.map(it=>(<div key={it.id}>{it.name} × {it.qty} — ₹{(it.price*it.qty).toFixed(2)}</div>))}
          <div style={{marginTop:12}}><button onClick={placeOrder}>Place Order (Demo - Razorpay sandbox handled server-side)</button></div>
        </aside>
      </main>

      <footer>© Katta Pai</footer>
      <style jsx>{`
        .container{max-width:900px;margin:20px auto;padding:0 16px}
        .header{display:flex;gap:12px;align-items:center}
        .logo{height:64px}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
        .card{border:1px solid #eee;padding:12px;border-radius:8px}
        .card img{height:140px;width:100%;object-fit:cover;border-radius:6px}
        .price{font-weight:700;color:#1f8a3d}
        .cart{position:fixed;right:20px;top:120px;width:260px;padding:12px;border:1px solid #eee;border-radius:8px;background:#fff}
        @media(max-width:800px){ .cart{position:static;width:auto;margin-top:20px} }
      `}</style>
    </div>
  )
}
