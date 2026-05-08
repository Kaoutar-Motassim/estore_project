import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Bienvenue sur <span style={styles.highlight}>EStore</span>
          </h1>
          <p style={styles.subtitle}>
            Découvrez notre catalogue de produits et profitez d'une expérience
            d'achat simple et rapide.
          </p>
          <div style={styles.btnGroup}>
            <Link to="/catalog" style={styles.btnPrimary}>
              Voir le catalogue
            </Link>
            <Link to="/register" style={styles.btnSecondary}>
              Créer un compte
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <h2 style={styles.featuresTitle}>Pourquoi choisir EStore ?</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🚀</div>
            <h3 style={styles.cardTitle}>Livraison rapide</h3>
            <p style={styles.cardText}>
              Recevez vos commandes en un temps record partout au Maroc.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🔒</div>
            <h3 style={styles.cardTitle}>Paiement sécurisé</h3>
            <p style={styles.cardText}>
              Vos transactions sont protégées et sécurisées à 100%.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>⭐</div>
            <h3 style={styles.cardTitle}>Produits de qualité</h3>
            <p style={styles.cardText}>
              Tous nos produits sont sélectionnés avec soin pour vous.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>💬</div>
            <h3 style={styles.cardTitle}>Support client</h3>
            <p style={styles.cardText}>
              Notre équipe est disponible 7j/7 pour vous aider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f23',
    color: 'white',
    fontFamily: 'Segoe UI, sans-serif',
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '40px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '700px',
  },
  title: {
    fontSize: '52px',
    fontWeight: 'bold',
    marginBottom: '20px',
    lineHeight: 1.2,
  },
  highlight: {
    color: '#e94560',
  },
  subtitle: {
    fontSize: '18px',
    color: '#aaa',
    marginBottom: '40px',
    lineHeight: 1.6,
  },
  btnGroup: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '14px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'opacity 0.2s',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '14px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    border: '2px solid white',
  },
  features: {
    padding: '80px 40px',
    backgroundColor: '#0f0f23',
    textAlign: 'center',
  },
  featuresTitle: {
    fontSize: '32px',
    marginBottom: '48px',
    color: 'white',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#1a1a2e',
    padding: '32px 24px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    transition: 'transform 0.2s',
  },
  cardIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#e94560',
  },
  cardText: {
    color: '#aaa',
    lineHeight: 1.6,
    fontSize: '14px',
  },
};

export default HomePage;