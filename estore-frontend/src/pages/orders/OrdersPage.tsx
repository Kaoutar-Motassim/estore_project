import { useState, useEffect } from 'react';
import { getOrdersByUser } from '../../api/orders';
import { useAuth } from '../../context/AuthContext';
import type { Order } from '../../types';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getOrdersByUser(user!.userId);
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return '#28c864';
      case 'PENDING': return '#f59e0b';
      case 'CANCELLED': return '#e94560';
      default: return '#888';
    }
  };

  if (loading) return <div style={styles.loading}>Chargement...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📦 Mes Commandes</h1>

      {orders.length === 0 ? (
        <div style={styles.empty}>Aucune commande pour le moment.</div>
      ) : (
        orders.map(order => (
          <div key={order.id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              <div>
                <span style={styles.orderId}>Commande #{order.id}</span>
                <span style={styles.orderDate}>
                  {new Date(order.orderDate).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div style={styles.right}>
                <span style={{ ...styles.status, color: getStatusColor(order.status) }}>
                  ● {order.status}
                </span>
                <span style={styles.total}>{order.totalAmount?.toFixed(2)} MAD</span>
              </div>
            </div>

            <div style={styles.orderItems}>
              {order.items?.map((item, i) => (
                <div key={i} style={styles.orderItem}>
                  <span style={styles.itemName}>{item.product?.name}</span>
                  <span style={styles.itemQty}>x{item.quantity}</span>
                  <span style={styles.itemPrice}>{(item.unitPrice * item.quantity).toFixed(2)} MAD</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f23', color: 'white', padding: '40px' },
  loading: { minHeight: '100vh', backgroundColor: '#0f0f23', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: '32px', marginBottom: '32px' },
  empty: { textAlign: 'center', color: '#888', padding: '80px', fontSize: '18px' },
  orderCard: { backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '24px', marginBottom: '20px', border: '1px solid #2a2a4a', maxWidth: '900px', margin: '0 auto 20px' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #2a2a4a' },
  orderId: { fontWeight: 'bold', fontSize: '18px', marginRight: '16px' },
  orderDate: { color: '#888', fontSize: '14px' },
  right: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' },
  status: { fontSize: '14px', fontWeight: 'bold' },
  total: { fontSize: '20px', fontWeight: 'bold', color: '#e94560' },
  orderItems: { display: 'flex', flexDirection: 'column', gap: '12px' },
  orderItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#0f0f23', borderRadius: '8px' },
  itemName: { flex: 1, fontSize: '15px' },
  itemQty: { color: '#888', fontSize: '14px', margin: '0 16px' },
  itemPrice: { fontWeight: 'bold', color: '#e94560' },
};

export default OrdersPage;