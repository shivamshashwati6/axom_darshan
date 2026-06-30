import { createContext, useContext, useReducer, useCallback } from 'react';
import { circuitsData } from '../data/mockData';

// ── Initial State ─────────────────────────────────────────────
const initialState = {
  // User session
  user: {
    name: 'Traveler',
    loggedIn: false,
    savedRoutes: [],
  },

  // Active itinerary: array of day-card objects
  activeCircuit: 'wildlife',
  itinerary: [...circuitsData.wildlife.days],

  // Workshop bookings
  bookedWorkshops: [],

  // Global audio
  audio: {
    isPlaying: false,
    volume: 0.5,
    activeTrackId: 't1',
    isExpanded: false,
  },

  // UI state
  notification: null, // { message, type: 'success'|'info'|'error' }
};

// ── Action Types ──────────────────────────────────────────────
export const Actions = {
  SET_USER: 'SET_USER',
  SET_CIRCUIT: 'SET_CIRCUIT',
  SET_ITINERARY: 'SET_ITINERARY',
  ADD_DAY: 'ADD_DAY',
  REMOVE_DAY: 'REMOVE_DAY',
  REORDER_DAYS: 'REORDER_DAYS',
  BOOK_WORKSHOP: 'BOOK_WORKSHOP',
  CANCEL_WORKSHOP: 'CANCEL_WORKSHOP',
  SET_AUDIO: 'SET_AUDIO',
  TOGGLE_AUDIO_EXPANDED: 'TOGGLE_AUDIO_EXPANDED',
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
};

// ── Reducer ───────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case Actions.SET_USER:
      return { ...state, user: { ...state.user, ...action.payload } };

    case Actions.SET_CIRCUIT:
      return {
        ...state,
        activeCircuit: action.payload,
        itinerary: [...circuitsData[action.payload].days],
      };

    case Actions.SET_ITINERARY:
      return { ...state, itinerary: action.payload };

    case Actions.ADD_DAY: {
      const dayNum = state.itinerary.length + 1;
      return {
        ...state,
        itinerary: [
          ...state.itinerary,
          { ...action.payload, id: `custom-${Date.now()}`, day: dayNum },
        ],
      };
    }

    case Actions.REMOVE_DAY: {
      const updated = state.itinerary
        .filter(d => d.id !== action.payload)
        .map((d, i) => ({ ...d, day: i + 1 }));
      return { ...state, itinerary: updated };
    }

    case Actions.REORDER_DAYS: {
      // payload: { fromIndex, toIndex }
      const arr = [...state.itinerary];
      const [moved] = arr.splice(action.payload.fromIndex, 1);
      arr.splice(action.payload.toIndex, 0, moved);
      return { ...state, itinerary: arr.map((d, i) => ({ ...d, day: i + 1 })) };
    }

    case Actions.BOOK_WORKSHOP: {
      const alreadyBooked = state.bookedWorkshops.find(b => b.workshopId === action.payload.workshopId);
      if (alreadyBooked) return state;
      return { ...state, bookedWorkshops: [...state.bookedWorkshops, action.payload] };
    }

    case Actions.CANCEL_WORKSHOP:
      return {
        ...state,
        bookedWorkshops: state.bookedWorkshops.filter(b => b.workshopId !== action.payload),
      };

    case Actions.SET_AUDIO:
      return { ...state, audio: { ...state.audio, ...action.payload } };

    case Actions.TOGGLE_AUDIO_EXPANDED:
      return { ...state, audio: { ...state.audio, isExpanded: !state.audio.isExpanded } };

    case Actions.SHOW_NOTIFICATION:
      return { ...state, notification: action.payload };

    case Actions.CLEAR_NOTIFICATION:
      return { ...state, notification: null };

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ── Convenience action creators ───────────────────────────
  const setCircuit = useCallback((circuitKey) => {
    dispatch({ type: Actions.SET_CIRCUIT, payload: circuitKey });
  }, []);

  const addDay = useCallback((dayData) => {
    dispatch({ type: Actions.ADD_DAY, payload: dayData });
  }, []);

  const removeDay = useCallback((id) => {
    dispatch({ type: Actions.REMOVE_DAY, payload: id });
  }, []);

  const reorderDays = useCallback((fromIndex, toIndex) => {
    dispatch({ type: Actions.REORDER_DAYS, payload: { fromIndex, toIndex } });
  }, []);

  const bookWorkshop = useCallback((booking) => {
    dispatch({ type: Actions.BOOK_WORKSHOP, payload: booking });
  }, []);

  const cancelWorkshop = useCallback((workshopId) => {
    dispatch({ type: Actions.CANCEL_WORKSHOP, payload: workshopId });
  }, []);

  const setAudio = useCallback((audioState) => {
    dispatch({ type: Actions.SET_AUDIO, payload: audioState });
  }, []);

  const toggleAudioExpanded = useCallback(() => {
    dispatch({ type: Actions.TOGGLE_AUDIO_EXPANDED });
  }, []);

  const notify = useCallback((message, type = 'success') => {
    dispatch({ type: Actions.SHOW_NOTIFICATION, payload: { message, type } });
    setTimeout(() => dispatch({ type: Actions.CLEAR_NOTIFICATION }), 3500);
  }, []);

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      setCircuit,
      addDay,
      removeDay,
      reorderDays,
      bookWorkshop,
      cancelWorkshop,
      setAudio,
      toggleAudioExpanded,
      notify,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Custom hook ───────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within <AppProvider>');
  return ctx;
}

export default AppContext;
