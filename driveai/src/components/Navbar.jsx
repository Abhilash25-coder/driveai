import { scrollToSection } from '../utils/scroll';

const links = [
  { label: 'Models', section: 'models' },
  { label: 'Features', section: 'features' },
  { label: 'Compare', section: 'comparison' },
  { label: 'Pricing', section: 'pricing' },
  { label: 'Test Drive', section: 'booking' },
  { label: 'Contact', section: 'contact' },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">VELO</div>
      <div className="nav-links">
        {links.map((l) => (
          <button key={l.section} onClick={() => scrollToSection(l.section)}>
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
