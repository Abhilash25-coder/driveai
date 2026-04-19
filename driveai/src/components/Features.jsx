const FEATURES = [
  { icon: '⚡', title: 'Hybrid Powertrain', desc: 'Dual-mode engines delivering peak performance while maximising fuel efficiency across all terrains.' },
  { icon: '🛡️', title: '360° Safety Suite', desc: '12-sensor collision avoidance, lane-keeping assist, and automatic emergency braking standard on all models.' },
  { icon: '🧠', title: 'VELO Intelligence', desc: 'Adaptive AI cabin learns your preferences — climate, seating, infotainment — personalised from day one.' },
  { icon: '🌍', title: 'Eco Commitment', desc: 'All models meet BS6 Phase II norms. Electric variants produce zero direct emissions.' },
  { icon: '📡', title: 'Connected OTA', desc: 'Over-the-air software updates keep your VELO current — new features delivered while you sleep.' },
  { icon: '🏆', title: '5-Star NCAP', desc: 'Every model in the VELO lineup has achieved the full 5-star Global NCAP safety rating.' },
];

export default function Features() {
  return (
    <section id="features" className="section section-alt">
      <div className="section-label">Why VELO</div>
      <div className="section-title">Built Different</div>
      <div className="section-sub">Every VELO is engineered with precision technology and uncompromising quality.</div>
      <div className="features-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
