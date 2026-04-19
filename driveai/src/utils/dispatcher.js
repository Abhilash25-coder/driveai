import { scrollToSection } from './scroll';

/**
 * Dispatches an AI action to update app state and scroll the page.
 * @param {object} action - Action object from Claude API response
 * @param {object} setters - All setState functions from AppContext
 */
export function dispatchAIAction(action, setters) {
  if (!action) return;

  const {
    setFilteredType,
    setHighlightedCarId,
    setCompareA,
    setCompareB,
    setCurrency,
    setBookingPrefill,
  } = setters;

  switch (action.type) {
    case 'FILTER_MODELS': {
      scrollToSection('models');
      setTimeout(() => {
        setFilteredType(action.filter || 'all');
        setHighlightedCarId(null);
      }, 400);
      break;
    }

    case 'COMPARE_CARS': {
      scrollToSection('comparison');
      setTimeout(() => {
        if (action.carA) setCompareA(action.carA);
        if (action.carB) setCompareB(action.carB);
      }, 400);
      break;
    }

    case 'HIGHLIGHT_CAR': {
      scrollToSection('models');
      setTimeout(() => {
        setFilteredType('all');
        setHighlightedCarId(action.carId || null);
        setTimeout(() => {
          const el = document.getElementById(`card-${action.carId}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }, 400);
      break;
    }

    case 'PREFILL_BOOKING': {
      scrollToSection('booking');
      setTimeout(() => {
        setBookingPrefill({
          carId: action.carId || '',
          city: action.city || '',
          date: action.date || '',
        });
      }, 400);
      break;
    }

    case 'CHANGE_CURRENCY': {
      scrollToSection('pricing');
      setTimeout(() => {
        setCurrency(action.currency === 'usd' ? 'usd' : 'inr');
      }, 400);
      break;
    }

    case 'SCROLL_TO': {
      scrollToSection(action.section);
      break;
    }

    default:
      break;
  }
}
