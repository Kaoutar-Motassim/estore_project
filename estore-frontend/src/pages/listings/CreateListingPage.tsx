import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing, getAllCategories } from '../../api/products';
import { useAuth } from '../../context/AuthContext';
import type { Category } from '../../types';

const CONDITIONS = ['Neuf', 'Très bon état', 'Bon état', 'Acceptable'];

const CreateListingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', description: '', price: '', imageUrl: '',
    location: '', condition: 'Neuf', categoryId: '', quantity: '1',
  });

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    getAllCategories().then(r => setCategories(r.data)).catch(() => {});
  }, []);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.categoryId) {
      setError('Veuillez remplir les champs obligatoires (nom, prix, catégorie)');
      return;
    }
    setLoading(true); setError('');
    try {
      await createListing({
        name: form.name, description: form.description,
        price: parseFloat(form.price), imageUrl: form.imageUrl,
        location: form.location, condition: form.condition,
        categoryId: parseInt(form.categoryId), sellerId: user!.userId,
        quantity: parseInt(form.quantity) || 1,
      });
      setSuccess(true);
      setTimeout(() => navigate('/catalog'), 2000);
    } catch {
      setError('Erreur lors de la création. Vérifiez vos données.');
    } finally { setLoading(false); }
  };

  if (success) return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✓</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Annonce publiée !</div>
        <div style={{ color: '#6b6460', fontSize: 14 }}>Redirection vers le catalogue...</div>
      </div>
    </div>
  );

  return (
    <div className="page" style={{ maxWidth: 720 }}>
      <h1 className="page-title">Créer une annonce</h1>

      {error && (
        <div style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 16, padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="label">Titre de l'annonce *</label>
            <input className="input" placeholder="Ex: iPhone 15 Pro 256GB" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">Prix (MAD) *</label>
            <input className="input" type="number" placeholder="0" value={form.price} onChange={e => set('price', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">Quantité disponible</label>
            <input className="input" type="number" min="1" value={form.quantity} onChange={e => set('quantity', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">Catégorie *</label>
            <select className="input" value={form.categoryId} onChange={e => set('categoryId', e.target.value)} style={{ appearance: 'none' }}>
              <option value="">Sélectionner...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="label">État</label>
            <select className="input" value={form.condition} onChange={e => set('condition', e.target.value)} style={{ appearance: 'none' }}>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="label">Description</label>
            <textarea className="input" rows={4} placeholder="Décrivez votre article..." value={form.description} onChange={e => set('description', e.target.value)} style={{ resize: 'vertical' }} />
          </div>
          <div className="form-group">
            <label className="label">Localisation</label>
            <input className="input" placeholder="Ex: Casablanca, Rabat..." value={form.location} onChange={e => set('location', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">URL de la photo</label>
            <input className="input" placeholder="https://..." value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} />
          </div>
        </div>

        {form.imageUrl && (
          <div style={{ marginTop: 8, marginBottom: 20 }}>
            <div className="label">Aperçu</div>
            <img src={form.imageUrl} alt="aperçu" style={{ height: 120, borderRadius: 8, objectFit: 'cover', border: '1px solid #2a2a2a' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        )}

        <div style={{ height: 1, background: '#1c1c1c', marginTop: 8, marginBottom: 24 }} />

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-gold" style={{ flex: 1, padding: '14px' }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Publication...' : 'Publier l\'annonce'}
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/catalog')}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
