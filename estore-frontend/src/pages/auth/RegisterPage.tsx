import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { register as registerApi } from '../../api/auth';

const RegisterPage = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await registerApi(form);
            login(res.data);
            navigate('/catalog');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Créer un compte</h2>
                <p style={styles.subtitle}>Rejoignez EStore dès aujourd'hui !</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>Prénom</label>
                            <input
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                placeholder="Prénom"
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Nom</label>
                            <input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                placeholder="Nom"
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Mot de passe</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            minLength={6}
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={styles.btn}>
                        {loading ? 'Inscription...' : 'Créer mon compte'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Déjà un compte ?{' '}
                    <Link to="/login" style={styles.link}>Se connecter</Link>
                </p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f0f23',
        padding: '20px',
    },
    card: {
        backgroundColor: '#1a1a2e',
        padding: '48px 40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '480px',
        border: '1px solid #2a2a4a',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '8px',
        textAlign: 'center',
    },
    subtitle: {
        color: '#888',
        textAlign: 'center',
        marginBottom: '32px',
        fontSize: '14px',
    },
    error: {
        backgroundColor: 'rgba(233,69,96,0.15)',
        border: '1px solid #e94560',
        color: '#e94560',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '14px',
        textAlign: 'center',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    field: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        color: '#ccc',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        backgroundColor: '#0f0f23',
        border: '1px solid #2a2a4a',
        borderRadius: '8px',
        color: 'white',
        fontSize: '15px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    btn: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '8px',
    },
    footer: {
        textAlign: 'center',
        marginTop: '24px',
        color: '#888',
        fontSize: '14px',
    },
    link: {
        color: '#e94560',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default RegisterPage;