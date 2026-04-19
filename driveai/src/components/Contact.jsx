const CONTACTS = [
  { icon: '📞', title: 'Sales Hotline', value: '1800-VELO-NOW', sub: 'Mon–Sat, 9am–8pm IST' },
  { icon: '✉️', title: 'Email Us', value: 'hello@velomotors.in', sub: 'Response within 4 hours' },
  { icon: '📍', title: 'HQ', value: 'Pune, Maharashtra', sub: 'Visit by appointment' },
  { icon: '🏢', title: 'Showrooms', value: '12 Cities', sub: 'Pan-India network' },
];

export default function Contact() {
  return (
    <section id="contact" className="section section-alt">
      <div className="section-label">Get in Touch</div>
      <div className="section-title">Contact VELO</div>
      <div className="contact-grid">
        {CONTACTS.map((c) => (
          <div key={c.title} className="contact-card">
            <div className="contact-icon">{c.icon}</div>
            <div className="contact-title">{c.title}</div>
            <div className="contact-value">{c.value}</div>
            <div className="contact-sub">{c.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
