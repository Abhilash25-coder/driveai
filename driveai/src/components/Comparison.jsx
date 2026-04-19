import { useApp } from '../context/AppContext';
import { CARS } from '../data/cars';
import { formatPrice } from '../utils/formatPrice';

export default function Comparison() {
  const { compareA, setCompareA, compareB, setCompareB, currency } = useApp();

  const carA = CARS.find((c) => c.id === compareA);
  const carB = CARS.find((c) => c.id === compareB);

  const rows = carA && carB ? [
    ['Type', carA.type.toUpperCase(), carB.type.toUpperCase()],
    ['Price', formatPrice(carA, currency), formatPrice(carB, currency)],
    ['Seats', carA.seats, carB.seats],
    ['Fuel', carA.fuel, carB.fuel],
    ['Efficiency', carA.mileage, carB.mileage],
    ['Power', carA.power, carB.power],
    ['Tag', carA.tag, carB.tag],
  ] : [];

  return (
    <section id="comparison" className="section">
      <div className="section-label">Side by Side</div>
      <div className="section-title">Compare Models</div>
      <div className="section-sub">Ask the AI to compare any two models, or select them below.</div>

      <div className="compare-selects">
        <select
          className="form-input"
          value={compareA}
          onChange={(e) => setCompareA(e.target.value)}
        >
          <option value="">Select Model A</option>
          {CARS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select
          className="form-input"
          value={compareB}
          onChange={(e) => setCompareB(e.target.value)}
        >
          <option value="">Select Model B</option>
          {CARS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {carA && carB ? (
        <div className="compare-grid">
          <div className="compare-col">
            <div className="compare-header label-col">
              <span className="compare-spec-label">Spec</span>
            </div>
            {rows.map((r) => (
              <div key={r[0]} className="compare-cell label">{r[0]}</div>
            ))}
          </div>
          <div className="compare-col">
            <div className="compare-header">
              <div className="compare-emoji">{carA.emoji}</div>
              <div className="compare-car-name">{carA.name}</div>
            </div>
            {rows.map((r) => (
              <div key={r[0]} className="compare-cell">{r[1]}</div>
            ))}
          </div>
          <div className="compare-col">
            <div className="compare-header">
              <div className="compare-emoji">{carB.emoji}</div>
              <div className="compare-car-name">{carB.name}</div>
            </div>
            {rows.map((r) => (
              <div key={r[0]} className="compare-cell">{r[2]}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="compare-placeholder">
          Select two models above or ask the AI: <em>"Compare Surge and Arc"</em>
        </div>
      )}
    </section>
  );
}
