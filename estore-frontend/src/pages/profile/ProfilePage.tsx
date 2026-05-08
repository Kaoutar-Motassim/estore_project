import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${user?.userId}/profile`, form);
      setSuccess('Profil mis à jour !');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
        </div>
        <h1 style={styles.name}>{user?.firstName} {user?.lastName}</h1>
        <p style={styles.email}>{user?.email}</p>

        {success && <div style={styles.success}>{success}</div>}

        {!editing ? (
          <>
            <div style={styles.divider} />
            <div style={styles.infoGrid}>
              <div style={styles.infoCard}>
                <span style={styles.infoIcon}>📦</span>
                <button onClick={() => navigate('/orders')} style={styles.infoBtn}>Mes commandes</button>
              </div>
              <div style={styles.infoCard}>
                <span style={styles.infoIcon}>🛒</span>
                <button onClick={() => navigate('/cart')} style={styles.infoBtn}>Mon panier</button>
              </div>
              <div style={styles.infoCard}>
                <span style={styles.infoIcon}>✏️</span>
                <button onClick={() => setEditing(true)} style={styles.infoBtn}>Modifier profil</button>
              </div>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>Se déconnecter</button>
          </>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.formTitle}>Modifier mon profil</h3>
            {[
              { label: 'Prénom', key: 'firstName' },
              { label: 'Nom', key: 'lastName' },
              { label: 'Téléphone', key: 'phone' },
              { label: 'Adresse', key: 'address' },
              { label: 'Ville', key: 'city' },
              { label: 'Pays', key: 'country' },
            ].map(({ label, key }) => (
              <div key={key} style={styles.field}>
                <label style={styles.label}>{label}</label>
                <input
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={styles.input}
                  placeholder={label}
                />
              </div>
            ))}
            <div style={styles.btnRow}>
              <button type="submit" style={styles.saveBtn}>Enregistrer</button>
              <button type="button" onClick={() => setEditing(false)} style={styles.cancelBtn}>Annuler</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f23', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' },
  card: { backgroundColor: '#1a1a2e', borderRadius: '20px', padding: '48px', textAlign: 'center', maxWidth: '500px', width: '100%', border: '1px solid #2a2a4a' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e94560', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0 auto 20px' },
  name: { fontSize: '28px', margin: '0 0 8px', color: 'white' },
  email: { color: '#888', marginBottom: '16px', fontSize: '16px' },
  success: { backgroundColor: 'rgba(40,200,100,0.15)', border: '1px solid #28c864', color: '#28c864', padding: '12px', borderRadius: '8px', marginBottom: '16px' },
  divider: { height: '1px', backgroundColor: '#2a2a4a', marginBottom: '32px' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' },
  infoCard: { backgroundColor: '#0f0f23', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', border: '1px solid #2a2a4a' },
  infoIcon: { fontSize: '28px' },
  infoBtn: { backgroundColor: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '13px', textAlign: 'center' },
  logoutBtn: { width: '100%', backgroundColor: 'transparent', border: '1px solid #e94560', color: '#e94560', padding: '14px', borderRadius: '10px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' },
  form: { textAlign: 'left' },
  formTitle: { color: 'white', fontSize: '18px', marginBottom: '20px', textAlign: 'center' },
  field: { marginBottom: '16px' },
  label: { display: 'block', color: '#ccc', marginBottom: '6px', fontSize: '14px' },
  input: { width: '100%', padding: '10px 12px', backgroundColor: '#0f0f23', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' },
  btnRow: { display: 'flex', gap: '12px', marginTop: '20px' },
  saveBtn: { flex: 1, backgroundColor: '#e94560', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: 'bold' },
  cancelBtn: { flex: 1, backgroundColor: 'transparent', border: '1px solid #2a2a4a', color: '#ccc', padding: '12px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
};

export default ProfilePage;