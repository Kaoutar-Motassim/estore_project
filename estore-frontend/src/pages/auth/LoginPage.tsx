import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(''); setLoading(true);
    try {
      const res = await loginApi({ email, password });
      login(res.data);
      navigate('/catalog');
    } catch { setError('Email ou mot de passe incorrect'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 24, color: '#c9a84c', marginBottom: 8 }}>◈</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Connexion</h1>
          <p style={{ color: '#6b6460', fontSize: 14 }}>Bon retour sur Vendly </p>
        </div>

        <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 16, padding: 32 }}>
          {error && <div style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c', padding: '10px 14px', borderRadius: 8, marginBottom: 20, fontSize: 13 }}>{error}</div>}

          <div className="form-group">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
          <div className="form-group">
            <label className="label">Mot de passe</label>
            <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>

          <button className="btn btn-gold" style={{ width: '100%', padding: '14px', marginTop: 8, fontSize: 15 }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 20, color: '#6b6460', fontSize: 13 }}>
            Pas encore de compte ? <Link to="/register" style={{ color: '#c9a84c', fontWeight: 600 }}>S'inscrire</Link>
          </div>

          <div style={{ marginTop: 20, padding: 12, background: '#0d0d0d', borderRadius: 8, fontSize: 11, color: '#6b6460', lineHeight: 1.6 }}>
            <strong style={{ color: '#a89f94' }}>Comptes test :</strong><br/>
            admin@Vendly .ma / admin123 (Admin)<br/>
            test@Vendly .ma / 123456 (Vendeur)<br/>
            buyer@Vendly .ma / 123456 (Acheteur)
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
