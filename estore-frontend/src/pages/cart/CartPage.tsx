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

  useEffect(() => { loadCart(); }, []);

  const loadCart = async () => {
    try {
      const res = await getCart(user!.userId);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItem({ cartItemId, quantity });
      loadCart();
    } catch (err) { console.error(err); }
  };

  const handleRemove = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      loadCart();
    } catch (err) { console.error(err); }
  };

  const handleOrder = async () => {
    setOrdering(true);
    try {
      await createOrder(user!.userId);
      setSuccess('Commande passée avec succès !');
      loadCart();
      setTimeout(() => navigate('/orders'), 2000);
    } catch (err) { console.error(err); }
    finally { setOrdering(false); }
  };

  const total = cart?.items?.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) || 0;

  if (loading) return <div style={styles.loading}>Chargement...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Mon Panier</h1>

      {success && <div style={styles.success}>{success}</div>}

      {!cart?.items?.length ? (
        <div style={styles.empty}>
          <p>Votre panier est vide</p>
          <button onClick={() => navigate('/catalog')} style={styles.shopBtn}>
            Voir le catalogue
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          <div style={styles.items}>
            {cart.items.map(item => (
              <div key={item.id} style={styles.item}>
                <div style={styles.itemImg}>
                  {item.product?.imageUrl
                    ? <img src={item.product.imageUrl} alt={item.product.name} style={styles.img} />
                    : <span style={{ fontSize: '40px' }}>🛍️</span>}
                </div>
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.product?.name}</h3>
                  <p style={styles.itemPrice}>{item.unitPrice?.toFixed(2)} MAD</p>
                </div>
                <div style={styles.itemQty}>
                  <button onClick={() => handleUpdate(item.id, item.quantity - 1)} disabled={item.quantity <= 1} style={styles.qtyBtn}>-</button>
                  <span style={styles.qty}>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.id, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                </div>
                <div style={styles.itemTotal}>
                  {(item.unitPrice * item.quantity).toFixed(2)} MAD
                </div>
                <button onClick={() => handleRemove(item.id)} style={styles.removeBtn}>🗑️</button>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Résumé</h2>
            <div style={styles.summaryRow}>
              <span>Articles ({cart.items.length})</span>
              <span>{total.toFixed(2)} MAD</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Livraison</span>
              <span style={{ color: '#28c864' }}>Gratuite</span>
            </div>
            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span>{total.toFixed(2)} MAD</span>
            </div>
            <button onClick={handleOrder} disabled={ordering} style={styles.orderBtn}>
              {ordering ? 'Traitement...' : 'Passer la commande'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f23', color: 'white', padding: '40px' },
  loading: { minHeight: '100vh', backgroundColor: '#0f0f23', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: '32px', marginBottom: '32px' },
  success: { backgroundColor: 'rgba(40,200,100,0.15)', border: '1px solid #28c864', color: '#28c864', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' },
  empty: { textAlign: 'center', padding: '80px', color: '#888' },
  shopBtn: { backgroundColor: '#e94560', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', marginTop: '16px', fontSize: '15px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', maxWidth: '1100px', margin: '0 auto' },
  items: { display: 'flex', flexDirection: 'column', gap: '16px' },
  item: { backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #2a2a4a' },
  itemImg: { width: '80px', height: '80px', backgroundColor: '#0f0f23', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  itemInfo: { flex: 1 },
  itemName: { margin: '0 0 8px', fontSize: '16px' },
  itemPrice: { color: '#888', margin: 0, fontSize: '14px' },
  itemQty: { display: 'flex', alignItems: 'center', gap: '12px' },
  qtyBtn: { backgroundColor: '#0f0f23', border: '1px solid #2a2a4a', color: 'white', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer' },
  qty: { fontSize: '16px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' },
  itemTotal: { fontWeight: 'bold', color: '#e94560', fontSize: '16px', minWidth: '100px', textAlign: 'right' },
  removeBtn: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px' },
  summary: { backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '24px', border: '1px solid #2a2a4a', height: 'fit-content' },
  summaryTitle: { fontSize: '20px', marginBottom: '24px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#aaa', fontSize: '15px' },
  summaryTotal: { display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', borderTop: '1px solid #2a2a4a', paddingTop: '16px', marginTop: '16px', marginBottom: '24px' },
  orderBtn: { width: '100%', backgroundColor: '#e94560', color: 'white', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
};

export default CartPage;