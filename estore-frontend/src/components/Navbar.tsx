import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isSeller, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={s.nav}>
      <div style={s.inner}>
        <Link to="/" style={s.logo}>
          <span style={s.logoIcon}>◈</span>
          <span style={s.logoText}>Vendly </span>
        </Link>

        <div style={s.links}>
          <Link to="/catalog" style={s.link}>Catalogue</Link>
          {isAuthenticated && <Link to="/cart" style={s.link}>Panier</Link>}
          {isAuthenticated && <Link to="/orders" style={s.link}>Mes achats</Link>}
          {isSeller && <Link to="/my-listings" style={s.link}>Mes annonces</Link>}
          {isSeller && <Link to="/my-sales" style={s.link}>Mes ventes</Link>}
          {isAdmin && <Link to="/admin" style={s.link}>Admin</Link>}
        </div>

        <div style={s.right}>
          {isAuthenticated ? (
            <>
              {isSeller && (
                <Link to="/create-listing" style={s.sellBtn}>+ Vendre</Link>
              )}
              {!isSeller && (
                <Link to="/create-listing" style={s.sellBtn}>+ Vendre</Link>
              )}
              <div style={s.userInfo}>
                <Link to="/profile" style={s.userName}>{user?.firstName}</Link>
                <span style={s.roleTag}>{user?.role === 'ADMIN' ? 'Admin' : user?.role === 'SELLER' ? 'Vendeur' : 'Acheteur'}</span>
              </div>
              <button onClick={handleLogout} style={s.logoutBtn}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" style={s.loginBtn}>Connexion</Link>
              <Link to="/register" style={s.registerBtn}>S'inscrire</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const s: Record<string, React.CSSProperties> = {
  nav: { background: '#0d0d0d', borderBottom: '1px solid #1c1c1c', position: 'sticky', top: 0, zIndex: 100 },
  inner: { maxWidth: 1300, margin: '0 auto', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', gap: 32 },
  logo: { display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 },
  logoIcon: { color: '#c9a84c', fontSize: 20 },
  logoText: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#f0ece4', letterSpacing: '-0.5px' },
  links: { display: 'flex', gap: 4, flex: 1 },
  link: { padding: '6px 14px', borderRadius: 8, fontSize: 14, color: '#a89f94', fontWeight: 500, transition: 'color 0.2s' },
  right: { display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 },
  sellBtn: { background: '#c9a84c', color: '#0d0d0d', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, letterSpacing: '0.3px' },
  userInfo: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 },
  userName: { fontSize: 14, fontWeight: 600, color: '#f0ece4' },
  roleTag: { fontSize: 10, color: '#c9a84c', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' },
  logoutBtn: { background: 'transparent', border: '1px solid #2a2a2a', color: '#6b6460', padding: '6px 14px', borderRadius: 8, fontSize: 13, transition: 'all 0.2s' },
  loginBtn: { color: '#a89f94', fontSize: 14, fontWeight: 500 },
  registerBtn: { background: '#c9a84c', color: '#0d0d0d', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700 },
};

export default Navbar;
