import { useState, useEffect } from 'react';
import { getOrdersBySeller, updateOrderStatus } from '../../api/orders';
import { useAuth } from '../../context/AuthContext';
import type { Order } from '../../types';

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  PENDING:   { label: 'En attente', cls: 'badge-gold' },
  CONFIRMED: { label: 'Confirmée', cls: 'badge-green' },
  ACCEPTED:  { label: 'Acceptée', cls: 'badge-green' },
  REFUSED:   { label: 'Refusée', cls: 'badge-red' },
  DELIVERED: { label: 'Livrée', cls: 'badge-green' },
};

const MySalesPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res = await getOrdersBySeller(user!.userId);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch { setOrders([]); }
    finally { setLoading(false); }
  };

  const handleStatus = async (orderId: number, status: string) => {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch { alert('Erreur lors de la mise à jour'); }
    finally { setUpdating(null); }
  };

  return (
    <div className="page">
      <h1 className="page-title">Mes ventes</h1>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#6b6460', padding: 60 }}>Chargement...</div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <h3>Aucune vente pour l'instant</h3>
          <p>Les commandes pour vos articles apparaîtront ici</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map(order => {
            const st = STATUS_LABELS[order.status] || { label: order.status, cls: 'badge-gray' };
            const isPending = order.status === 'PENDING' || order.status === 'CONFIRMED';
            return (
              <div key={order.id} style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                      Commande #{order.id}
                    </div>
                    <div style={{ fontSize: 13, color: '#6b6460' }}>
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className={`badge ${st.cls}`}>{st.label}</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#c9a84c' }}>
                      {order.totalAmount?.toFixed(0)} MAD
                    </span>
                  </div>
                </div>

                {order.items?.length > 0 && (
                  <div style={{ background: '#0d0d0d', borderRadius: 8, padding: 12, marginBottom: 16 }}>
                    {order.items.map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #1c1c1c' }}>
                        <div style={{ width: 40, height: 40, background: '#141414', borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                          {item.product?.imageUrl
                            ? <img src={item.product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛍️</div>}
                        </div>
                        <div style={{ flex: 1, fontSize: 13, color: '#a89f94' }}>{item.product?.name}</div>
                        <div style={{ fontSize: 13, color: '#6b6460' }}>×{item.quantity}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#f0ece4' }}>{(item.unitPrice * item.quantity).toFixed(0)} MAD</div>
                      </div>
                    ))}
                  </div>
                )}

                {isPending && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      className="btn btn-gold"
                      style={{ padding: '8px 20px', fontSize: 13 }}
                      onClick={() => handleStatus(order.id, 'ACCEPTED')}
                      disabled={updating === order.id}
                    >
                      ✓ Accepter la vente
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '8px 20px', fontSize: 13 }}
                      onClick={() => handleStatus(order.id, 'REFUSED')}
                      disabled={updating === order.id}
                    >
                      ✕ Refuser
                    </button>
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

export default MySalesPage;
