import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/products';
import { addToCart } from '../../api/cart';
import { getReviewsByProduct, createReview } from '../../api/reviews.ts';
import { useAuth } from '../../context/AuthContext';
import type { Product, Review } from '../../types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await getProductById(Number(id));
      setProduct(res.data);
      const reviewsRes = await getReviewsByProduct(Number(id));
      setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setAddingToCart(true);
    try {
      await addToCart({ userId: user!.userId, productId: Number(id), quantity });
      setSuccess('Produit ajouté au panier !');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { navigate('/login'); return; }
    setSubmittingReview(true);
    try {
      await createReview({
        productId: Number(id),
        userId: user!.userId,
        authorName: `${user!.firstName} ${user!.lastName}`,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setReviewForm({ rating: 5, comment: '' });
      loadProduct();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div style={styles.loading}>Chargement...</div>;
  if (!product) return <div style={styles.loading}>Produit introuvable</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/catalog')} style={styles.back}>
        ← Retour au catalogue
      </button>

      <div style={styles.productGrid}>
        {/* Image */}
        <div style={styles.imageBox}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} style={styles.image} />
          ) : (
            <div style={styles.imagePlaceholder}>🛍️</div>
          )}
        </div>

        {/* Infos */}
        <div style={styles.infoBox}>
          <span style={styles.category}>{product.category?.name}</span>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.description}>{product.description}</p>
          <div style={styles.price}>{product.price?.toFixed(2)} MAD</div>

          <div style={styles.stockBadge}>
            {(product.inventory?.quantity ?? 0) > 0
              ? `✅ En stock (${product.inventory?.quantity ?? 0} disponibles)`
              : '❌ Rupture de stock'}
          </div>

          {success && <div style={styles.successMsg}>{success}</div>}

          <div style={styles.quantityRow}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={styles.qtyBtn}>-</button>
            <span style={styles.qty}>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} style={styles.qtyBtn}>+</button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addingToCart || product.inventory?.quantity === 0}
            style={styles.addBtn}
          >
            {addingToCart ? 'Ajout...' : '🛒 Ajouter au panier'}
          </button>
        </div>
      </div>

      {/* Avis */}
      <div style={styles.reviewsSection}>
        <h2 style={styles.reviewsTitle}>Avis clients ({reviews.length})</h2>

        {reviews.length === 0 ? (
          <p style={styles.noReviews}>Aucun avis pour le moment.</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <span style={styles.reviewAuthor}>{r.authorName}</span>
                <span style={styles.reviewRating}>{'⭐'.repeat(r.rating)}</span>
              </div>
              <p style={styles.reviewComment}>{r.comment}</p>
            </div>
          ))
        )}

        {isAuthenticated && (
          <div style={styles.reviewForm}>
            <h3 style={styles.reviewFormTitle}>Laisser un avis</h3>
            <form onSubmit={handleSubmitReview}>
              <div style={styles.field}>
                <label style={styles.label}>Note</label>
                <select
                  value={reviewForm.rating}
                  onChange={e => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                  style={styles.select}
                >
                  {[5, 4, 3, 2, 1].map(n => (
                    <option key={n} value={n}>{'⭐'.repeat(n)} ({n}/5)</option>
                  ))}
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Commentaire</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Votre avis..."
                  required
                  style={styles.textarea}
                />
              </div>
              <button type="submit" disabled={submittingReview} style={styles.submitBtn}>
                {submittingReview ? 'Envoi...' : 'Envoyer mon avis'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f23', color: 'white', padding: '40px' },
  loading: { minHeight: '100vh', backgroundColor: '#0f0f23', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  back: { backgroundColor: 'transparent', border: '1px solid #2a2a4a', color: '#ccc', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', marginBottom: '32px', fontSize: '14px' },
  productGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', maxWidth: '1100px', margin: '0 auto 60px' },
  imageBox: { backgroundColor: '#1a1a2e', borderRadius: '16px', overflow: 'hidden', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  imagePlaceholder: { fontSize: '80px' },
  infoBox: { display: 'flex', flexDirection: 'column', gap: '16px' },
  category: { color: '#e94560', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' },
  title: { fontSize: '32px', fontWeight: 'bold', margin: 0 },
  description: { color: '#aaa', lineHeight: 1.7, fontSize: '15px' },
  price: { fontSize: '32px', fontWeight: 'bold', color: '#e94560' },
  stockBadge: { color: '#888', fontSize: '14px' },
  successMsg: { backgroundColor: 'rgba(40,200,100,0.15)', border: '1px solid #28c864', color: '#28c864', padding: '12px', borderRadius: '8px', textAlign: 'center' },
  quantityRow: { display: 'flex', alignItems: 'center', gap: '16px' },
  qtyBtn: { backgroundColor: '#1a1a2e', border: '1px solid #2a2a4a', color: 'white', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' },
  qty: { fontSize: '20px', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' },
  addBtn: { backgroundColor: '#e94560', color: 'white', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  reviewsSection: { maxWidth: '800px', margin: '0 auto' },
  reviewsTitle: { fontSize: '24px', marginBottom: '24px' },
  noReviews: { color: '#888', textAlign: 'center', padding: '40px' },
  reviewCard: { backgroundColor: '#1a1a2e', padding: '20px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #2a2a4a' },
  reviewHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  reviewAuthor: { fontWeight: 'bold', color: 'white' },
  reviewRating: { fontSize: '14px' },
  reviewComment: { color: '#aaa', margin: 0 },
  reviewForm: { backgroundColor: '#1a1a2e', padding: '32px', borderRadius: '12px', border: '1px solid #2a2a4a', marginTop: '32px' },
  reviewFormTitle: { fontSize: '18px', marginBottom: '20px' },
  field: { marginBottom: '16px' },
  label: { display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px' },
  select: { width: '100%', padding: '10px', backgroundColor: '#0f0f23', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px' },
  textarea: { width: '100%', padding: '12px', backgroundColor: '#0f0f23', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box' },
  submitBtn: { backgroundColor: '#e94560', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: 'bold' },
};

export default ProductDetailPage;