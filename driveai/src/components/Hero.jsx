import { scrollToSection } from '../utils/scroll';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-accent" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          AI-Assisted Showroom — Ask anything
        </div>
        <h1 className="hero-title">
          Drive<br /><em>Beyond</em><br />Limits
        </h1>
        <p className="hero-sub">
          VELO Motors. Engineered for the roads of tomorrow.
          Six models. One vision. Infinite possibilities.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => scrollToSection('models')}>
            Explore Models
          </button>
          <button className="btn btn-outline" onClick={() => scrollToSection('booking')}>
            Book Test Drive
          </button>
        </div>
        <div className="hero-stats">
          <div><div className="stat-val">6</div><div className="stat-lbl">Models</div></div>
          <div><div className="stat-val">98%</div><div className="stat-lbl">Satisfaction</div></div>
          <div><div className="stat-val">50K+</div><div className="stat-lbl">Happy Drivers</div></div>
          <div><div className="stat-val">∞</div><div className="stat-lbl">Possibilities</div></div>
        </div>
      </div>
    </section>
  );
}
