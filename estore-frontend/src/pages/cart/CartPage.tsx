import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeCartItem } from '../../api/cart';
import { createOrder } from '../../api/orders';
import { useAuth } from '../../context/AuthContext';
import type { Cart } from '../../types';

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState('');
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => { loadCart(); }, []);

  const loadCart = async () => {
    try {
      const res = await getCart(user!.userId);
      setCart(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleUpdate = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    try { await updateCartItem({ cartItemId, quantity }); loadCart(); }
    catch (err) { console.error(err); }
  };

  const handleRemove = async (cartItemId: number) => {
    setRemovingId(cartItemId);
    try {
      await removeCartItem(cartItemId);
      // Optimistic update
      setCart(prev => prev ? { ...prev, items: prev.items.filter(i => i.id !== cartItemId) } : null);
    } catch (err) { console.error(err); loadCart(); }
    finally { setRemovingId(null); }
  };

  const handleOrder = async () => {
    setOrdering(true);
    try {
      await createOrder(user!.userId);
      setSuccess('Commande passée ! Redirection...');
      setTimeout(() => navigate('/orders'), 2000);
    } catch (err) { console.error(err); }
    finally { setOrdering(false); }
  };

  const total = cart?.items?.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) || 0;

  if (loading) return <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b6460' }}>Chargement...</div>;

  return (
    <div className="page">
      <h1 className="page-title">Mon Panier</h1>

      {success && (
        <div style={{ background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.3)', color: '#2ecc71', padding: '16px 20px', borderRadius: 10, marginBottom: 24, textAlign: 'center', fontWeight: 600 }}>
          ✓ {success}
        </div>
      )}

      {!cart?.items?.length ? (
        <div className="empty-state">
          <h3>Votre panier est vide</h3>
          <p>Explorez le catalogue pour trouver des articles</p>
          <button className="btn btn-gold" onClick={() => navigate('/catalog')}>Voir le catalogue</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cart.items.map(item => (
              <div key={item.id} style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 20, opacity: removingId === item.id ? 0.4 : 1, transition: 'opacity 0.2s' }}>
                <div style={{ width: 80, height: 80, background: '#0d0d0d', borderRadius: 8, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.product?.imageUrl
                    ? <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: 32 }}>🛍️</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#f0ece4', marginBottom: 4 }}>{item.product?.name}</div>
                  <div style={{ fontSize: 13, color: '#6b6460' }}>{item.unitPrice?.toFixed(0)} MAD / unité</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => handleUpdate(item.id, item.quantity - 1)} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid #2a2a2a', background: 'transparent', color: '#f0ece4', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>−</button>
                  <span style={{ fontSize: 15, fontWeight: 700, minWidth: 20, textAlign: 'center', color: '#f0ece4' }}>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.id, item.quantity + 1)} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid #2a2a2a', background: 'transparent', color: '#f0ece4', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>+</button>
                </div>
                <div style={{ minWidth: 90, textAlign: 'right', fontWeight: 700, fontSize: 16, color: '#c9a84c', fontFamily: "'Playfair Display', serif" }}>
                  {(item.unitPrice * item.quantity).toFixed(0)} MAD
                </div>
                <button onClick={() => handleRemove(item.id)} disabled={removingId === item.id} style={{ background: 'transparent', border: 'none', color: '#6b6460', fontSize: 18, cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 12, padding: 24, height: 'fit-content', position: 'sticky', top: 80 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Résumé</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#a89f94', marginBottom: 12 }}>
              <span>{cart.items.length} article{cart.items.length > 1 ? 's' : ''}</span>
              <span>{total.toFixed(0)} MAD</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#a89f94', marginBottom: 20 }}>
              <span>Livraison</span>
              <span style={{ color: '#27ae60', fontWeight: 600 }}>Gratuite</span>
            </div>
            <div style={{ height: 1, background: '#1c1c1c', marginBottom: 20 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
              <span>Total</span>
              <span style={{ color: '#c9a84c' }}>{total.toFixed(0)} MAD</span>
            </div>
            <button className="btn btn-gold" style={{ width: '100%', padding: '14px', fontSize: 15 }} onClick={handleOrder} disabled={ordering}>
              {ordering ? 'Traitement...' : 'Passer la commande'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
