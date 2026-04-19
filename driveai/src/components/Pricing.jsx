import { useApp } from '../context/AppContext';
import { CARS } from '../data/cars';
import { formatPrice } from '../utils/formatPrice';
import { scrollToSection } from '../utils/scroll';

export default function Pricing() {
  const { currency, setCurrency, setBookingPrefill } = useApp();

  const handleBookNow = (carId) => {
    setBookingPrefill((prev) => ({ ...prev, carId }));
    scrollToSection('booking');
  };

  return (
    <section id="pricing" className="section section-alt">
      <div className="section-label">Investment</div>
      <div className="section-title">Pricing</div>
      <div className="section-sub">Transparent pricing. No hidden costs.</div>

      <div className="currency-toggle">
        <label>₹ INR</label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={currency === 'usd'}
            onChange={(e) => setCurrency(e.target.checked ? 'usd' : 'inr')}
          />
          <span className="toggle-slider" />
        </label>
        <label>$ USD</label>
      </div>

      <div className="pricing-grid">
        {CARS.map((car) => (
          <div key={car.id} className={`pricing-card ${car.flagship ? 'featured' : ''}`}>
            {car.flagship && <div className="pricing-badge">Flagship</div>}
            <div className="pricing-emoji">{car.emoji}</div>
            <div className="pricing-car-name">{car.name}</div>
            <div className="pricing-car-type">{car.type.toUpperCase()} · {car.fuel}</div>
            <div className="pricing-amount">{formatPrice(car, currency)}</div>
            <div className="pricing-sub">Ex-showroom price</div>
            <ul className="pricing-features">
              <li>{car.power} engine</li>
              <li>{car.mileage} efficiency</li>
              <li>{car.seats} seater</li>
              <li>5-Star NCAP safety</li>
            </ul>
            <button
              className={`pricing-cta ${car.flagship ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleBookNow(car.id)}
            >
              Book Test Drive
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
