import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [filteredType, setFilteredType] = useState('all');
  const [highlightedCarId, setHighlightedCarId] = useState(null);
  const [compareA, setCompareA] = useState('');
  const [compareB, setCompareB] = useState('');
  const [currency, setCurrency] = useState('inr');
  const [bookingPrefill, setBookingPrefill] = useState({ carId: '', city: '', date: '' });

  return (
    <AppContext.Provider value={{
      filteredType, setFilteredType,
      highlightedCarId, setHighlightedCarId,
      compareA, setCompareA,
      compareB, setCompareB,
      currency, setCurrency,
      bookingPrefill, setBookingPrefill,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
