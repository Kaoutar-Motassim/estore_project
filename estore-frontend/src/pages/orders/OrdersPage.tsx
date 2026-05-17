import { useState, useEffect } from 'react';
import { getOrdersByUser } from '../../api/orders';
import { useAuth } from '../../context/AuthContext';
import type { Order } from '../../types';

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  PENDING:   { label: 'En attente', cls: 'badge-gold' },
  CONFIRMED: { label: 'Confirmée', cls: 'badge-green' },
  ACCEPTED:  { label: 'Acceptée', cls: 'badge-green' },
  REFUSED:   { label: 'Refusée', cls: 'badge-red' },
  DELIVERED: { label: 'Livrée', cls: 'badge-green' },
};

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersByUser(user!.userId).then(r => setOrders(Array.isArray(r.data) ? r.data : [])).catch(() => setOrders([])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Mes achats</h1>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#6b6460', padding: 60 }}>Chargement...</div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <h3>Aucune commande</h3>
          <p>Vous n'avez pas encore passé de commande</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map(order => {
            const st = STATUS_LABELS[order.status] || { label: order.status, cls: 'badge-gray' };
            return (
              <div key={order.id} style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Commande #{order.id}</div>
                    <div style={{ fontSize: 13, color: '#6b6460' }}>
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span className={`badge ${st.cls}`}>{st.label}</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#c9a84c' }}>
                      {order.totalAmount?.toFixed(0)} MAD
                    </span>
                  </div>
                </div>
                {order.items?.length > 0 && (
                  <div style={{ background: '#0d0d0d', borderRadius: 8, padding: 12 }}>
                    {order.items.map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #1c1c1c' }}>
                        <div style={{ width: 44, height: 44, background: '#141414', borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                          {item.product?.imageUrl
                            ? <img src={item.product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛍️</div>}
                        </div>
                        <div style={{ flex: 1, fontSize: 14, color: '#a89f94' }}>{item.product?.name}</div>
                        <div style={{ fontSize: 13, color: '#6b6460' }}>×{item.quantity}</div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{(item.unitPrice * item.quantity).toFixed(0)} MAD</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
