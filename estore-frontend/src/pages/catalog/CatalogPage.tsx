import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getAllCategories } from '../../api/products';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axios';
import type { Product, Category } from '../../types';

const CatalogPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);
  useEffect(() => { loadProducts(); }, [search, selectedCategory]);

  const loadData = async () => {
    try {
      const [pRes, cRes] = await Promise.all([getAllProducts(), getAllCategories()]);
      setProducts(Array.isArray(pRes.data) ? pRes.data : []);
      setCategories(Array.isArray(cRes.data) ? cRes.data : []);
    } catch { setProducts([]); setCategories([]); }
    finally { setLoading(false); }
  };

  const loadProducts = async () => {
    try {
      if (search && isAuthenticated && user?.userId) {
        axiosInstance.post(`/search-history?userId=${user.userId}&keyword=${search}`).catch(() => {});
      }
      const res = await getAllProducts(search || undefined, selectedCategory || undefined);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch { /* ignore */ }
  };

  const conditionColor = (c?: string) => {
    if (!c) return '#6b6460';
    if (c === 'Neuf') return '#27ae60';
    if (c === 'Très bon état') return '#2980b9';
    return '#a89f94';
  };

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <h1 className="page-title" style={{ margin: 0 }}>Catalogue</h1>
        <span style={{ color: '#6b6460', fontSize: 14 }}>{products.length} article{products.length !== 1 ? 's' : ''}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32 }}>
        {/* Sidebar filters */}
        <div>
          <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 12, padding: 20, position: 'sticky', top: 80 }}>
            <div style={{ marginBottom: 24 }}>
              <input
                className="input"
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div>
              <div className="label" style={{ marginBottom: 12 }}>Catégorie</div>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: 'none', background: selectedCategory === null ? 'rgba(201,168,76,0.12)' : 'transparent', color: selectedCategory === null ? '#c9a84c' : '#a89f94', fontSize: 13, fontWeight: selectedCategory === null ? 600 : 400, cursor: 'pointer', marginBottom: 4, transition: 'all 0.15s' }}
              >
                Tous les articles
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: 'none', background: selectedCategory === cat.id ? 'rgba(201,168,76,0.12)' : 'transparent', color: selectedCategory === cat.id ? '#c9a84c' : '#a89f94', fontSize: 13, fontWeight: selectedCategory === cat.id ? 600 : 400, cursor: 'pointer', marginBottom: 4, transition: 'all 0.15s' }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: '#6b6460' }}>Chargement...</div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h3>Aucun article trouvé</h3>
            <p>Essayez d'autres mots-clés ou catégories</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {products.map(p => (
              <Link to={`/products/${p.id}`} key={p.id} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div style={{ height: 190, background: '#0d0d0d', overflow: 'hidden', position: 'relative' }}>
                    {p.imageUrl
                      ? <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                      : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🛍️</div>}
                    {p.condition && (
                      <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(13,13,13,0.85)', color: conditionColor(p.condition), padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                        {p.condition}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700, marginBottom: 6 }}>
                      {p.category?.name}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#f0ece4', marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
                    {p.location && <div style={{ fontSize: 12, color: '#6b6460', marginBottom: 10 }}>📍 {p.location}</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#c9a84c', fontFamily: "'Playfair Display', serif" }}>
                        {p.price?.toFixed(0)} MAD
                      </span>
                      <span style={{ fontSize: 11, color: (p.inventory?.quantity ?? 0) > 0 ? '#27ae60' : '#c0392b' }}>
                        {(p.inventory?.quantity ?? 0) > 0 ? '● En stock' : '● Rupture'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
