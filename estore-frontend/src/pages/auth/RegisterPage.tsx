import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.password) { setError('Remplissez tous les champs'); return; }
    setError(''); setLoading(true);
    try {
      const res = await registerApi(form);
      login(res.data);
      navigate('/catalog');
    } catch { setError("Erreur d'inscription. L'email est peut-être déjà utilisé."); }
    finally { setLoading(false); }
  };

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 24, color: '#c9a84c', marginBottom: 8 }}>◈</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Créer un compte</h1>
          <p style={{ color: '#6b6460', fontSize: 14 }}>Rejoignez Vendly  dès aujourd'hui</p>
        </div>
        <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 16, padding: 32 }}>
          {error && <div style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c', padding: '10px 14px', borderRadius: 8, marginBottom: 20, fontSize: 13 }}>{error}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div><label className="label">Prénom</label><input className="input" placeholder="Prénom" value={form.firstName} onChange={e => set('firstName', e.target.value)} /></div>
            <div><label className="label">Nom</label><input className="input" placeholder="Nom" value={form.lastName} onChange={e => set('lastName', e.target.value)} /></div>
          </div>
          <div className="form-group"><label className="label">Email</label><input className="input" type="email" placeholder="votre@email.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
          <div className="form-group"><label className="label">Mot de passe</label><input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} /></div>
          <button className="btn btn-gold" style={{ width: '100%', padding: '14px', marginTop: 8, fontSize: 15 }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Création...' : "S'inscrire"}
          </button>
          <div style={{ textAlign: 'center', marginTop: 20, color: '#6b6460', fontSize: 13 }}>
            Déjà un compte ? <Link to="/login" style={{ color: '#c9a84c', fontWeight: 600 }}>Se connecter</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
