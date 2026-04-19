import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CARS, CITIES } from '../data/cars';

export default function Booking() {
  const { bookingPrefill } = useApp();

  const [form, setForm] = useState({
    carId: '',
    date: '',
    city: '',
    name: '',
    phone: '',
  });

  // Sync prefill from AI
  useEffect(() => {
    if (bookingPrefill.carId || bookingPrefill.city || bookingPrefill.date) {
      setForm((prev) => ({
        ...prev,
        ...(bookingPrefill.carId && { carId: bookingPrefill.carId }),
        ...(bookingPrefill.city && { city: bookingPrefill.city }),
        ...(bookingPrefill.date && { date: bookingPrefill.date }),
      }));
    }
  }, [bookingPrefill]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.carId || !form.date || !form.city || !form.name) {
      alert('Please fill all required fields.');
      return;
    }
    const car = CARS.find((c) => c.id === form.carId);
    alert(`✅ Test drive booked!\n\n${car.name} · ${form.city} · ${form.date}\n\nWe'll confirm via SMS. See you there!`);
    setForm({ carId: '', date: '', city: '', name: '', phone: '' });
  };

  return (
    <section id="booking" className="section">
      <div className="section-label">Experience VELO</div>
      <div className="section-title">Book a Test Drive</div>

      <div className="booking-layout">
        <div className="booking-info">
          <h3>Drive Before You Decide</h3>
          <p>Schedule a personalised test drive at your nearest VELO studio. Our product specialists will guide you through every feature — no pressure, just pure driving pleasure.</p>
          <p className="booking-details">
            📍 Available in 12 cities across India<br />
            ⏱ 30–60 minute drive experience<br />
            🎁 Complimentary VELO merchandise for all bookings
          </p>
        </div>

        <div className="booking-form">
          <div className="form-group">
            <label className="form-label">Select Model</label>
            <select className="form-input" name="carId" value={form.carId} onChange={handleChange}>
              <option value="">Choose a model</option>
              {CARS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input className="form-input" type="date" name="date" value={form.date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <select className="form-input" name="city" value={form.city} onChange={handleChange}>
                <option value="">Select city</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input className="form-input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" />
            </div>
          </div>

          <button className="form-submit" onClick={handleSubmit}>
            Confirm Test Drive →
          </button>
        </div>
      </div>
    </section>
  );
}
