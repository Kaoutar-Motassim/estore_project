import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>🛍️ EStore</Link>
      </div>
      <div style={styles.links}>
        <Link to="/catalog" style={styles.link}>Catalogue</Link>
        {isAuthenticated ? (
          <>
            <Link to="/cart" style={styles.link}>🛒 Panier</Link>
            <Link to="/orders" style={styles.link}>Commandes</Link>
            <Link to="/profile" style={styles.link}>
              👤 {user?.firstName}
            </Link>
            <button onClick={handleLogout} style={styles.btn}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Connexion</Link>
            <Link to="/register" style={styles.btnLink}>S'inscrire</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: '64px',
    backgroundColor: '#1a1a2e',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  brand: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  brandLink: {
    color: '#e94560',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '15px',
    transition: 'color 0.2s',
  },
  btn: {
    backgroundColor: 'transparent',
    border: '1px solid #e94560',
    color: '#e94560',
    padding: '6px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  btnLink: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default Navbar;