import { Link } from 'react-router-dom';

const HomePage = () => (
  <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#f0ece4' }}>
    {/* Hero */}
    <div style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(201,168,76,0.03)', filter: 'blur(80px)' }} />
      <div style={{ position: 'relative', maxWidth: 700 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 20, padding: '6px 16px', marginBottom: 32, fontSize: 12, fontWeight: 600, color: '#c9a84c', letterSpacing: '1px', textTransform: 'uppercase' }}>
          ◈ La marketplace marocaine
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 700, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-2px' }}>
          Achetez. Vendez.<br /><span style={{ color: '#c9a84c' }}>Connectez.</span>
        </h1>
        <p style={{ fontSize: 18, color: '#a89f94', lineHeight: 1.7, marginBottom: 48, maxWidth: 500, margin: '0 auto 48px' }}>
          Vendly , la marketplace où tout le monde peut vendre ses produits et trouver ce qu'il cherche au Maroc.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/catalog" style={{ background: '#c9a84c', color: '#0d0d0d', padding: '16px 36px', borderRadius: 10, fontSize: 15, fontWeight: 700, letterSpacing: '0.3px' }}>
            Explorer le catalogue
          </Link>
          <Link to="/create-listing" style={{ background: 'transparent', color: '#f0ece4', padding: '16px 36px', borderRadius: 10, fontSize: 15, fontWeight: 600, border: '1px solid #2a2a2a' }}>
            Mettre en vente →
          </Link>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div style={{ borderTop: '1px solid #1c1c1c', borderBottom: '1px solid #1c1c1c', padding: '40px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[['10,000+', 'Articles en vente'], ['5,000+', 'Vendeurs actifs'], ['50+', 'Villes couvertes']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center', padding: '20px', borderRight: '1px solid #1c1c1c' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: '#c9a84c' }}>{n}</div>
            <div style={{ fontSize: 14, color: '#6b6460', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Features */}
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, textAlign: 'center', marginBottom: 64, letterSpacing: '-1px' }}>
        Comment ça <span style={{ color: '#c9a84c' }}>marche</span> ?
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          { num: '01', title: 'Créez votre annonce', text: "Publiez votre article en quelques minutes : photo, prix, description, localisation." },
          { num: '02', title: 'Recevez des offres', text: "Les acheteurs vous contactent. Vous choisissez à qui vous vendez." },
          { num: '03', title: 'Finalisez la vente', text: "Acceptez la commande et livrez votre article. Simple, sécurisé, marocain." },
        ].map((f) => (
          <div key={f.num} style={{ background: '#141414', border: '1px solid #1c1c1c', borderRadius: 16, padding: 36, transition: 'border-color 0.2s' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: 'rgba(201,168,76,0.2)', marginBottom: 20, lineHeight: 1 }}>{f.num}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
            <p style={{ fontSize: 14, color: '#6b6460', lineHeight: 1.7 }}>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomePage;
