import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductsBySeller, deleteProduct } from '../../api/products';
import { useAuth } from '../../context/AuthContext';
import type { Product } from '../../types';

const MyListingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res = await getProductsBySeller(user!.userId);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette annonce ?')) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch { alert('Erreur lors de la suppression'); }
  };

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 className="page-title" style={{ margin: 0 }}>Mes annonces</h1>
        <button className="btn btn-gold" onClick={() => navigate('/create-listing')}>+ Nouvelle annonce</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#6b6460', padding: 60 }}>Chargement...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>Aucune annonce</h3>
          <p>Vous n'avez pas encore publié d'articles</p>
          <button className="btn btn-gold" onClick={() => navigate('/create-listing')}>Créer ma première annonce</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {products.map(p => (
            <div key={p.id} className="card">
              <div style={{ height: 160, background: '#0d0d0d', overflow: 'hidden' }}>
                {p.imageUrl
                  ? <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🛍️</div>}
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 11, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700, marginBottom: 6 }}>{p.category?.name}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#c9a84c', fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>{p.price?.toFixed(0)} MAD</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: 12, color: (p.inventory?.quantity ?? 0) > 0 ? '#27ae60' : '#c0392b', flex: 1 }}>
                    {p.inventory?.quantity ?? 0} en stock
                  </span>
                  <button onClick={() => handleDelete(p.id)} style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)', color: '#e74c3c', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;
