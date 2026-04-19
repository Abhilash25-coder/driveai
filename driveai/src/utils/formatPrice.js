/**
 * Formats a car's price based on selected currency.
 * @param {object} car
 * @param {'inr'|'usd'} currency
 * @returns {string}
 */
export function formatPrice(car, currency) {
  if (currency === 'usd') {
    return '$' + car.price_usd.toLocaleString();
  }
  const lakhs = car.price_inr / 100000;
  return '₹' + lakhs.toFixed(2) + ' L';
}
