import { useApp } from '../context/AppContext';
import { CARS } from '../data/cars';
import { formatPrice } from '../utils/formatPrice';

const FILTERS = ['all', 'suv', 'sedan', 'hatchback', 'electric'];

export default function Models() {
  const { filteredType, setFilteredType, highlightedCarId, setHighlightedCarId, currency } = useApp();

  const filtered = filteredType === 'all' ? CARS : CARS.filter((c) => c.type === filteredType);

  return (
    <section id="models" className="section">
      <div className="section-label">Our Lineup</div>
      <div className="section-header">
        <div>
          <div className="section-title">The Collection</div>
          <div className="section-sub">Six distinct machines built for every road and every driver.</div>
        </div>
      </div>

      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filteredType === f ? 'active' : ''}`}
            onClick={() => { setFilteredType(f); setHighlightedCarId(null); }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="cars-grid">
        {filtered.length === 0 ? (
          <div className="no-results">No cars match this filter.</div>
        ) : (
          filtered.map((car) => (
            <div
              key={car.id}
              id={`card-${car.id}`}
              className={`car-card ${highlightedCarId === car.id ? 'highlighted' : ''}`}
              onClick={() => setHighlightedCarId(car.id)}
            >
              <div className="car-img">{car.emoji}</div>
              <div className="car-info">
                <div className="car-type-badge">
                  {car.type.toUpperCase()}{car.flagship ? ' · FLAGSHIP' : ''}
                </div>
                <div className="car-name">{car.name}</div>
                <div className="car-tagline">{car.desc}</div>
                <div className="car-price">
                  {formatPrice(car, currency)} <span>ex-showroom</span>
                </div>
                <div className="car-meta">
                  <div className="car-meta-item"><strong>{car.fuel}</strong>Fuel</div>
                  <div className="car-meta-item"><strong>{car.mileage}</strong>Efficiency</div>
                  <div className="car-meta-item"><strong>{car.seats}</strong>Seats</div>
                  <div className="car-meta-item"><strong>{car.power}</strong>Power</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
