import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/products';
import { addToCart } from '../../api/cart';
import { useAuth } from '../../context/AuthContext';
import type { Product } from '../../types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getProductById(Number(id)).then(r => setProduct(r.data)).catch(() => navigate('/catalog')).finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setAdding(true);
    try {
      await addToCart({ userId: user!.userId, productId: product!.id, quantity: qty });
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch { /* ignore */ }
    finally { setAdding(false); }
  };

  if (loading) return <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b6460' }}>Chargement...</div>;
  if (!product) return null;

  const inStock = (product.inventory?.quantity ?? 0) > 0;

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: '#6b6460', fontSize: 13, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>← Retour</button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 1000 }}>
        <div style={{ background: '#141414', borderRadius: 16, overflow: 'hidden', border: '1px solid #1c1c1c', height: 420 }}>
          {product.imageUrl
            ? <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>🛍️</div>}
        </div>

        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span className="tag">{product.category?.name}</span>
            {product.condition && <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', background: 'rgba(41,128,185,0.1)', color: '#3498db' }}>{product.condition}</span>}
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.5px' }}>{product.name}</h1>

          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: '#c9a84c', marginBottom: 20 }}>
            {product.price?.toFixed(0)} <span style={{ fontSize: 20, color: '#a89f94' }}>MAD</span>
          </div>

          <p style={{ fontSize: 14, color: '#a89f94', lineHeight: 1.7, marginBottom: 20 }}>{product.description}</p>

          {product.location && (
            <div style={{ fontSize: 13, color: '#6b6460', marginBottom: 20 }}>📍 {product.location}</div>
          )}

          {product.seller && (
            <div style={{ background: '#0d0d0d', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#a89f94' }}>
              Vendu par <strong style={{ color: '#f0ece4' }}>{product.seller.firstName} {product.seller.lastName}</strong>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#141414', border: '1px solid #2a2a2a', borderRadius: 8, padding: '4px 4px' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 32, height: 32, borderRadius: 6, border: 'none', background: 'transparent', color: '#f0ece4', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: 32, height: 32, borderRadius: 6, border: 'none', background: 'transparent', color: '#f0ece4', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
            <span style={{ fontSize: 12, color: inStock ? '#27ae60' : '#c0392b' }}>● {inStock ? `${product.inventory?.quantity} en stock` : 'Rupture de stock'}</span>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              className="btn btn-gold"
              style={{ flex: 1, padding: '14px', fontSize: 15 }}
              onClick={handleAddToCart}
              disabled={adding || !inStock}
            >
              {added ? '✓ Ajouté au panier !' : adding ? 'Ajout...' : 'Ajouter au panier'}
            </button>
            <button className="btn btn-ghost" style={{ padding: '14px 20px' }} onClick={() => navigate('/cart')}>🛒</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
