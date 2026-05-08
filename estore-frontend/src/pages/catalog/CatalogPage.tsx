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
      const [productsRes, categoriesRes] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ]);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      console.log('user:', user, 'search:', search, 'isAuth:', isAuthenticated);
      if (search && isAuthenticated && user?.userId) {
        axiosInstance.post(`/search-history?userId=${user.userId}&keyword=${search}`)
          .catch(err => console.error('search history error:', err));
      }
      const res = await getAllProducts(search || undefined, selectedCategory || undefined);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Notre Catalogue</h1>
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="🔍 Rechercher un produit..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.categories}>
        <button onClick={() => setSelectedCategory(null)} style={{ ...styles.catBtn, ...(selectedCategory === null ? styles.catBtnActive : {}) }}>Tous</button>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ ...styles.catBtn, ...(selectedCategory === cat.id ? styles.catBtnActive : {}) }}>
            {cat.name}
          </button>
        ))}
      </div>
      {loading ? (
        <div style={styles.loading}>Chargement...</div>
      ) : products.length === 0 ? (
        <div style={styles.empty}>Aucun produit trouvé</div>
      ) : (
        <div style={styles.grid}>
          {products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} style={styles.cardLink}>
              <div style={styles.card}>
                <div style={styles.imageContainer}>
                  {product.imageUrl
                    ? <img src={product.imageUrl} alt={product.name} style={styles.image} />
                    : <div style={styles.imagePlaceholder}>🛍️</div>}
                </div>
                <div style={styles.cardBody}>
                  <span style={styles.category}>{product.category?.name}</span>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.description}>{product.description?.substring(0, 80)}...</p>
                  <div style={styles.footer}>
                    <span style={styles.price}>{product.price?.toFixed(2)} MAD</span>
                    <span style={styles.stock}>{(product.inventory?.quantity ?? 0) > 0 ? '✅ En stock' : '❌ Rupture'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f23', padding: '40px', color: 'white' },
  title: { fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center' },
  searchBar: { maxWidth: '600px', margin: '0 auto 32px' },
  searchInput: { width: '100%', padding: '14px 20px', backgroundColor: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '10px', color: 'white', fontSize: '16px', outline: 'none', boxSizing: 'border-box' },
  categories: { display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' },
  catBtn: { padding: '8px 20px', backgroundColor: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '20px', color: '#ccc', cursor: 'pointer', fontSize: '14px' },
  catBtnActive: { backgroundColor: '#e94560', borderColor: '#e94560', color: 'white' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' },
  cardLink: { textDecoration: 'none' },
  card: { backgroundColor: '#1a1a2e', borderRadius: '12px', border: '1px solid #2a2a4a', overflow: 'hidden', cursor: 'pointer' },
  imageContainer: { height: '200px', backgroundColor: '#0f0f23', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  imagePlaceholder: { fontSize: '60px' },
  cardBody: { padding: '16px' },
  category: { fontSize: '12px', color: '#e94560', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' },
  productName: { fontSize: '16px', fontWeight: 'bold', color: 'white', margin: '8px 0' },
  description: { fontSize: '13px', color: '#888', lineHeight: 1.5, marginBottom: '12px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: '18px', fontWeight: 'bold', color: '#e94560' },
  stock: { fontSize: '12px', color: '#888' },
  loading: { textAlign: 'center', color: '#888', fontSize: '18px', marginTop: '80px' },
  empty: { textAlign: 'center', color: '#888', fontSize: '18px', marginTop: '80px' },
};

export default CatalogPage;