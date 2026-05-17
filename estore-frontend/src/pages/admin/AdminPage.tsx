import { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole } from '../../api/admin';
import { getAllProducts, deleteProduct } from '../../api/admin';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';

interface AdminUser { id: number; firstName: string; lastName: string; email: string; role: string; }

const ROLES = ['BUYER', 'SELLER', 'ADMIN'];

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'users' | 'products'>('users');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) { navigate('/'); return; }
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [uRes, pRes] = await Promise.all([getAllUsers(), getAllProducts()]);
      setUsers(Array.isArray(uRes.data) ? uRes.data : []);
      setProducts(Array.isArray(pRes.data) ? pRes.data : []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const handleRoleChange = async (userId: number, role: string) => {
    try {
      await updateUserRole(userId, role);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    } catch { alert('Erreur'); }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Supprimer ce produit ?')) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch { alert('Erreur'); }
  };

  const roleColor: Record<string, string> = { ADMIN: '#c9a84c', SELLER: '#2980b9', BUYER: '#6b6460' };

  return (
    <div className="page">
      <h1 className="page-title">Administration</h1>

      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#141414', padding: 4, borderRadius: 10, width: 'fit-content', border: '1px solid #1c1c1c' }}>
        {(['users', 'products'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 24px', borderRadius: 8, border: 'none', background: tab === t ? '#c9a84c' : 'transparent', color: tab === t ? '#0d0d0d' : '#a89f94', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
            {t === 'users' ? `Utilisateurs (${users.length})` : `Produits (${products.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: '#6b6460', padding: 60, textAlign: 'center' }}>Chargement...</div>
      ) : tab === 'users' ? (
        <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1c1c1c' }}>
                {['ID', 'Nom', 'Email', 'Rôle', 'Action'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, color: '#6b6460', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #1c1c1c' }}>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b6460' }}>#{u.id}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600 }}>{u.firstName} {u.lastName}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#a89f94' }}>{u.email}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ color: roleColor[u.role] || '#6b6460', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{u.role}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#f0ece4', padding: '6px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1c1c1c' }}>
                {['ID', 'Article', 'Catégorie', 'Prix', 'Stock', 'Vendeur', 'Action'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, color: '#6b6460', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1c1c1c' }}>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b6460' }}>#{p.id}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, maxWidth: 200 }}>{p.name}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#a89f94' }}>{p.category?.name}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: '#c9a84c' }}>{p.price?.toFixed(0)} MAD</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: (p.inventory?.quantity ?? 0) > 0 ? '#27ae60' : '#c0392b' }}>{p.inventory?.quantity ?? 0}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#a89f94' }}>{p.seller?.firstName ?? '—'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => handleDeleteProduct(p.id)} style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.2)', color: '#e74c3c', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
