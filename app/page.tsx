"use client";
import { useState, useEffect } from "react";

const ALL_CATS = [
  { id: 1, name: "Misty",  age: "2 ans • Femelle", tags: ["Affectueux", "Calme"],    img: "/assets/misty.png"   },
  { id: 2, name: "Simba",  age: "4 ans • Mâle",    tags: ["Joueur", "Curieux"],      img: "/assets/simba.png"   },
  { id: 3, name: "Oreo",   age: "1 an • Mâle",     tags: ["Sociable", "Bavard"],     img: "/assets/oreo.png"    },
  { id: 4, name: "Ginger", age: "6 ans • Femelle", tags: ["Indépendante"],           img: "/assets/ginger.png"  },
  { id: 5, name: "Luna",   age: "3 ans • Femelle", tags: ["Douce"],                  img: "/assets/header1.png" },
  { id: 6, name: "Felix",  age: "5 ans • Mâle",    tags: ["Actif"],                  img: "/assets/header2.png" },
];

const CARD_WIDTH_PERCENT = 25; // 4 visible cards

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentIndex(p => (p < ALL_CATS.length - 4 ? p + 1 : 0));
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrentIndex(p => Math.max(0, p - 1));
  const next = () => setCurrentIndex(p => (p < ALL_CATS.length - 4 ? p + 1 : 0));

  return (
    <>
      {/* Polices Google + resets globaux */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .scf-root {
          min-height: 100vh;
          background: #FDF8F4;
          color: #3C2A21;
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* Nav */
        .scf-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 96px;
        }
        .scf-logo {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 900;
          color: #A65D2E;
          text-decoration: none;
        }
        .scf-navlinks {
          display: flex;
          gap: 40px;
          list-style: none;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #7E746D;
        }
        .scf-navlinks a { text-decoration: none; color: inherit; transition: color .2s; }
        .scf-navlinks a:hover { color: #A65D2E; }
        .scf-navlinks .active { color: #A65D2E; border-bottom: 2px solid #A65D2E; padding-bottom: 4px; }
        .scf-btn-primary {
          background: #A65D2E;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 999px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          transition: background .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 8px 24px rgba(166,93,46,.18);
        }
        .scf-btn-primary:hover { background: #8B4A22; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(166,93,46,.28); }

        /* Hero */
        .scf-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 64px;
          padding: 40px 96px 80px;
          overflow: hidden;
        }
        .scf-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .scf-hero-eyebrow span.line { height: 1px; width: 32px; background: #D4A373; }
        .scf-hero-eyebrow span.label {
          color: #D4A373;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.22em;
        }
        .scf-h1 {
          font-family: 'Playfair Display', serif;
          font-size: 82px;
          line-height: 0.96;
          color: #A65D2E;
          font-weight: 900;
          margin-bottom: 32px;
        }
        .scf-hero-desc {
          color: #7E746D;
          font-size: 18px;
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: 44px;
        }
        .scf-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
        .scf-btn-outline {
          background: rgba(255,255,255,.6);
          backdrop-filter: blur(8px);
          border: 2px solid rgba(166,93,46,.22);
          color: #A65D2E;
          padding: 14px 32px;
          border-radius: 999px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: background .2s;
        }
        .scf-btn-outline:hover { background: #fff; }
        .scf-btn-primary-lg {
          background: #A65D2E;
          color: #fff;
          border: none;
          padding: 16px 40px;
          border-radius: 999px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .scf-btn-primary-lg:hover { background: #8B4A22; transform: translateY(-2px); }

        /* Hero images */
        .scf-hero-images {
          position: relative;
          height: 640px;
        }
        .scf-img-back {
          position: absolute;
          right: 0; top: 0;
          width: 85%;
          height: 540px;
          border-radius: 56px;
          overflow: hidden;
          transform: rotate(3deg);
          box-shadow: 0 32px 80px rgba(60,42,33,.18);
        }
        .scf-img-front {
          position: absolute;
          left: -5%;
          bottom: 8%;
          width: 62%;
          height: 370px;
          border-radius: 48px;
          overflow: hidden;
          border: 18px solid #FDF8F4;
          box-shadow: 0 24px 64px rgba(60,42,33,.22);
          z-index: 2;
          transform: rotate(-3deg);
        }
        .scf-img-back img,
        .scf-img-front img { width: 100%; height: 100%; object-fit: cover; }

        /* Carrousel */
        .scf-carousel-section {
          background: #fff;
          padding: 112px 96px;
          border-radius: 80px 80px 0 0;
          margin-top: -24px;
        }
        .scf-carousel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 56px;
          gap: 24px;
        }
        .scf-h2 {
          font-family: 'Playfair Display', serif;
          font-size: 56px;
          font-weight: 900;
          color: #3C2A21;
          margin-bottom: 12px;
          line-height: 1.05;
        }
        .scf-carousel-header p { color: #7E746D; font-size: 17px; }
        .scf-arrows { display: flex; gap: 10px; flex-shrink: 0; }
        .scf-arrow {
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 1.5px solid #e5e7eb;
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          color: #3C2A21;
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
        }
        .scf-arrow:hover { background: #A65D2E; color: #fff; border-color: #A65D2E; }

        .scf-track-wrapper { overflow: hidden; }
        .scf-track {
          display: flex;
          gap: 28px;
          transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scf-card {
          flex: none;
          /* 4 cards visible: (100% - 3*28px gap) / 4 */
          width: calc((100% - 84px) / 4);
          background: #FDF8F4;
          padding: 20px;
          border-radius: 36px;
          border: 1.5px solid transparent;
          transition: box-shadow .3s, border-color .3s;
          cursor: pointer;
        }
        .scf-card:hover { box-shadow: 0 24px 64px rgba(60,42,33,.12); border-color: #f3f4f6; }
        .scf-card-img {
          height: 280px;
          border-radius: 26px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .scf-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 700ms; }
        .scf-card:hover .scf-card-img img { transform: scale(1.06); }
        .scf-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #3C2A21;
          margin-bottom: 4px;
          transition: color .2s;
        }
        .scf-card:hover h3 { color: #A65D2E; }
        .scf-card .age { font-size: 13px; font-weight: 600; color: #7E746D; margin-bottom: 16px; }
        .scf-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .scf-tag {
          background: #EBF2F1;
          color: #618E88;
          font-size: 10px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Donations */
        .scf-donations {
          background: #FDF8F4;
          padding: 112px 96px;
          text-align: center;
        }
        .scf-h2-accent {
          font-family: 'Playfair Display', serif;
          font-size: 56px;
          font-weight: 900;
          color: #A65D2E;
          margin-bottom: 16px;
        }
        .scf-donations > p { color: #7E746D; font-size: 18px; max-width: 480px; margin: 0 auto 64px; line-height: 1.7; }
        .scf-don-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 32px;
          max-width: 1100px;
          margin: 0 auto;
          align-items: center;
        }
        .scf-don-card {
          position: relative;
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 44px;
          padding: 48px 40px;
          transition: box-shadow .3s, transform .3s;
        }
        .scf-don-card:hover { box-shadow: 0 20px 60px rgba(60,42,33,.1); transform: translateY(-2px); }
        .scf-don-card.featured {
          background: #A65D2E;
          border-color: transparent;
          color: #fff;
          transform: scale(1.04);
          box-shadow: 0 32px 80px rgba(166,93,46,.32);
          z-index: 1;
        }
        .scf-don-card.featured:hover { transform: scale(1.04) translateY(-2px); }
        .scf-popular-badge {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: #3C2A21;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          padding: 6px 18px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }
        .scf-don-icon { font-size: 44px; margin-bottom: 24px; }
        .scf-don-amount {
          font-family: 'Playfair Display', serif;
          font-size: 52px;
          font-weight: 900;
          margin-bottom: 8px;
        }
        .scf-don-label {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: .75;
          margin-bottom: 16px;
        }
        .scf-don-desc {
          font-size: 14px;
          line-height: 1.65;
          margin-bottom: 36px;
          opacity: .7;
        }
        .scf-don-btn {
          width: 100%;
          padding: 16px;
          border-radius: 999px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: background .2s, color .2s;
        }
        .scf-don-btn-outline {
          background: transparent;
          border: 2px solid #A65D2E;
          color: #A65D2E;
        }
        .scf-don-btn-outline:hover { background: #A65D2E; color: #fff; }
        .scf-don-btn-white {
          background: #fff;
          border: none;
          color: #A65D2E;
        }
        .scf-don-btn-white:hover { background: #f9f9f9; }

        /* Newsletter */
        .scf-newsletter {
          margin: 0 96px 80px;
          background: #F1E9E2;
          border-radius: 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          align-items: center;
        }
        .scf-newsletter-content { padding: 80px; }
        .scf-newsletter-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 900;
          color: #3C2A21;
          margin-bottom: 16px;
        }
        .scf-newsletter-content p { color: #7E746D; font-size: 16px; margin-bottom: 32px; line-height: 1.7; }
        .scf-input-row {
          background: #fff;
          border-radius: 999px;
          padding: 6px;
          display: flex;
          box-shadow: 0 4px 16px rgba(60,42,33,.06);
        }
        .scf-input-row input {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px 20px;
          background: transparent;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          color: #3C2A21;
        }
        .scf-newsletter-img { width: 100%; height: 100%; object-fit: cover; min-height: 420px; display: block; }

        /* Footer */
        .scf-footer {
          background: #fff;
          border-radius: 80px 80px 0 0;
          margin-top: -24px;
          padding: 80px;
          text-align: center;
          border-top: 1.5px solid #f3f4f6;
        }
        .scf-footer p.brand {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 900;
          color: #A65D2E;
          margin-bottom: 24px;
        }
        .scf-footer-links { display: flex; justify-content: center; gap: 40px; margin-bottom: 32px; }
        .scf-footer-links a {
          color: #7E746D;
          text-decoration: none;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          transition: color .2s;
        }
        .scf-footer-links a:hover { color: #3C2A21; }
        .scf-footer p.copy { font-size: 13px; color: #7E746D; opacity: .55; font-style: italic; }

        @media (max-width: 1024px) {
          .scf-nav, .scf-hero, .scf-carousel-section,
          .scf-donations, .scf-newsletter, .scf-footer { padding-left: 32px; padding-right: 32px; }
          .scf-hero { grid-template-columns: 1fr; }
          .scf-hero-images { display: none; }
          .scf-h1 { font-size: 56px; }
          .scf-don-grid { grid-template-columns: 1fr; }
          .scf-newsletter { grid-template-columns: 1fr; margin: 0 32px 60px; }
          .scf-card { width: calc((100% - 28px) / 2); }
        }
      `}</style>

      <div className="scf-root">
        {/* NAV */}
        <nav className="scf-nav">
          <a href="/" className="scf-logo">SansCroquettesFixes</a>
          <ul className="scf-navlinks">
            <li><a href="#" className="active">Adopter</a></li>
            <li><a href="#">Donner</a></li>
            <li><a href="#">Histoires</a></li>
            <li><a href="#">À propos</a></li>
          </ul>
          <button className="scf-btn-primary">Trouver mon chat</button>
        </nav>

        {/* HERO */}
        <header className="scf-hero">
          <div>
            <div className="scf-hero-eyebrow">
              <span className="line" />
              <span className="label">SansCroquettesFixes Sanctuary</span>
            </div>
            <h1 className="scf-h1">
              Le réconfort<br />à portée<br />de patte.
            </h1>
            <p className="scf-hero-desc">
              Découvrez un havre de paix où chaque chat trouve sa voix. Un refuge
              nouvelle génération pour des adoptions durables.
            </p>
            <div className="scf-hero-ctas">
              <button className="scf-btn-primary-lg">Rencontrer nos chats</button>
              <button className="scf-btn-outline">Notre mission</button>
            </div>
          </div>

          <div className="scf-hero-images">
            <div className="scf-img-back">
              <img src="/assets/header1.png" alt="chat debout" />
            </div>
            <div className="scf-img-front">
              <img src="/assets/header2.png" alt="chat sous couverture" />
            </div>
          </div>
        </header>

        {/* CARROUSEL */}
        <section className="scf-carousel-section">
          <div className="scf-carousel-header">
            <div>
              <h2 className="scf-h2">Les Coups de Cœur du Jour</h2>
              <p>Nos protégés qui attendent leur famille pour toujours.</p>
            </div>
            <div className="scf-arrows">
              <button className="scf-arrow" onClick={prev}>←</button>
              <button className="scf-arrow" onClick={next}>→</button>
            </div>
          </div>

          <div className="scf-track-wrapper">
            <div
              className="scf-track"
              style={{
                transform: `translateX(calc(-${currentIndex} * (25% + 7px)))`,
              }}
            >
              {ALL_CATS.map(cat => (
                <div key={cat.id} className="scf-card">
                  <div className="scf-card-img">
                    <img src={cat.img} alt={cat.name} />
                  </div>
                  <h3>{cat.name}</h3>
                  <p className="age">{cat.age}</p>
                  <div className="scf-tags">
                    {cat.tags.map(t => <span key={t} className="scf-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DONATIONS */}
        <section className="scf-donations">
          <h2 className="scf-h2-accent">Soutenez le Sanctuaire</h2>
          <p>Votre générosité permet de financer les repas et les soins médicaux de nos petits résidents.</p>
          <div className="scf-don-grid">
            <DonCard amount="20€" label="Kit Alimentaire" desc="Offrez une semaine de repas équilibrés à un chat." />
            <DonCard  amount="50€" label="Soins Médicaux" desc="Vaccins, vermifuges et bilan de santé complet." featured />
            <DonCard  amount="100€" label="Abri & Confort" desc="Entretien des espaces et aménagement de dodos douillets." />
          </div>

          <div className="flex justify-center items-center ">
            <img src="/assets/bank.png" className="object-cover" />
        </div>
        </section>

        {/* NEWSLETTER */}
        <div className="scf-newsletter">
          <div className="scf-newsletter-content">
            <h2>Restez connecté</h2>
            <p>Recevez des nouvelles de nos adoptions et des conseils pour vos compagnons félins.</p>
            <div className="scf-input-row">
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="scf-btn-primary">S'inscrire</button>
            </div>
          </div>
          <img src="/assets/footer.png" className="scf-newsletter-img" alt="Chat newsletter" />
        </div>

        {/* FOOTER */}
        <footer className="scf-footer">
          <p className="brand">SansCroquettesFixes</p>
          <div className="scf-footer-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Contact</a>
          </div>
          <p className="copy">© 2026 Refuge SansCroquettesFixes. Tous droits réservés.</p>
        </footer>
      </div>
    </>
  );
}

function DonCard({
  icon, amount, label, desc, featured = false,
}: {
  icon: string; amount: string; label: string; desc: string; featured?: boolean;
}) {
  return (
    <div className={`scf-don-card${featured ? " featured" : ""}`}>
      {featured && <span className="scf-popular-badge">Le plus populaire</span>}
      <div className="scf-don-amount">{amount}</div>
      <p className="scf-don-label">{label}</p>
      <p className="scf-don-desc">{desc}</p>
      <button className={`scf-don-btn ${featured ? "scf-don-btn-white" : "scf-don-btn-outline"}`}>
        Choisir ce don
      </button>
    </div>
  );
}